#!/usr/bin/env ruby
require 'rubygems'
require 'capybara'
require 'capybara/dsl'
require 'capybara/poltergeist'
require 'json'

filename = ARGV[0] || false

if filename
	puts "Saving the output to #{filename}."
else
	puts "Not saving the output. Use scrape.rb <filename> to save it."
end

Capybara.register_driver :poltergeist do |app|
	options = {}
	# THESE DONT WORK
	options[:js_errors] = false
	options[:phantomjs_logger] = false
	options[:logger] = false
  Capybara::Poltergeist::Driver.new(app, options)
end

Capybara.run_server = false

#Capybara.current_driver = :selenium
Capybara.current_driver = :poltergeist
#Capybara.javascript_driver = :poltergeist
#Capybara.js_errors = false
Capybara.app_host = 'http://stats.nba.com'

module MyCapybaraTest
  class Test
    include Capybara::DSL

    def scrape_player_info
      visit('/players.html')
      click_link('Active Players')
      links = []

      puts 'Collecting all the active player links'
      find('#active-players').all('a.playerlink').each do |a|
      	link = a[:href]
      	puts link
      	links << link
      end

      players = []
	    links[102..-1].each_with_index do |link, index|
	    	puts "Visiting #{link}"
				visit(link)
				# Sleep seems necessary or things time out
				sleep(1)
				
				player_name = find('.player-name').text
				team_name = find('.player-team').text
				num_pos = find('.num-position').text
				number = num_pos.split('|')[0].strip
				position = num_pos.split('|')[1].strip
				image_src = find('.player-headshot img')[:src]

				# Something with the player
				puts team_name
				p = {
					id: (index + 103).to_s,
					name: player_name,
					team: team_id(team_name).to_s,
					number: number,
					position: position,
					image_source: image_src,
					nba_link: link
				}
				players << p

				append_data(p, 'players_continuous.rb')
				append_data(',', 'players_continuous.rb')

				puts "#{player_name} #{team_name} #{number} #{image_src}"
	    end
	    puts players
	    puts players.to_json

	    save_data(players, 'players.rb')
	    save_data(players.to_json, 'players.json')
	    # TODO: Probably dpnt need to write multiple times
	    save_data(teams_with_player(teams, players), 'teams_with_players.rb')
    end

    def teams_with_player(ts, players)
    	# TODO: Clean up
    	ts.each do |t|
    		ps = []
    		players.each do |p|
    			if p[:team] == t[:id]
    				ps << p[:id]
    			end
    		end
    		t[:players] = ps
    	end
    	
    	ts
    end

    def append_data(data, filename)
    	File.open(filename, 'a') { |file| file.write(data) }
    end

    def save_data(data, filename)
    	File.open(filename, 'w') { |file| file.write(data) }
    end

    def teams
    	@teams ||= scrape_teams
    end

    def team_id(team_name)
    	if team_name == 'Portland Blazers'
    		team_name = 'Portland Trail Blazers'
    	end
    	if team_name == 'Philadelphia Sixers'
    		team_name = 'Philadelphia 76ers'
    	end
    	teams.select {|team| team[:name] == team_name}.first[:id]
    end

    def scrape_teams
    	visit('/')
    	team_list = []
    	find('.nbaTeams.statsNavTeams').all('a').each_with_index do |link, index|
    		puts link.text
    		team_list << {
    			id: (index + 1).to_s,
    			name: link.text,
    			nba_link: 'http://stats.nba.com' + link[:href]
    		}
    	end

    	puts team_list
    	puts team_list.to_json

    	save_data(team_list, 'teams.rb')
			save_data(team_list.to_json, 'teams.json')

    	team_list
    end
  end
end

t = MyCapybaraTest::Test.new
t.teams
#t.team_id("Boston Celtics")
t.scrape_player_info