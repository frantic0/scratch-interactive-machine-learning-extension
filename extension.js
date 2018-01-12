(function(ext) {


    var rapidLib = null;
    var regression = null;
    var classification = null;

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
        ]
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

    var descriptor = {
      blocks: [
        ['r', '%m.hands x position', 'getHandX', 'hand A'],
        ['r', '%m.hands y position', 'getHandY', 'hand A'],
        ['r', '%m.hands z position', 'getHandZ', 'hand A'],
        ['r', '%m.hands rotation', 'getHandRotation', 'hand A'],
        ['b', '%m.hands is visible?', 'isHandVisible', 'hand A'],
        ['b', '%m.hands is closed?', 'isHandGrabbed', 'hand A'],
        ['-'],
        ['r', '%m.hands %m.fingers x position', 'getFingerX', 'hand A', 'finger 1'],
        ['r', '%m.hands %m.fingers y position', 'getFingerY', 'hand A', 'finger 1'],
        ['r', '%m.hands %m.fingers z position', 'getFingerZ', 'hand A', 'finger 1'],
        ['b', '%m.hands %m.fingers is extended?', 'isFingerExtended', 'hand A', 'finger 1'],
        ['-'],
        ['r', '%m.tools x position', 'getToolX', 'tool A'],
        ['r', '%m.tools y position', 'getToolY', 'tool A'],
        ['r', '%m.tools z position', 'getToolZ', 'tool A'],
        ['b', '%m.tools is visible?', 'isToolVisible', 'tool A'],
        ['-'],
        ['h', 'when %m.gestures', 'whenGesture', 'tap'],
        ['w', 'wait until %m.gestures', 'waitForGesture', 'tap']
      ],

      menus: {
        hands: ['hand A', 'hand B'],
        fingers: ['finger 1', 'finger 2', 'finger 3', 'finger 4', 'finger 5'],
        tools: ['tool A', 'tool B'],
        gestures: ['tap', 'poke', 'swipe', 'circle']
      },
      url: 'http://frantic0.github.io/scratch-interactive-machine-learning-extension'
    };

    // Register the extension
    ScratchExtensions.register('Interactive Machine Learning', descriptor, ext);
    loadRapidLib();

})({});
