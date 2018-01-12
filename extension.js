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
      console.log('Loaded RapidLib Modules');
    }

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.recordExamples = function(f1, f2, f3, f4, f5, label) {
      myTrainingSet.push({
        input: [f1, f2, f3, f4, f5],
        output: [label]
      });
      return myTrainingSet.length;
    };

    ext.clearExamples = function() {
      myTrainingSet = [];
    };

    ext.trainClassifier = function(f1, f2, f3, f4, f5, label) {
      classification.train(myTrainingSet);
    };

    ext.runClassifier = function(f1, f2, f3, f4, f5) {
      return classification.run([f1, f2, f3, f4, f5]);
    };

    ext.trainRegressifier = function(f1, f2, f3, f4, f5, label) {
      regression.train(myTrainingSet);
    };

    ext.runRegressifier = function(f1, f2, f3, f4, f5) {
      return regression.run([f1, f2, f3, f4, f5]);
    };

    // Block and block menu descriptions
    var descriptor = {
      blocks: [
        // Block type, block name, function name, param1 default value, param2 default value
        ['r', 'record examples f1 %n f2 %n f3 %n f4 %n f5 %n with label %n', 'recordExamples', 0, 0, 0, 0, 0, 0],
        [' ', 'clear examples', 'clearExamples'],
        ['-'],
        ['w', 'train classifier', 'trainClassifier'],
        ['r', 'run classification f1 %n f2 %n f3 %n f4 %n f5 %n', 'runClassifier', 0, 0, 0, 0, 0],
        ['-'],
        ['w', 'train regressifier', 'trainRegressifier'],
        ['r', 'run regression f1 %n f2 %n f3 %n f4 %n f5 %n', 'runRegressifier', 0, 0, 0, 0, 0],
      ],
      url: 'https://frantic0.github.io/scratch-interactive-machine-learning-extension/'
    };

    // Register the extension
    ScratchExtensions.register('Interactive Machine Learning', descriptor, ext);
    loadRapidLib();
})({});
