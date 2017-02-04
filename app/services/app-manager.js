import Ember from 'ember';

export default Ember.Service.extend({
  notifications: Ember.inject.service('notification-messages'),

  notify: function(notificationType, message) {
    switch (notificationType) {
      case 'info':
        this.get('notifications').info(message, {
          autoClear: true
        });
        break;
      case 'error':
        this.get('notifications').error(message, {
          autoClear: true
        });
        break;
      case 'success':
        this.get('notifications').success(message, {
          autoClear: true
        });
        break;
      case 'warning':
        this.get('notifications').warning(message, {
          autoClear: true
        });
        break;
    }
  }
});
