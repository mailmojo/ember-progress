import Ember from 'ember';
import layout from '../templates/components/progress-circle';

/**
 * Component for displaying a circular progress indicator.
 *
 * When using the component in templates, bind the `progress` attribute to a
 * value going from 0 to 100. For instance, if you've got an attribute
 * `uploadPercentage` indicating the status of a file upload process, pass it
 * to the `progress-circle` helper like so:
 *
 *   {{progress-circle progress=uploadPercentage}}
 */
export default Ember.Component.extend({
  layout,

  /**
   * Progress in percentage (0-100).
   *
   * @type {Number}
   */
  progress: 0,

  /**
   * Pixel width and height of the progress indicator.
   *
   * @type {Number}
   */
  size: 48,

  /**
   * Pixel width of the progress arc.
   *
   * @type {Number}
   */
  strokeWidth: 2,

  /**
   * View box of the rendered SVG element.
   *
   * @private
   * @type {String}
   */
  _viewBox: Ember.computed('size', function () {
    const size = this.get('size');
    return `0 0 ${size} ${size}`;
  }),

  /**
   * Relative center of the progress circle in pixels.
   *
   * @private
   * @type {Number}
   */
  _center: Ember.computed('size', function () {
    return this.get('size') / 2;
  }),

  /**
   * Inner diameter of the progress circle (not counting the stroke).
   *
   * @private
   * @type {Number}
   */
  _diameter: Ember.computed('size', 'strokeWidth', function () {
    /*
     * Stroke-width has to be considered when calculating the diameter of the
     * circle. Strokes are centered around the path, so stroking the circle
     * adds two half-strokes to the diameter, meaning we have to subtract a
     * whole stroke-width to determine the true diameter. 1 pixel is subtracted
     * to prevent microscopic portions of the circle from being drawn outside
     * the container.
     */
    return this.get('size') - this.get('strokeWidth') - 1;
  }),

  /**
   * Inner radius of the progress cicle (not counting the stroke).
   *
   * @private
   * @type {Number}
   */
  _radius: Ember.computed('_diameter', function () {
    return this.get('_diameter') / 2;
  }),

  /**
   * Inner circumference of the progress circle (not counting the stroke).
   *
   * @private
   * @type {Number}
   */
  _circumference: Ember.computed('_diameter', function () {
    return Math.PI * this.get('_diameter');
  }),

  /**
   * Compute the offset into the circle of which the dash stroke should start.
   * Note that this will be equal to the circumference for an empty circle, and
   * 0 for a full circle.
   *
   * For more information on how this works, see:
   * http://jakearchibald.com/2013/animated-line-drawing-svg/
   *
   * @private
   * @type {Number}
   */
  _dashOffset: Ember.computed('_circumference', 'progress', function () {
    const circumference = this.get('_circumference');
    let progress = this.get('progress');

    progress = Math.max(0, Math.min(progress, 100));
    return ((100 - progress) / 100) * circumference;
  }),

  /**
   * Compute `stroke-dashoffset` CSS attribute.
   *
   * `stroke-dashoffset` should be set through inline style rather than a plain
   * SVG attribute for CSS animation purposes.
   *
   * @private
   * @type {String}
   */
  _dashOffsetStyle: Ember.computed('_dashOffset', function () {
    return `stroke-dashoffset: ${this.get('_dashOffset')};`;
  }),

  /**
   * Rotate by -90° from the center to have the progress bar start at top
   * instead of the right.
   *
   * NOTE: The current implementation rotates by -89.999° instead of 90°
   * because of a bug in Firefox on Mac OS X. The bug causes rotation
   * transforms applied to SVG circles with stroke-dasharray to be treated as
   * 0° at multiples of 90°, which is exactly what we do here.
   *
   * Supposedly fixed in Firefox 36:
   * https://bugzilla.mozilla.org/show_bug.cgi?id=949661
   *
   * @private
   * @type {String}
   */
  _transform: Ember.computed('_center', function () {
    const center = this.get('_center');

    return `rotate(-89.999, ${center}, ${center})`;
  }),
});
