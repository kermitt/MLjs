var Attic = {
    zip: function(ary) {
        // mimick python's zip: 
        // in python: return zip(ary[:-1],ary[1:])
        var end1 = ary.length - 1;
        var result = [];

        for (var i = 0; i < end1; i++) {
            result[i] = [];
            result[i][0] = ary[i];
            result[i][1] = ary[i + 1];
        }

        return result;
    },

    np_random_normal: function(decimal, rows, cols) {
        // create a matrix of _tiny_ numbers, pos & neg - center around 0
        //
        // mimick python's numpy's np.random.normal(scale=0.1,size=(b,a))
        //
        // note! The Math.random will center on 0
        // and will be knocked back to the decimal
        var m = [];
        for (var row = 0; row < rows; row++) {
            m[row] = [];
            for (var col = 0; col < cols; col++) {
                var r = Math.random() * 2;
                r -= 1;
                r *= decimal;
                m[row][col] = r;
            }
        }
        return m;
    },

    addBias: function(ary) {
        // mimick numpy.ones([1,COLUMNS])
        // and then 
        // vstack
        //
        // add a bias layer of ONEs to a rectangle matrix...

        ary[ary.length] = [];
        for (var i = 0; i < ary[0].length; i++) {
            ary[ary.length - 1][i] = 1;
        }
        return ary;
    },

	numpy_transpose: function(ary) {
        // mimick numpy's matrix.T
        // transpose ary[][]
        var transposed = ary[0].map(function(col, i) {
            return ary.map(function(row) {
                return row[i]
               })
        });
        return transposed;
    },
    matrix_multiply: function(a, b) {
        var aNumRows = a.length,
            aNumCols = a[0].length,
            bNumRows = b.length,
            bNumCols = b[0].length,
            m = new Array(aNumRows); // initialize array of rows
        for (var r = 0; r < aNumRows; r++) {
            m[r] = new Array(bNumCols); // initialize the current row
            for (var c = 0; c < bNumCols; c++) {
                m[r][c] = 0; // initialize the current cell
                for (var i = 0; i < aNumCols; i++) {
                    m[r][c] += a[r][i] * b[i][c];
                }
            }
        }
        return m;
    },
	sigmoid: function(t) {
        return 1 / (1 + Math.pow(Math.E, -t));
    },

	sigmoid_matrix : function( LoL) { 
		var results = [];   
		for ( var row  = 0 ; row < LoL.length; row++ ) { 
			for ( var col = 0; col < LoL[row].length; col++ ) { 
            	if ( col == 0 ) {
                	results[row] = [];
            	}
				var x = this.sigmoid(LoL[row][col]);
                results[row][col] = x;
            }
        }
        return results;
    }
}

var NN = {

    init: function(matrix_shape, decimal) {
        this.layerCount = matrix_shape.length - 1;
        this.matrix_shape = matrix_shape;
        this.layerInput = [];
        this.layerOutput = [];
        this.weights = [];
        bias = 1;
        var LoL = Attic.zip(this.matrix_shape);
        for (index in LoL) {
            var a = LoL[index][0] + bias;
            var b = LoL[index][1];
            var weight = Attic.np_random_normal(decimal, b, a);
            this.weights.push(weight);
        }

	this.weights = [[[-0.1571361 ,  0.16479198, -0.00550626], [-0.10934209,  0.15961495, -0.0661603 ]], [[-0.03404636,  0.21560853,  0.01649315]]];


		//console.log(this.weights);
    },

    run : function(LoL_inputs) { 
    	lnCases = LoL_inputs.length;

    	for ( var index = 0; index < this.layerCount; index++) { 
    		var matrix = undefined; 
    		var layer = undefined;
    		if ( index == 0 ) {
				matrix = Attic.numpy_transpose(LoL_inputs);
				matrix = Attic.addBias(matrix);
				var layer = Attic.matrix_multiply(this.weights[index],matrix);
    		}  else {
    			// get the last one
    			var lastith = this.layerOutput.length - 1
    			var ary = this.layerOutput[lastith];
console.log("ARY");
console.log( ary ); 
//				matrix = Attic.numpy_transpose(ary);

//console.log("MATRIX1");
//console.log( matrix ); 


				matrix = Attic.addBias(ary);

console.log("MATRIX2");
console.log( matrix ); 




				var layer = Attic.matrix_multiply(this.weights[index],matrix);


console.log("layer");
console.log( layer ); 


    		}
    		this.layerInput[index] = layer;
 
            //console.log("FINCH down!");
            //console.log( layer);

 
    		var siggy = Attic.sigmoid_matrix(layer)
    		this.layerOutput[index] = siggy;
    		//console.log( index + " ------------ > ");
    		//console.log( siggy ); 
    	}

		var lastith = this.layerOutput.length - 1;
		results= this.layerOutput[lastith];
		console.log("RESULTS!");
		console.log(results ); 
		return results;
    }
}
/*


C:\Users\r621362\AppData\Local\Continuum\Anaconda3\python.exe C:/sites/pyhealthpath/RE_playground.py
WEIGHTS [array([[-0.1571361 ,  0.16479198, -0.00550626],
       [-0.10934209,  0.15961495, -0.0661603 ]]), array([[-0.03404636,  0.21560853,  0.01649315]])]
FINCH down! [[-0.00550626  0.00214962  0.23402583]
 [-0.0661603  -0.01588744  0.12298927]]
WHEN 0  -->
[[ 0.49862344  0.50053741  0.55824089]
 [ 0.48346596  0.49602822  0.53070862]]
KITTY layerOutput[-1]   [[ 0.49862344  0.50053741  0.55824089]
 [ 0.48346596  0.49602822  0.53070862]]
KITTY ones [[ 1.  1.  1.]]
................
[[ 0.49862344  0.50053741  0.55824089]
 [ 0.48346596  0.49602822  0.53070862]]
KITTY input [[ 0.10375622  0.10639959  0.11191238]]
FINCH down! [[ 0.10375622  0.10639959  0.11191238]]
WHEN 1  -->
[[ 0.52591581  0.52657483  0.52794893]]
result!
[[ 0.52591581]
 [ 0.52657483]
 [ 0.52794893]]

Process finished with exit code 0



*/


var net_shape = [2, 2, 1];
var my_decimal = 0.1;
NN.init(net_shape, my_decimal);
var LoL_inputs = [[0,0],[1,1],[-1, 0.5]]; 
var results = NN.run(LoL_inputs);
//console.log(results);



try {
    module.exports.Attic = Attic;
} catch (referenceError) {
    console.log("referenceError: " + referenceError);
}