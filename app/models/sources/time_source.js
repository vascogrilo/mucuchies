/**
 * Provides the current time every second.
 *
 * The data is provided as timestamps.
 */
Dashboard.TimeSource = Dashboard.PeriodicSource.extend({
  period: 1000,

  dataUpdate: function(callback) {
  	var d = moment();
  	var dataObj = {
  		date: d.format("ddd MMM DD YYYY") ,
  		local: d.format("HH:mm:ss"),
  		cet: d.tz("Europe/Berlin").format("HH:mm:ss z"),
  		utc: d.utc().format("HH:mm:ss" ) + " UTC",
  		
  	}
    callback(dataObj);
  }
});
