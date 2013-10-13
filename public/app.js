window.App = Ember.Application.create();

App.Router.map(function(){
  this.resource('teams', function(){
    this.resource('team', {path: ':team_id'}, function(){
      this.route('guards');
      this.route('players');
      
      this.route('forwards');
      this.route('centers');
    }); 
  });
  this.resource('players', function(){
    this.resource('player', {path: ':player_id'}, function(){
      this.route('details');
    });
  });
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
  sortProperties: ['name']
});

/*
App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('players');
  }
});*/


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
  },
  renderTemplate: function(){
    this.render({outlet: 'main'});
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
    console.log('redir')
    return this.transitionTo('team.players', model);
  }*/
  renderTemplate: function(){
    this.render({outlet: 'detail'});
  }
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
    return false;
  }.property('filter'),

  forwardsFiltered: function(){
    if(this.filter === "forwards"){
      return true;
    }
    return false;
  }.property('filter'),

  centersFiltered: function(){
    if(this.filter === "centers"){
      return true;
    }
    return false;
  }.property('filter'),

  roster: function(){
    //debugger;
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
    filter: function(param){
      console.log(param);
      this.set('filter', param);
    },
    filterGuards: function(){
      //this.set('content', this.get('controllers.team').get('guards'));
      //this.resetFilterClasses();
      //this.activate('guardfilter');
      this.set('filterGuards', true);
    },
    filterCenters: function(){
      //this.set('content', this.get('controllers.team').get('centers'));
      //this.set('nofilter', 'small secondary');
      //this.resetFilterClasses();
      //this.activate('centerfilter');
      this.set('filterCenters', true);
    },
    filterForwards: function(){
      //this.set('content', this.get('controllers.team').get('forwards'));
      //this.set('nofilter', 'small secondary');
      //this.resetFilterClasses();
      //this.activate('forwardfilter');
      this.set('filterForwards', true);
    },
    clearFilters: function(){
      //this.set('content', this.get('controllers.team').get('players'));
      //this.resetFilterClasses();
      this.set('filterForwards', false);
      this.set('filterGuards', false);
      this.set('filterCenters', false);
    }
  }
});

App.TeamPlayersController = Ember.ArrayController.extend({
  needs: ['team'],
  filterGuards: false,
  nofilter: "small",
  guardfilter: "small secondary",
  forwardfilter: "small secondary",
  centerfilter: "small secondary",
  
  init: function(){
    console.log('hi');
    this.resetFilterClasses();
  },

  resetFilterClasses: function(){
    var classes = 'small secondary';
    this.set('guardfilter', classes);
    this.set('forwardfilter', classes);
    this.set('centerfilter', classes);
    this.set('nofilter', 'small');
  },

  activate: function(one){
    this.set(one, 'small');
    this.set('nofilter', 'small secondary');
  },

  valueObserver: function(){
    console.log('hi');
  }.observes('nofilter'),

  actions: {
    filterGuards: function(){
      this.set('content', this.get('controllers.team').get('guards'));
      this.resetFilterClasses();
      this.activate('guardfilter');
    },
    filterCenters: function(){
      this.set('content', this.get('controllers.team').get('centers'));
      this.set('nofilter', 'small secondary');
      this.resetFilterClasses();
      this.activate('centerfilter');
    },
    filterForwards: function(){
      this.set('content', this.get('controllers.team').get('forwards'));
      this.set('nofilter', 'small secondary');
      this.resetFilterClasses();
      this.activate('forwardfilter');
    },
    clearFilters: function(){
      this.set('content', this.get('controllers.team').get('players'));
      this.resetFilterClasses();
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
  number: DS.attr('number'),
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
