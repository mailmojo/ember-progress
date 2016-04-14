import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('progress-circle', 'Integration | Component | progress circle', {
  integration: true
});

test('it renders', function (assert) {
  assert.expect(2);

  this.render(hbs`{{progress-circle}}`);

  const svg = this.$('svg.progress');

  assert.equal(svg.length, 1);
  assert.equal(svg.find('> circle').length, 1);
});

test('it renders with a given size', function (assert) {
  assert.expect(2);

  this.render(hbs`{{progress-circle size=50}}`);

  const svg = this.$('svg.progress');

  assert.equal(svg.width(), 50);
  assert.equal(svg.height(), 50);
});
