import Ember from 'ember';

export default Ember.Controller.extend({
  intl: Ember.inject.service(),
  availableTeamMembers: Ember.computed.setDiff('company.people', 'project.teamMembers'),
  actions:{
    addNewMember(newMember){
      var members = this.get('project.teamMembers');
      members.pushObject(newMember);
      var _sef = this;
      // this.get('project').save();
      this.get('project').save().then(function(){
        _sef.get('appManager').notify('success', _sef.get('intl').t('product.messages.successfuly_added'));
      }).catch(function(reason){
        _sef.get('appManager').notify('error', reason);
      });
      this.set('selectedMember', {});
      return false;
    },
    remove(teamMember){
      var members = this.get('project.teamMembers');
      members.removeObject(teamMember);
      var _sef = this;
      this.get('project').save().then(function(){
        _sef.get('appManager').notify('success', _sef.get('intl').t('product.messages.successfuly_removed'));
      }).catch(function(reason){
        _sef.get('appManager').notify('error', reason);
      });
      return false;
    },
    closeAddPanel(){
      this.set('selectedMember', {});
    }
  }
});
