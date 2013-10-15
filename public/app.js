window.App = Ember.Application.create();

App.Router.map(function(){
  this.resource('teams', function(){
    this.resource('team', {path: ':team_id'}, function(){
      
    }); 
  });
  this.resource('players', function(){
    this.resource('player', {path: ':player_id'}, function(){
      this.route('details');
    });
  });
  this.resource('explorer');
});

/*App.ApplicationRoute = Ember.Route.extend({
  init: function(){
    var store = this.get('store');
    //Loading the teams here preloads them all and won't need the extra hit for the team
    var teams = store.find('team');
    var players = store.find('player');
  }
});*/

/*App.ApplicationRoute = Ember.Route.extend({
  setupController: function() {

    }
  }
});*/

/*App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('players');
  }
});*/
App.ExplorerRoute = Ember.Route.extend({
  model: function() {
    var store = this.get('store');
    //These are already preloaded, but kept them here for now.
    var teams = store.find('team');
    var players = store.find('player');
    return players;
  }
});

App.ExplorerController = Ember.ArrayController.extend({
  sortProperties: ['name'],
  search: false,

  players: function(){
    var searchTerm = this.get('search');
    if (searchTerm) {
      return this.get('model').filter(function(p){
        return (p.get('name').search(searchTerm) >= 0);
      });
    } else {
      return this.get('model');
    }
  }.property('search')

});

App.PlayersRoute = Ember.Route.extend({
  model: function() {
    var store = this.get('store');
    //These are already preloaded, but kept them here for now.
    var teams = store.find('team');
    var players = store.find('player');
    return players;
  }
});

App.PlayersController = Ember.ArrayController.extend({
  sortProperties: ['name'],
  search: false,

  players: function(){
    var searchTerm = this.get('search');
    if (searchTerm) {
      return this.get('model').filter(function(p){
        return (p.get('name').search(searchTerm) >= 0);
      });
    } else {
      return this.get('model');
    }
  }.property('search')

});

App.TeamsRoute = Ember.Route.extend({
  model: function() {
    //return App.Team.FIXTURES;
    var store = this.get('store');
    var teams = store.find('team');
    //var players = store.find('player');
    return teams;
  }
});

App.TeamRoute = Ember.Route.extend({
  model: function(params){
    var store = this.get('store');
    return store.find('team', params.team_id);
  }
});

// Controllers
// Implement explicitly to use the object proxy.
App.TeamsController = Ember.ArrayController.extend({
  sortProperties: ['name']
});

App.TeamRoute = Ember.Route.extend({
  /*redirect: function() {
    var model = this.modelFor('team');
    return this.transitionTo('team.players', model);
  }*/
});

App.TeamController = Ember.ObjectController.extend({
  filterGuards: false,
  filterForwards: false,
  filterCenters: false,
  filter: false,

  guardsFiltered: function(){
    if(this.filter === "guards"){
      return true;
    }
  }.property('filter'),

  forwardsFiltered: function(){
    if(this.filter === "forwards"){
      return true;
    }
  }.property('filter'),

  centersFiltered: function(){
    if(this.filter === "centers"){
      return true;
    }
  }.property('filter'),

  roster: function(){
    if(this.filter === "guards"){
      return this.get('model.guards');
    }else if(this.filter === "centers"){
      return this.get('model.centers');
    }else if(this.filter === "forwards"){
      return this.get('model.forwards');
    }else{
      return this.get('model.players');
    }
  }.property('filter', 'team'),

  actions: {
    filter: function(param) {
      this.set('filter', param);
    }
  }
});

App.Store = DS.Store.extend({
  //revision: 13,
  //adapter: DS.FixtureAdapter.create()
  adapter: 'DS.RESTAdapter'
});

App.Team = DS.Model.extend({
  name: DS.attr('string'),
  nba_link: DS.attr('string'),
  players: DS.hasMany('player'),

  //Dont need this right now but left for an example of filterBy
  guardsOnly: function() {
    return this.get('players').filterBy('position', 'Guard');
  }.property('players'),

  guards: function() {
    return this.get('players').filter(function(p){
      return (p.get('position').search("Guard") >= 0);
    });
  }.property('players'),

  forwards: function() {
    return this.get('players').filter(function(p){
      return (p.get('position').search("Forward") >= 0);
    });
  }.property('players'),

  centers: function() {
    return this.get('players').filter(function(p){
      return (p.get('position').search("Center") >= 0);
    });
  }.property('players')
});

App.Player = DS.Model.extend({
  number: DS.attr('string'),
  name: DS.attr('string'),
  image_source: DS.attr('string'),
  position: DS.attr('string'),
  team: DS.belongsTo('team')
});

Ember.View.reopen({
    disconnectOutlet: function(outletName) {
        if (this.isDestroyed) return;
        this._super(outletName);
    }
});
