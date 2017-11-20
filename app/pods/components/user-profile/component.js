import Ember from 'ember';

export default Ember.Component.extend({
  person: null,
  canEdit: true,
  userMainInfoImgStyle: Ember.computed('person.user', function(){
    return this.get('person.user')?'padding-left:15px;':'';
  }),

  actions: {
    activate(person, isActive){
      var _ref = this;
      person.set('isActive', isActive);
      return person.save().then(function(){
        var message;
        if (isActive) {
          message = _ref.get('intl').t('product.administration.people.person.person_is_active');
        }else {
          message = _ref.get('intl').t('product.administration.people.person.person_is_inactive');
        }
        _ref.get('appManager').notify('success', message);
      }).catch(function(reason){
        _ref.get('appManager').notify('error', reason);
      });
    }
  }
});
