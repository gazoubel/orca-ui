import Ember from 'ember';

export default Ember.Component.extend({
  // classNames: ['small-box'],
  // classNameBindings: ['color'],
  color: 'bg-yellow',
  icon: 'ion-ios-list-outline',
  // attributeBindings: ['title', 'subTitle', 'moreInfoRoute'],
  title: null,
  subTitle: null,
  moreInfoRoute: null,
});
