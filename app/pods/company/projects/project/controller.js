import Ember from 'ember';

export default Ember.Controller.extend({
  currentPath: '',
  showEditTab: Ember.computed('currentPath', function(){
    return this.get('currentPath')==='company.projects.project.index';
  })
});
