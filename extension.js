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
        // loadRapidLibModules();
      })
      .fail(function(jqxhr, settings, exception) {
        console.log('Error loading RapidLib');
        loadRapidLib();
    });
  }

  // function loadRapidLibModules() {
  //   rapidLib = window.RapidLib();
  //   regression = new rapidLib.Regression();
  //   classification = new rapidLib.Classification();
  // }



  ext.my_first_block = function() {
      // Code that gets executed when the block is run
  };

  // Block and block menu descriptions
  var descriptor = {
      blocks: [
          // Block type, block name, function name
          [' ', 'my first block', 'my_first_block'],
      ]
  };

  // Register the extension
  ScratchExtensions.register('My first extension', descriptor, ext);
  loadRapidLib();
})({});
