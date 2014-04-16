DashboardConfig = {
  configName: '1080p',

  dim: [5, 2],

  widgetMargins: 5,

  grid: {
    width: 1920,
    height: 1080,

    sources: {

      wormsSource: {
        className: 'Dashboard.PeriodicSource',
        args: {
          period: 600000, // updates once every 10 mins
          dataUpdate: function(callback) {
            var dataFile = "assets/worms.txt";
            var rawFile = new XMLHttpRequest();

            rawFile.open("GET", dataFile, true);
            rawFile.onreadystatechange = function ()
            {
              var dataObj = { scores: [] };

              if(rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status == 0))
              {
                var teams = rawFile.responseText.split('\n');
                for(var i = 0; i < teams.length; i++) {
                  var stats = teams[i].split(',');
                  if(stats[0].length > 0) {
                    var newTeamObj = {
                      team: stats[0],
                      losses: parseInt(stats[1]),
                      wins: parseInt(stats[3]),
                      draws: parseInt(stats[5]),
                      kills: parseInt(stats[7]),
                      deaths: parseInt(stats[9]),
                    };

                    // ratio is the number of victories in relation to number of games played
                    newTeamObj.ratio = ((newTeamObj.wins / (newTeamObj.wins + newTeamObj.draws + newTeamObj.losses)) * 100).toFixed(1);
                    dataObj.scores.push(newTeamObj);
                  }
                }

                // sort by ratio, then number of victories, then number of kills
                dataObj.scores.sort(
                  function(a,b) {
                    if(b.ratio == a.ratio) {
                      if(b.wins == a.wins)
                        return b.kills - a.kills;
                      return b.wins - a.wins;  
                    }
                    return b.ratio - a.ratio;
                  }
                );

                console.log(dataObj);

                // best team is first team after sorting
                dataObj.best = dataObj.scores[0].team;
              }

              callback(dataObj);
            }
            rawFile.send(null);
          }
        }
      },

      numberSource: {
        className: 'Dashboard.PeriodicSource',
        args: {
          period: 5000,
          dataUpdate: function(callback) {
            callback(Math.abs(Math.round(Math.random() * 100 - 50)));
          }
        }
      },

      dogeNumberSource: {
        className: 'Dashboard.PeriodicSource',
        args: {
          period: 5000,
          dataUpdate: function(callback) {
            callback(Math.abs(Math.round(Math.random() * 500)));
          }
        }
      },

      sinSource: {
        className: 'Dashboard.PeriodicSource',
        args: {
          period: 1500,
          currentX: 0,
          dataUpdate: function(callback) {
            var step = 0.5;
            var curr = this.get('currentX');
            this.set('currentX', curr + step);
            var arr = [];
            for(var i = 0; i < 5; i++)
              arr.push({ x: curr + i * step, y: Math.sin(curr + i * step) + 1 });
            callback(arr);
          }
        }
      },

      tasksSource: {
        className: 'Dashboard.PeriodicSource',
        args: {
          period: 10000,
          dataUpdate: function(callback) {
            callback([
              {
                task: "Random task",
                pointsTotal: 3,
                pointsDone: 1,
                assignedTo: [{
                  name: "ruippeixotog",
                  avatarUrl: "https://s.gravatar.com/avatar/77db744fe19ef16f523eb97d98d13459?s=30"
                }]
              },
              {
                task: "Considerable stuff",
                pointsTotal: 8,
                pointsDone: 4,
                assignedTo: [{
                  name: "jcazevedo",
                  avatarUrl: "https://s.gravatar.com/avatar/7724a3ee1890f271f424878b0524ae15?s=30"
                }, {
                  name: "andrebeat",
                  avatarUrl: "https://s.gravatar.com/avatar/63537cab97f0190f063c49da088bb509?s=30"
                }]
              },
              {
                task: "Serious biz",
                pointsTotal: 15,
                pointsDone: 3,
                assignedTo: [{
                  name: "andrebeat",
                  avatarUrl: "https://s.gravatar.com/avatar/63537cab97f0190f063c49da088bb509?s=30"
                }]
              },
              {
                task: "Major things",
                pointsTotal: 1,
                pointsDone: 0,
                assignedTo: [{
                  name: "ruippeixotog",
                  avatarUrl: "https://s.gravatar.com/avatar/77db744fe19ef16f523eb97d98d13459?s=30"
                }]
              }
            ])
          }
        }
      }
    },

    widgets: [
      {
        pos: [1, 2],
        widget: 'Dashboard.WeatherWidget',
        source: 'Dashboard.WeatherSource',
        sourceArgs: { woeId: 746203 }
      },
      {
        pos: [2, 2],
        widget: 'Dashboard.MeterWidget',
        source: 'Dashboard.MeterSource',
        args: { title: 'Work Meter' }
      },
      {
        pos: [1, 3],
        widget: 'Dashboard.ClockWidget',
        source: 'Dashboard.TimeSource'
      },
      /* {
        pos: [3, 2],
        size: [1, 2],
        widget: 'Dashboard.BuildWidget',
        source: 'Dashboard.JenkinsSource',
        sourceArgs: {
          baseUrl: "https://jenkins.qa.ubuntu.com",
          view: "PS"
        }
      }, */
      {
        pos: [1, 4],
        size: [2, 1],
        widget: 'Dashboard.YoutubeWidget',
        args: {
          embedUrl: "https://www.youtube.com/embed/0pNNtY_iyUg?" +
            "autoplay=0&controls=0&rel=0&showinfo=0&iv_load_policy=3",
          title: 'Instant (Politically Correct) Calabria'
        }
      },
      {
        pos: [2, 1],
        widget: 'Dashboard.GraphWidget',
        source: 'sinSource'
      },
      {
        pos: [1, 1],
        size: [1, 1],
        widget: 'Dashboard.SysorbWidget',
        source: 'numberSource',
        args: { 
          title: "Sysorb", 
          embedUrl: "https://sysorb01.netgroup.dk/sysorb/index.cgi?path=1.3.4&view=1.4097428843&disabletop=yes&viewdisabletop=yes"
          /*embedUrl: "https://sysorb01.netgroup.dk/sysorb/index.cgi?path=1.3.4&view=1.4097428843&passwd=&tld=cust.semasio&username=hugo&disabletop=yes&viewdisabletop=yes"*/
        }
      },
      /*{
        pos: [2, 2],
        widget: 'Dashboard.ScrumWidget',
        source: 'tasksSource',
        args: { title: "Sprint" }
      },*/
      {
        pos: [2, 3],
        widget: 'Dashboard.WormsWidget',
        source: 'wormsSource',
        args: {
          title: "Worms scoreboard"
        }
      },
      /* {
        pos: [2, 3],
        widget: 'Dashboard.SongWidget',
        source: 'Dashboard.LastFmSource',
        sourceArgs: {
          period: 60000, // can be less than 1 minute if a new API key is created!
          lastFmUsers: ["ruippeixotog", "jcazevedo", "beat1", "bytter", "skyh0rse"],
          apiKey: "c0918a85adee9c257b83c66c03dd681b"
        }
      }, */
      {
        pos: [2, 4],
        widget: 'Dashboard.NumberWidget',
        source: 'numberSource',
        args: { title: "Useful number" }
      },
      {
        pos: [2, 5],
        widget: 'Dashboard.DogeWidget',
        source: 'dogeNumberSource',
        args: { title: "Doge number" }
      }
    ]
  }
};
