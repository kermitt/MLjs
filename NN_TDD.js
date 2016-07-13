var Attic = require('./NN').Attic;

var show = false;

function zip() {
    _header("zip");
    var given = [1, 2, 3, 4, 5, 6, 7];

    var result = Attic.zip(given);
    this.show ? console.log(result) : "";

    var isOk = true;
    isOk &= result[0][0] == 1;
    isOk &= result[0][1] == 2;
    isOk &= result[0][2] == undefined;
    isOk &= result[1][0] == 2;
    isOk &= result[1][1] == 3;
    isOk &= result[2][0] == 3;
    isOk &= result[2][1] == 4;
    isOk &= result[3][0] == 4;
    isOk &= result[3][1] == 5;
    isOk &= result[4][0] == 5;
    isOk &= result[4][1] == 6;
    isOk &= result[5][0] == 6;
    isOk &= result[5][1] == 7;
    log(given);
    log(result);
    _verdict(isOk, "zip");
}
function sigmoid() {
    _header("sigmoid");
	var given = [[ 0.10671185,  0.22789471,  0.05804808],[ 0.05667888,  0.08520546, -0.00440613]];
	var expected = [[ 0.52665268,  0.55672837,  0.51450795],[ 0.51416593,  0.52128849,  0.49889847]];
	var actual = [];
    var isOk = true;
	for ( var row  = 0 ; row < given.length; row++ ) { 
		for ( var col = 0; col < given[row].length; col++ ) { 
            if ( col == 0 ) {
                actual[row] = [];
            }
			var x = Attic.sigmoid(given[row][col]);
                  
            actual[row][col] = x;

            isOk &= x.toFixed(3) == expected[row][col].toFixed(3);

		}
	}
//    console.log("GIVEN:");
//    console.log(given);
//    console.log("ACTUAL: ")
//    console.log( actual ); 
//    console.log("EXPECTED");
//    console.log(expected); 
    _verdict(isOk, "sigmoid");

}

function _verdict(bool, caller) {
    var passfail = bool ? "PASS" : "FAIL";
    console.log(passfail + "\t" + caller);
}

function _header(msg) {
    console.log("\n\t" + msg);
}

function log(obj) {
    if (show) {
        console.log(obj);
    }
}

zip();
sigmoid(); 