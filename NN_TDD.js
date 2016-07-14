var Attic = require('./NN_functions').Attic;
var NN = require('./NN').NN;

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
    _verdict(isOk, "sigmoid");
}
function complicated_endToEnd() { 
    _header("simple_endToEnd");

    var shape = [3,12,5,1];
        
    // The NN _wants_ to use random weights - here, overwrite the randomly generated 
    // weights with the following, so as to permit solid testing
    var weights_to_override_with = [[[ 0.19997028, -0.06187343,  0.04926685,  0.05784678],
       [ 0.07482488, -0.09275503, -0.10928098, -0.00723074],
       [-0.01804826, -0.01562625,  0.05735849, -0.06341187],
       [ 0.07686729, -0.01576216,  0.09742159, -0.06272855],
       [ 0.0606442 , -0.05785097,  0.0143574 , -0.00848917],
       [-0.15898314,  0.0848886 ,  0.10169058, -0.03350957],
       [ 0.06545821, -0.01284818,  0.01192348, -0.22595475],
       [-0.06275401, -0.04890477,  0.05190982, -0.00033783],
       [ 0.09416482, -0.11828942,  0.15603442, -0.02255455],
       [-0.16479768,  0.03353297,  0.12762825,  0.21020979],
       [-0.06530501, -0.16559527,  0.03833972,  0.08416   ],
       [-0.0551222 , -0.14622501, -0.10153732,  0.15869841]], [[-0.13133961,  0.10033019, -0.01922905,  0.05131285, -0.15063663,
        -0.05514205,  0.04926641,  0.00839663,  0.08445371,  0.0911372 ,
         0.03573729,  0.00938907, -0.10539594],
       [ 0.00230363, -0.05651959, -0.09301317, -0.11214039, -0.15729217,
         0.10783613,  0.00653868, -0.02097494, -0.13581602, -0.0774411 ,
        -0.02881988,  0.05074316,  0.00503283],
       [ 0.24500873, -0.00921751,  0.08914903, -0.0064315 , -0.10582094,
         0.0913754 , -0.06191388, -0.02279355, -0.02840853, -0.08881658,
         0.06363771,  0.0865437 , -0.04936021],
       [-0.0375189 ,  0.1444317 , -0.10678241,  0.11949887, -0.0890355 ,
         0.01231652, -0.04103508,  0.01442816, -0.05540513,  0.0416871 ,
        -0.0636842 ,  0.18318596,  0.10363525],
       [ 0.10274386, -0.00581827, -0.09408729,  0.00667517,  0.00751888,
         0.02811868,  0.01779862, -0.09672298,  0.2223728 , -0.00371312,
         0.18777454, -0.12708066, -0.02780976]], [[ 0.10584289, -0.10195109,  0.11327424,  0.09134929,  0.03134897,
        -0.08356298]]];


    var my_decimal = 0.1;

    NN.init(shape, my_decimal);
    NN.weights = weights_to_override_with;    

    // lvInput = np.array([[1,0,0],[0.4,1,1],[.6, -1, 0.5]])
    var LoL_inputs = [[1,0,0],[0.4,1,1],[.6, -1, 0.5]];

    var results = NN.run(LoL_inputs);
    results = Attic.numpy_transpose(results);
    info("Results", results); 

    // NOTE! 0.5 = _nothing_...  So a bunch of .5 = 'no signal here'...
    // which is proper because the LoL_inputs are all over the map. 
    var expected = [[ 0.51206371],[ 0.51191291],[ 0.51221855]]; 


    var isOk = true;
    for ( var row = 0; row < results.length; row++) { 
        for ( var col = 0; col < results[row].length; col++ ) {
            isOk &= results[row][col].toFixed(3) == expected[row][col].toFixed(3);
        }
    }
    _verdict(isOk, "complicated_endToEnd");

    /* ORIG PYTHON 
    bpn = BackPropagationNetwork((3,12,5,1))
    print("SHAPE\n{0}".format(bpn.shape))
    print("WEIGHTINGS\n{0}".format(bpn.weightings))
    lvInput = np.array([[1,0,0],[0.4,1,1],[-.6, -1, 0.5]])
    print("INPUT\n{0}".format(lvInput))
    lvOutput = bpn.Run(lvInput)
    print("OUTPUT\n{0}".format(lvOutput))*/


}
function simple_endToEnd(){ 
    _header("simple_endToEnd");

    var shape = [2, 2, 1]; // one input layer w/ two inputs | one hidden w/ two nodes and | one output node

    // The NN _wants_ to use random weights - here, overwrite the randomly generated 
    // weights with the following, so as to permit solid testing
    var weights_to_override_with = [[[ 0.02488965, -0.17555775,  0.00630082],[ 0.03018733, -0.09007787, -0.03123654]], [[ 0.04102   ,  0.01435366, -0.12914455]]];


    var my_decimal = 0.1;

    //info("Shape", shape);
    //info("Decimal", my_decimal);

    NN.init(shape, my_decimal);
    NN.weights = weights_to_override_with;    

    //info("Weights", NN.weights);
    var LoL_inputs = [[0,0],[1,1],[-1, 0.5]];
     
    var results = NN.run(LoL_inputs);
    results = Attic.numpy_transpose(results);
    info("Results", results); 

    var expected = [[ 0.47464547],[ 0.47420731],[ 0.4742904 ]]; 

    var isOk = true;
    for ( var row = 0; row < results.length; row++) { 
        for ( var col = 0; col < results[row].length; col++ ) {
            isOk &= results[row][col].toFixed(3) == expected[row][col].toFixed(3);
        }
    }
    _verdict(isOk, "simple_endToEnd");
}
////////////////////////// HOUSEWORK follows ////////////////
function _verdict(bool, caller) {
    var passfail = bool ? "PASS" : "FAIL";
    console.log(passfail + "\t" + caller);
}

function _header(msg) {
    console.log("\n\t" + msg);
}
function info(msg, obj) {
    console.log("\n" + msg ); 
    console.log(obj);
}
function log(obj) {
    if (show) {
        console.log(obj);
    }
}

zip();
sigmoid();
simple_endToEnd();
complicated_endToEnd();