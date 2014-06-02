/**
 * Shows a single image.
 *
 * Expects data from sources as URLs to the image to show.
 */
Dashboard.ImageWidget = Dashboard.FlippableWidget.extend({
  templateName: 'image_widget',
  classNames: ['widget', 'widget-image']
});
