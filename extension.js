(function(ext) {



    var rapidLib = null;
    var regression = null;
    var classification = null;
    var myTrainingSet = [];

    function loadRapidLib() {
      $.getScript('https://www.doc.gold.ac.uk/eavi/rapidmix/RapidLib.js')
        .done(function(script, textStatus) {
          console.log('Loaded RapidLib');
          loadRapidLibModules();
        })
        .fail(function(jqxhr, settings, exception) {
          console.log('Error loading RapidLib');
          loadRapidLib();
      });
    }

    function loadRapidLibModules() {
      rapidLib = window.RapidLib();
      regression = new rapidLib.Regression();
      classification = new rapidLib.Classification();
    }

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.power = function(base, exponent) {
        return Math.pow(base, exponent);
    };

    // Functions for block with type 'w' will get a callback function as the
    // final argument. This should be called to indicate that the block can
    // stop waiting.
    ext.wait_random = function(callback) {
        wait = Math.random();
        console.log('Waiting for ' + wait + ' seconds');
        window.setTimeout(function() {
            callback();
        }, wait*1000);
    };

    ext.get_temp = function(location, callback) {
            // Make an AJAX call to the Open Weather Maps API
            $.ajax({
                  url: 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&units=imperial',
                  dataType: 'jsonp',
                  success: function( weather_data ) {
                      // Got the data - parse it and return the temperature
                      temperature = weather_data['main']['temp'];
                      callback(temperature);
                  }
            });
        };

        ext.set_alarm = function(time) {
       window.setTimeout(function() {
           alarm_went_off = true;
       }, time*1000);
    };

    ext.when_alarm = function() {
       // Reset alarm_went_off if it is true, and return true
       // otherwise, return false.
       if (alarm_went_off === true) {
           alarm_went_off = false;
           return true;
       }

       return false;
    };


    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name, param1 default value, param2 default value
            ['r', '%n ^ %n', 'power', 2, 3],
            ['w', 'wait for random time', 'wait_random'],
            ['R', 'current temperature in city %s', 'get_temp', 'Boston, MA'],
            ['', 'run alarm after %n seconds', 'set_alarm', '2'],
            ['h', 'when alarm goes off', 'when_alarm']
        ],
        url: 'https://frantic0.github.io/scratch-interactive-machine-learning-extension/',
        displayName: 'Interactive Machine Learning for ScratchX'
    };

    // Register the extension
    ScratchExtensions.register('Interactive Machine Learning for ScratchX', descriptor, ext);
    loadRapidLib();

})({});
