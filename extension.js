(function(ext) {


    var rapidLib = null;
    var regression = null;
    var classification = null;

    var myTrainingSet = [];

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {
      rapidLib = null;
      regression = null;
      classification = null;
      myTrainingSet = [];
    };

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

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

    ext.trainClassifier = function(f1, f2, f3, f4, f5, label) {
      // myTrainingSet.push({
      //   input: [f1, f2, f3, f4, f5],
      //   output: [label]
      // });
      // classification.train(myTrainingSet);
    };

    ext.runClassifier = function(f1, f2, f3, f4, f5) {
      // return classification.run([f1, f2, f3, f4, f5]);
    };

    ext.trainRegressifier = function(f1, f2, f3, f4, f5, i0, i2) {
      // myTrainingSet.push({
      //   input: [f1, f2, f3, f4, f5],
      //   output: [label]
      // });
      // regression.train(myTrainingSet);
    };

    ext.runRegressifier = function(f1, f2, f3, f4, f5) {
      // return regression.run([f1, f2, f3, f4, f5]);
    };

    var descriptor = {
      blocks: [
        [' ', 'train Classifier f1 %n f2 %n f3 %n f4 %n f5 %n Label %n', 'trainClassifier', 0, 0, 0, 0, 0, 0],
        ['r', 'run Classifier f1 %n f2 %n f3 %n f4 %n f5 %n', 'runClassifier', 0, 0, 0, 0, 0],
        // ['w', 'run Classifier f1 %n f2 %n f3 %n f4 %n f5 %n', 'runClassifier', 0, 0, 0, 0, 0],
        ['-'],
        [' ', 'train Regression f1 %n f2 %n f3 %n f4 %n f5 %n i0 %n i1 %n', 'trainRegressifier', 0, 0, 0, 0, 0, 0, 0],
        ['r', 'run Regression f1 %n f2 %n f3 %n f4 %n f5 %n', 'runRegressifier', 0, 0, 0, 0, 0]
      ],
      menus: null,
      url: 'http://frantic0.github.io/scratch-interactive-machine-learning-extension',
      displayName: 'Interactive Machine Learning'
    };

    // Register the extension
    ScratchExtensions.register('Interactive Machine Learning', descriptor, ext);
    loadRapidLib();

})({});
