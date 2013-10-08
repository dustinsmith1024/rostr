window.App = Ember.Application.create();

App.Router.map(function(){
  this.resource('teams', function(){
    this.resource('team', {path: ':team_id'}); 
  });
});

/*App.ApplicationRoute = Ember.Route.extend({
  model: function(){
    return 
    var store = this.get('store'); 

    store.push('team', {
      id: 1,
      name: "Fewer Moving Parts"
    });

    store.push('team', {
      id: 2,
      name: "Calgary b/w I Can't Make You Love Me/Nick Of Time"
    });
  }
});*/

/*App.ApplicationRoute = Ember.Route.extend({
  setupController: function() {

    }
  }
});*/

App.PlayersController = Ember.ArrayController.extend({
  
  /*addFood: function(food) {
    var table = this.controllerFor('table').get('model'),
        tabItems = table.get('tab.tabItems');

    tabItems.createRecord({
      food: food,
      cents: food.get('cents')
    });
  }*/

});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('teams');
  }
});


App.TeamsRoute = Ember.Route.extend({
  model: function() {
    //return App.Team.FIXTURES;
    var store = this.get('store');
    var teams = store.find('team');
    return teams;
  }
});

App.TeamRoute = Ember.Route.extend({
  /*setupController: function(controller, model) {
    console.log('team controller');
    if (model && model.id) {
      //var roster = App.Player.FIXTURES.filterBy('team', model.id);
      //var store = this.get('store');
      //var roster = store.find('player', model.id);
      var roster = model.get('players');
      //debugger;
      this.controllerFor('players').set('model', roster);
      controller.set('model', model);
    }
  },*/
  model: function(params){
    //console.log('team model');
    //var stuff = App.Team.FIXTURES.filterBy('id', params.team_id)[0];
    //return stuff;
    var store = this.get('store');
    /*var promises = [
      store.find('team', params.team_id),
      store.find('player')
    ];
    return Ember.RSVP.all(promises);*/
    return store.find('team', params.team_id);
  }
});

// Controllers
// Implement explicitly to use the object proxy.
App.TeamsController = Ember.ArrayController.extend({
  sortProperties: ['id']
});

App.TeamController = Ember.ObjectController.extend({});


/// Fixtures
App.Store = DS.Store.extend({
  //revision: 13,
  //adapter: DS.FixtureAdapter.create()
  adapter: 'DS.RESTAdapter'
});


App.Team = DS.Model.extend({
  name: DS.attr('string'),
  players: DS.hasMany('player')
});

/*App.Tab = DS.Model.extend({
  tabItems: DS.hasMany('App.TabItem'),
  cents: function() {
    return this.get('tabItems').getEach('cents').reduce(function(accum, item) {
      return accum + item;
    }, 0);
  }.property('tabItems.@each.cents')
});*/

App.Player = DS.Model.extend({
  number: DS.attr('number'),
  name: DS.attr('string'),
  team: DS.belongsTo('team')
});
/*
App.Post = DS.Model.extend({
  comments: DS.hasMany('comment')
});

App.Comment = DS.Model.extend({
  post: DS.belongsTo('post')
});*/
/*App.Food = DS.Model.extend({
  name: DS.attr('string'),
  imageUrl: DS.attr('string'),
  cents: DS.attr('number')
});*/

/*
App.Team.FIXTURES = [{
  id: '1',
  name: "Thunder",
  playas: [
  {name:1},{name:2},{name:4}
  ]
}, {
  id: '2',
    name: "Fire"
}, {
  id: '3',
  name: "Ice"
}, {
  id: '4',
  name: "Quick"
}, {
  id: '5',
  name: "Lakers"
}, {
  id: '6',
  name: "Wolves"
}];

App.Player.FIXTURES = [{
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
}];
*/


