import Ember from 'ember';

export default Ember.Controller.extend({
  currentPath: '',
  showEditTab: Ember.computed('currentPath', function(){
    return this.get('currentPath')==='company.projects.project.index';
  }),
  showBreadCrumbs: Ember.computed('currentPath', function(){
    return this.get('currentPath')!=='company.projects.project.index';
  }),
  showBreadCrumbsForStages: Ember.computed('currentPath', function(){
    var currentPath = this.get('currentPath');
    return  currentPath.includes('company.projects.project.stages') &&
            currentPath!=='company.projects.project.stages.index';
  }),
  showBreadCrumbsForStage: Ember.computed('currentPath', function(){
    var currentPath = this.get('currentPath');
    return  currentPath.includes('company.projects.project.stages.stage') &&
            currentPath!=='company.projects.project.stages.stage.index';
  })
});
