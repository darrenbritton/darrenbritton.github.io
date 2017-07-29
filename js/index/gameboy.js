$('.cover').ready(function() {
  $('#showGameboy').click(function() {
    var konamiCodeString = "UUDDLRLRBA";
    var inputString = '';
    $('#gameboy').show();
    $('#gameboyAlert').show();
    document.onkeydown = function(e) {
        switch (e.keyCode) {
            case 37:
                inputString+= 'L';
                break;
            case 38:
                inputString+= 'U';
                break;
            case 39:
                inputString+= 'R';
                break;
            case 40:
                inputString+= 'D';
                break;
            case 66:
                inputString+= 'B';
                break;
            case 65:
                inputString+= 'A';
                break;
        }
        if (inputString.includes(konamiCodeString)) {
          $('#gameboyAlert').hide();
          $('div.power').addClass('power-on');
          document.onkeydown = null;
          var gameboyCanvas = document.getElementById("gameboyCanvas");
          document.addEventListener("keydown", keyDown);
          document.addEventListener("keyUp", keyUp);
          try {
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", '/binary.dat', false);
            rawFile.overrideMimeType('text\/plain; charset=x-user-defined');
            rawFile.onreadystatechange = function ()
            {
                if(rawFile.readyState === 4)
                {
                    if(rawFile.status === 200 || rawFile.status == 0)
                    {
                        start(gameboyCanvas, rawFile.responseText);
                    }
                }
            }
            rawFile.send(null);
          }
          catch (error) {
            console.log(error);
            console.log("Browser does not support the FileReader object, NO SOUP FOR YOU!");
          }
        }
    };
  });
});
var keyZones = [
	["right", [39]],
	["left", [37]],
	["up", [38]],
	["down", [40]],
	["a", [88, 74]],
	["b", [90, 81, 89]],
	["select", [16]],
	["start", [13]]
];
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
				}
				catch (error) { }
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
				}
				catch (error) { }
			}
		}
	}
}
