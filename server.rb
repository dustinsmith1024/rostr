require 'sinatra'
require 'json'

get '/' do
    File.read(File.join('public', 'index.html'))
end

get '/teams' do
	content_type :json
	{ teams: 
		[
{:id=>"1", :name=>"Atlanta Hawks", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612737", players: ['600','601']},
{:id=>"2", :name=>"Boston Celtics", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612738"},
{:id=>"3", :name=>"Brooklyn Nets", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612751"},
{:id=>"4", :name=>"Charlotte Bobcats", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612766"},
{:id=>"5", :name=>"Chicago Bulls", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612741"},
{:id=>"6", :name=>"Cleveland Cavaliers", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612739"},
{:id=>"7", :name=>"Detroit Pistons", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612765"},
{:id=>"8", :name=>"Indiana Pacers", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612754"},
{:id=>"9", :name=>"Miami Heat", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612748"},
{:id=>"10", :name=>"Milwaukee Bucks", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612749"},
{:id=>"11", :name=>"New York Knicks", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612752"},
{:id=>"12", :name=>"Orlando Magic", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612753"},
{:id=>"13", :name=>"Philadelphia 76ers", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612755"},
{:id=>"14", :name=>"Toronto Raptors", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612761"},
{:id=>"15", :name=>"Washington Wizards", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612764"},
{:id=>"16", :name=>"Dallas Mavericks", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612742"},
{:id=>"17", :name=>"Denver Nuggets", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612743"},
{:id=>"18", :name=>"Golden State Warriors", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612744"},
{:id=>"19", :name=>"Houston Rockets", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612745"},
{:id=>"20", :name=>"Los Angeles Clippers", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612746"},
{:id=>"21", :name=>"Los Angeles Lakers", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612747"},
{:id=>"22", :name=>"Memphis Grizzlies", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612763"},
{:id=>"23", :name=>"Minnesota Timberwolves", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612750"},
{:id=>"24", :name=>"New Orleans Pelicans", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612740"},
{:id=>"25", :name=>"Oklahoma City Thunder", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612760"},
{:id=>"26", :name=>"Phoenix Suns", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612756"},
{:id=>"27", :name=>"Portland Trail Blazers", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612757"},
{:id=>"28", :name=>"Sacramento Kings", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612758"},
{:id=>"29", :name=>"San Antonio Spurs", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612759"},
{:id=>"30", :name=>"Utah Jazz", :nba_link=>"http://stats.nba.com/teamStats.html?TeamID=1610612762"}

		],
	players: [
		{
		  id: '600',
		  number: 15,
		  name: 'MJ',
		  team: '1'
		}, {
		  id: '601',
		  number: 15,
		  name: 'MJ2',
		  team: '1'
		}, {
		  id: '602',
		  number: 15,
		  name: 'Kobe',
		  team: '1'
		}, 
		{
		  id: '603',
		  number: 15,
		  name: 'Lebron',
		  team: '2'
		},
		 {
		  id: '604',
		  number: 15,
		  name: 'Durant',
		  team: '3'
		}]
	}.to_json;
end

get '/teams/:id' do
	content_type :json
	{ team: 
		{
	  		id: '1',
		  	name: "Thunder",
		  	playas: [
		  		{name:1},{name:2},{name:4}
		  	]
		},
	players: [
		{
		  id: '500',
		  number: 15,
		  name: 'MJ',
		  team: '1'
		}, {
		  id: '501',
		  number: 15,
		  name: 'MJ2',
		  team: '1'
		}, {
		  id: '502',
		  number: 15,
		  name: 'Kobe',
		  team: '1'
		}, 
		{
		  id: '503',
		  number: 15,
		  name: 'Lebron',
		  team: '2'
		},
		 {
		  id: '504',
		  number: 15,
		  name: 'Durant',
		  team: '3'
		}]
	}.to_json
end

get '/players/:team_id' do
	content_type :json
	{ 
		players: [
		{
		  id: '400',
		  number: 15,
		  name: 'MJ',
		  team: '1'
		}, {
		  id: '401',
		  number: 15,
		  name: 'MJ2',
		  team: '1'
		}, {
		  id: '402',
		  number: 15,
		  name: 'Kobe',
		  team: '1'
		}, 
		{
		  id: '403',
		  number: 15,
		  name: 'Lebron',
		  team: '2'
		},
		 {
		  id: '404',
		  number: 15,
		  name: 'Durant',
		  team: '3'
		}]
	}.to_json
end