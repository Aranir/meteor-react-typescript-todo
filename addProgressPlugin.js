var webpack = require('webpack');

// this is copped straight from webpack source
module.exports = function addProgressPlugin(options) {
  if (!options.plugins) options.plugins = [];

  var chars = 0, lastState, lastStateTime;
  options.plugins.push(new webpack.ProgressPlugin(function(percentage, msg) {
    var state = msg;
    if(percentage < 1) {
      percentage = Math.floor(percentage * 100);
      msg = percentage + "% " + msg;
      if(percentage < 100) {
        msg = " " + msg;
      }
      if(percentage < 10) {
        msg = " " + msg;
      }
    }
    if(options.profile) {
      state = state.replace(/^\d+\/\d+\s+/, "");
      if(percentage === 0) {
        lastState = null;
        lastStateTime = +new Date();
      } else if(state !== lastState || percentage === 1) {
        var now = +new Date();
        if(lastState) {
          var stateMsg = (now - lastStateTime) + "ms " + lastState;
          goToLineStart(stateMsg);
          process.stderr.write(stateMsg + "\n");
          chars = 0;
        }
        lastState = state;
        lastStateTime = now;
      }
    }
    goToLineStart(msg);
    process.stderr.write(msg);
  }));
  function goToLineStart(nextMessage) {
    var str = "";
    for(; chars > nextMessage.length; chars--) {
      str += "\b \b";
    }
    chars = nextMessage.length;
    for(var i = 0; i < chars; i++) {
      str += "\b";
    }
    if(str) process.stderr.write(str);
  }
}