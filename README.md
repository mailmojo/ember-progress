# Ember Progress [![npm version](https://badge.fury.io/js/ember-progress.svg)](https://badge.fury.io/js/ember-progress) [![Build Status](https://travis-ci.org/eliksir/ember-progress.svg?branch=master)](https://travis-ci.org/eliksir/ember-progress) [![Ember Observer Score](https://emberobserver.com/badges/ember-progress.svg)](https://emberobserver.com/addons/ember-progress)

Ember Progress is an [Ember](http://emberjs.com/) addon for displaying
dead-simple progress indicators.

![Example of a circular progress indicator](animations/progress-circle.gif)

## Installation

### As an addon

* `ember install ember-progress`

### For development

* `git clone` this repository
* `npm install`
* `bower install`

## Usage

This addon provides a component for rendering a circular progress indicator.

The component can be used in templates as follows, assuming that `progress` is a
number between 0 and 100:

```hbs
{{progress-circle progress=progress}}
```

Properties that the component understands are summarized in the table below.

| Property name          | Type   | Description                                       |
| ---------------------- | ------ | ------------------------------------------------- |
| `progress`             | Number | Progress in percentage (0-100).                   |
| `size`                 | Number | Pixel width and height of the progress indicator. |
| `strokeWidth`          | Number | Pixel width of the progress arc.                  |

The progress indicator can be styled in CSS by targeting the `.progress circle`
selector. For instance, the following will change the color of the progress
indicator to red:

```css
.progress circle {
  stroke: red;
}
```

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
