import Ember from 'ember';

export default Ember.Controller.extend({
  progress: 0,

  update: Ember.on('init', function () {
    Ember.run.later(() => {
      if (this.get('progress') < 100) {
        this.incrementProperty('progress');
        this.update();
      }
    }, 100);
  }),
});
