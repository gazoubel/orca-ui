export function initialize(app) {
  ['controller', 'component', 'route', 'router'].forEach(injectionTarget => {
    app.inject(injectionTarget, 'appManager', 'service:appManager');
  });
}

export default {
  name: 'init',
  initialize
};
