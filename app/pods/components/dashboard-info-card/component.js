import Ember from 'ember';

export default Ember.Component.extend({
  // classNames: ['small-box'],
  // classNameBindings: ['color'],
  color: 'bg-yellow',
  icon: 'ion-ios-list-outline',
  // attributeBindings: ['title', 'subTitle', 'moreInfoRoute'],
  title: null,
  subTitle: null,
  progress:0,
  progressDescription:null,
  displayProgress: false,
  useWhiteBackground: false,
  barWidth: Ember.computed('progress', function(){
    return new Ember.String.htmlSafe('width:' + this.get('progress') + '%');
  })
});
