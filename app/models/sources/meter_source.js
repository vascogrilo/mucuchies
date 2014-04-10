/**
 * Provides weather data from the Yahoo API. The ID of a location can be found at
 * http://woeid.rosselliot.co.nz/.
 *
 * Provides data in the form:
 * {
 *   temperature: "14"               // in Celsius
 *   code: "weather_condition_code"  // one from http://developer.yahoo.com/weather/#codes
 *   city: "city name"
 * }
 */
Dashboard.MeterSource = Dashboard.PeriodicSource.extend({
  period: 60000,

  dataUpdate: function(callback) {
    //callback({ value: Math.round(Math.random() * 100 - 50), message: "Meter message" });

    var val = -1;
    var date = new Date();

    var wd = date.getDay();
    var hh = date.getHours();
    var mm = date.getMinutes();
    var tm = hh * 60 + mm;
    var prob = Math.round(Math.random() * 100);
    var weekdayName = {
      0: "sunday", 1: "monday", 2: "tuesday", 3: "wednesday", 4: "thursday", 5: "friday", 6: "saturday"
    }

    if (wd == 0 || wd == 6) { val = 100; }
    else {
      if (tm < 570 ) val = 0;
      else if (tm > 1110 ) val = 100;
      else val = Math.round((tm-570)/540 * 100);
    }

    var theData = {
      // this will supercede anything else
      priority: function(date, prob){ 
        if(date.getDate() == 25 && date.getMonth() == 11) return "Merry Christmas!";
        return null;
      },

      // stuff that should appear every day during a specific time interval
      daily: function(h, m, prob) {
        if(h == 9 && m > 55) return "-PREPARE FOR STANDUP-"
        if(h == 10 && m > 0 && m < 15) return "-STAND UP TIME-";
        if(h == 12 && m > 30 && m < 50) return "-HUGO'S WC BREAK 1-";
        if(h == 13) return "-TACHO TIME-";
        if(h == 14 && m > 30 && m < 50) return "-HUGO'S WC BREAK 2-";
        if(h == 17 && m > 30 && m < 50) return "-HUGO'S WC BREAK 3-";
        if(h == 18 && m > 20 && m < 31) return "-HOME O'CLOCK-";
        return null;
      },

      monday: function(h, m, prob) {
        if(prob < 5) return "Monday sucks balls.";
        if(prob < 10) return "5 days until weekend. :(";
        return null;
      },

      tuesday: function(h, m, prob) {
        if(prob < 5) return "4 days until the weekend. :|";
        return null;
      },

      wednesday: function(h, m, prob) {
        if(h >= 15 && h < 16 && prob < 2) return "This message has a 2% chance to appear.";
        if(prob < 7) return "3 days until the weekend...";
        return null;
      },

      thursday: function(h, m, prob) {
        if(prob < 5) return "Only 2 days until the weekend! :)";
        if(prob < 10) return "LITTLE FRIDAY, MOTHERFUCKER!";

        return null;
      },

      friday: function(h, m, prob) {

        if(h == 13) return "Time for TEAM LUNCH!";
        if((h >= 17 && m >= 30) || h > 18) return "Wormageddon is upon us! Time to play!";

        if(prob < 5) return "Almost there, weekend time!";
        if(prob < 10) return "FRIDAY IS UPON US, REJOICE!";

        return null;
      },

      saturday: function(h, m, prob) {
        return "WTF are you doing here?";
      }, 

      sunday: function(h, m, prob) {
        return "WTF are you doing here?";
      },

      orelse: function(h, m, prob) {
        var randomMessages = [];

        if(h < 9) {
          randomMessages = [
            "YAWN!",
            "Too early to care...",
            "Too soon?",
            "Such sleep. Much tired. Wow.",
            "Shouldn't you be sleeping?",
            "ZZZZZZZZZ",
            "*silent fart in the night*",
            "*drools a bit*"
          ];
        } else if(h < 10) {
          randomMessages = [
            "YAMN!",
            "The early bird gets the worm.",
            "Let me just wash my face...",
            "WERE\'S MY COFFEE!",
            "Ready to work?",
            "GO! GO! GO!"
          ];
        } else if((h < 13 || (h >= 14 && h <= 17)) && prob < 40) {
          // work hour - 40% chance of personal messages
          randomMessages = [
            "Zé, stop watching LoL.",
            "Vasco, do you hate computers?",
            "Tiago, is the new UI ready? - Next week",
            "Hugo, when was your last commit?",
            "Work, bitches!",
            "Sucks to be you right now.",
            "You should see your faces reading this."
          ];
        } else if((h < 13 || (h >= 14 && h <= 17)) && prob < 80) {
          // work hours - 40% chance of a programming joke!
          randomMessages = [
            "Computers make very fast, very accurate mistakes.",
            "CAPS LOCK – Preventing Login Since 1980.",
            "Artificial intelligence usually beats real stupidity.",
            "The Internet: men are men, women are men, and children are FBI agents.",
            "Unix is user friendly. It’s just selective about who its friends are.",
            "If at first you don’t succeed; call it version 1.0.",
            "Hey! It compiles! Ship it!",
            "All wiyht. Rho sritched mg kegtops awound?",
            "Evolution is God’s way of issuing upgrades.",
            "Bug? That's not a bug, that's a feature.",
            "-COFFEE.EXE Missing- Insert Cup and Press Any Key.",
            "Vasco, what does FORMATTING DRIVE C mean?",
            "Every bug you find is the last one.",
            "Is reading in the bathroom considered Multi-Tasking?",
            "One picture is worth 128K words.",
            "I came, I saw, I deleted all your files.",
            "Warning, keyboard not found. Press Enter to continue.",
            "A SQL query walks up to two tables and asks, \"Can I join you?\"",
            "NOT ARBITRARILY COMPLEX ENOUGH!"
          ];
        } else if(h >= 18) {
          randomMessages = [
            "Time to stop!",
            "Are you doing extra time today?",
            "Is ME01 crashing again?",
            "Seriously, tell Thomas you have to go!"
          ];
        } else if(h >= 19) {
            randomMessages = ["Playing games at work, are we?"];
        } else if(h >= 20) {
            randomMessages = ["Go home. Seriously."];
        } else {
          randomMessages = [
            "That's what SHE said!",
            "God must love stupid people. He made SO many.",
            "Good girls are bad girls that never get caught.",
            "If God is watching us, the least we can do is be entertaining.",
            "I could agree with you, but then we'd be both wrong",
            "Laugh at your problems, everybody else does.",
            "I intend to live forever. So far, so good.",
            "When in doubt, mumble.",
            "I used to be indecisive. Now I’m not sure.",
            "Never hit a man with glasses. Use a baseball bat.",
            "Life’s a bitch, ’cause if it was a slut, it’d be easy.",
            "Why didn’t Noah swat those two mosquitoes?",
            "Without nipples, breasts would be pointless.",
            "No one is listening until you fart.",
            "What has four legs and an arm? A happy pit bull.",
            "Constipated people don’t give a crap.",
            "Why is a bra singular and panties plural?",
            "I’d kill for a Nobel Peace Prize.",
            "I bet you I could stop gambling.",
            "Sex on TV can’t hurt unless you fall off.",
            "ARE YOU NOT ENTERTAINED??"
          ];
        } 

        return randomMessages[Math.round(Math.random()*randomMessages.length)];
      },
    };

    // if a priority message is found, display that
    var msg = theData.priority(date, prob);

    if(msg == null) {
      // check if there's any daily message for this time period
      var msg = theData.daily(hh, mm, prob);
      
      // see if anything for the current day should override the message
      var dayMsg = theData[weekdayName[wd]](hh, mm, prob);
      if(dayMsg != null) msg = dayMsg;

      // otherwise, get a random, default message
      if(msg == null)
        var msg = theData.orelse(hh, mm, prob);
    }

    callback({ value: val, message: msg });
  }
});
