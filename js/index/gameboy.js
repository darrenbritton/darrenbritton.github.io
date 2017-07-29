$('.cover').ready(function() {
  $('#showGameboy').click(function() {
    var konamiCodeString = "UUDDLRLRBA";
    var inputString = '';
    $('#gameboy').show();
    $('#gameboyAlert').show();
    document.onkeydown = function(e) {
      switch (e.keyCode) {
        case 37:
          inputString += 'L';
          break;
        case 38:
          inputString += 'U';
          break;
        case 39:
          inputString += 'R';
          break;
        case 40:
          inputString += 'D';
          break;
        case 66:
          inputString += 'B';
          break;
        case 65:
          inputString += 'A';
          break;
      }
      if (inputString.includes(konamiCodeString)) {
        $('#gameboyAlert').hide();
        $('#gameboyControlsAlert').show();
        $('div.power').addClass('power-on');
        document.onkeydown = null;
        gameboyCanvas = document.getElementById("gameboyCanvas");
        document.addEventListener("keydown", keyDown);
        document.addEventListener("keyup", keyUp);
        addGameLibaryToMenu();
        window.loadGame('old.dat');
      };
    };
  });
});
var binaryROM = '';
var gameboyCanvas = null;
var games = {
  pokemon: 'old.dat',
  tetris: 'binary.dat'
}
var keyZones = [
  ["right", [39]
  ],
  ["left", [37]
  ],
  ["up", [38]
  ],
  ["down", [40]
  ],
  [
    "a",
    [88, 74]
  ],
  [
    "b",
    [90, 81, 89]
  ],
  ["select", [16]
  ],
  ["start", [13]
  ]
];
window.loadGame = function(filename) {
  try {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", '/thatcrazyirishguy.github.io/' + filename, true);
    rawFile.responseType = "arraybuffer";
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          console.log(rawFile);
          var byteArray = new Uint8Array(rawFile.response);
          start(gameboyCanvas, convertUint8ArrayToBinaryString(byteArray));
        }
      }
    }
    rawFile.send(null);
  } catch (error) {
    console.log(error);
  }
}
function keyDown(event) {
  var keyCode = event.keyCode;
  var keyMapLength = keyZones.length;
  for (var keyMapIndex = 0; keyMapIndex < keyMapLength; ++keyMapIndex) {
    var keyCheck = keyZones[keyMapIndex];
    var keysMapped = keyCheck[1];
    var keysTotal = keysMapped.length;
    for (var index = 0; index < keysTotal; ++index) {
      if (keysMapped[index] == keyCode) {
        GameBoyKeyDown(keyCheck[0]);
        try {
          event.preventDefault();
        } catch (error) {}
      }
    }
  }
}
function keyUp(event) {
  var keyCode = event.keyCode;
  var keyMapLength = keyZones.length;
  for (var keyMapIndex = 0; keyMapIndex < keyMapLength; ++keyMapIndex) {
    var keyCheck = keyZones[keyMapIndex];
    var keysMapped = keyCheck[1];
    var keysTotal = keysMapped.length;
    for (var index = 0; index < keysTotal; ++index) {
      if (keysMapped[index] == keyCode) {
        GameBoyKeyUp(keyCheck[0]);
        try {
          event.preventDefault();
        } catch (error) {}
      }
    }
  }
}
function cout(msg) {
  console.log(msg);
}
function menuItemTemplate(label, filename) {
  return `<li> <a class="inner-link" onClick="window.loadGame('${filename}')">${label}</a> </li>`
};
function addGameLibaryToMenu() {
  var newMenuItems = '';
  Object.keys(games).forEach(function(key) {
    newMenuItems += menuItemTemplate(key, games[key]);
  });
  console.log('hit');
  $('.menu').append(newMenuItems);
}
function convertUint8ArrayToBinaryString(u8Array) {
  var i,
    len = u8Array.length,
    b_str = "";
  for (i = 0; i < len; i++) {
    b_str += String.fromCharCode(u8Array[i]);
  }
  return b_str;
}
