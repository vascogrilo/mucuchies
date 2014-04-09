/**
 * Shows an arbitrary number along with an indicator showing if the number increased or decreased in
 * relation to its previous update.
 *
 * Expects data from sources as a single number.
 */
Dashboard.SysorbWidget = Dashboard.Widget.extend({
  sourceData: 0,
  previous: 0,
  templateName: 'sysorb_widget',
  classNames: ['widget', 'widget-sysorb'],
  preUnit: "",
  postUnit: "",
});
