import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('progress-circle', 'Unit | Component | progress circle', {
  needs: []
});

test('it exists', function (assert) {
  assert.expect(1);

  const component = this.subject();

  assert.ok(!!component);
});

test('view box is computed correctly', function (assert) {
  assert.expect(1);

  const component = this.subject({ size: 50 });

  assert.equal(component.get('_viewBox'), '0 0 50 50');
});

test('center is computed correctly', function (assert) {
  assert.expect(1);

  const component = this.subject({ size: 40 });

  assert.equal(component.get('_center'), 20);
});

test('diameter is computed correctly', function (assert) {
  assert.expect(1);

  const component = this.subject({ size: 60, strokeWidth: 5 });

  assert.equal(component.get('_diameter'), 54);
});

test('radius is computed correctly', function (assert) {
  assert.expect(1);

  const component = this.subject({ _diameter: 30 });

  assert.equal(component.get('_radius'), 15);
});

test('circumference is computed correctly', function (assert) {
  assert.expect(1);

  const component = this.subject({ _diameter: 20 });

  assert.equal(component.get('_circumference').toFixed(2), 62.83);
});

test('dash offset is computed correctly for an empty circle', function (assert) {
  assert.expect(1);

  const component = this.subject({ _circumference: 10, progress: 0 });

  assert.equal(component.get('_dashOffset'), component.get('_circumference'));
});

test('dash offset is computed correctly for a half-circle', function (assert) {
  assert.expect(1);

  const component = this.subject({ _circumference: 10, progress: 50 });

  assert.equal(component.get('_dashOffset'), 5);
});

test('dash offset is computed correctly for a full circle', function (assert) {
  assert.expect(1);

  const component = this.subject({ _circumference: 10, progress: 100 });

  assert.equal(component.get('_dashOffset'), 0);
});

test('dash offset style is computed correctly', function (assert) {
  assert.expect(1);

  const component = this.subject({ _dashOffset: 5 });

  assert.equal(component.get('_dashOffsetStyle'), 'stroke-dashoffset: 5;');
});

test('SVG transform is computed correctly', function (assert) {
  assert.expect(1);

  const component = this.subject({ _center: 25 });

  assert.equal(component.get('_transform'), 'rotate(-89.999, 25, 25)');
});
