import Ember from 'ember';

export default Ember.Controller.extend({
  projects: null,
  activeProjects: Ember.computed.filterBy('projects','isArchived', false),
  showAll: false,
  displayProjects: Ember.computed('showAll', function(){
    var showAll = this.get('showAll');
    if (showAll) {
        return this.get('projects');
    }
    return this.get('activeProjects');
  }),
  actions: {
    toggleShowAll(){
      var showAll = this.get('showAll');
      this.set('showAll', !showAll);
    }
  }
});
