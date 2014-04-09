/**
 * Shows a simple date and time clock.
 *
 * Expects data from sources as a timestamp.
 */
Dashboard.ClockWidget = Dashboard.Widget.extend({


  init : function() {

 moment.tz.add({
    "zones": {
        "Europe/Berlin": [
            "0:53:28 - LMT 1893_3 0:53:28",
            "1 C-Eur CE%sT 1945_4_24_2 2",
            "1 SovietZone CE%sT 1946 1",
            "1 Germany CE%sT 1980 1",
            "1 EU CE%sT"
        ]
    },
    "rules": {
        "C-Eur": [
            "1916 1916 3 30 7 23 0 1 S",
            "1916 1916 9 1 7 1 0 0",
            "1917 1918 3 15 1 2 2 1 S",
            "1917 1918 8 15 1 2 2 0",
            "1940 1940 3 1 7 2 2 1 S",
            "1942 1942 10 2 7 2 2 0",
            "1943 1943 2 29 7 2 2 1 S",
            "1943 1943 9 4 7 2 2 0",
            "1944 1945 3 1 1 2 2 1 S",
            "1944 1944 9 2 7 2 2 0",
            "1945 1945 8 16 7 2 2 0",
            "1977 1980 3 1 0 2 2 1 S",
            "1977 1977 8 0 8 2 2 0",
            "1978 1978 9 1 7 2 2 0",
            "1979 1995 8 0 8 2 2 0",
            "1981 9999 2 0 8 2 2 1 S",
            "1996 9999 9 0 8 2 2 0"
        ],
        "SovietZone": [
            "1945 1945 4 24 7 2 0 2 M",
            "1945 1945 8 24 7 3 0 1 S",
            "1945 1945 10 18 7 2 2 0"
        ],
        "Germany": [
            "1946 1946 3 14 7 2 2 1 S",
            "1946 1946 9 7 7 2 2 0",
            "1947 1949 9 1 0 2 2 0",
            "1947 1947 3 6 7 3 2 1 S",
            "1947 1947 4 11 7 2 2 2 M",
            "1947 1947 5 29 7 3 0 1 S",
            "1948 1948 3 18 7 2 2 1 S",
            "1949 1949 3 10 7 2 2 1 S"
        ],
        "EU": [
            "1977 1980 3 1 0 1 1 1 S",
            "1977 1977 8 0 8 1 1 0",
            "1978 1978 9 1 7 1 1 0",
            "1979 1995 8 0 8 1 1 0",
            "1981 9999 2 0 8 1 1 1 S",
            "1996 9999 9 0 8 1 1 0"
        ]
    },
    "links": {}
});
   this._super();
  },
/*
  date: function() {
    var t = this.get('content');
    return t ? moment(t).format("ddd MMM DD YYYY") : "";
  }.property('content'),

  time: function() {
    var t = this.get('content');
    return t ? moment(t).format("HH:mm:ss") : "";
  }.property('content'),

  time2: function() {
    var t = this.get('content');
    if(t){
      var d = moment(t).subtract('hours',1).format("UTC HH:mm:ss");
      return d; //(d.getTime() + (d.getTimezoneOffset() * 60000)).format("UTC HH:mm:ss")

    }
    return "";
  }.property('content'),

  time3: function() {
    var t = this.get('content');
    return t ? moment(Date.UTC(t)).format("UTC HH:mm:ss") : "";
  }.property('content'),
*/
  templateName: 'clock_widget',
  classNames: ['widget', 'widget-clock']
});
