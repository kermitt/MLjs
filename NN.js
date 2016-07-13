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
        return result;s
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
		//console.log(this.weights);
    },

    run : function(LoL_inputs) { 
    	lnCases = LoL_inputs.length;
    	//layerInput = []
    	//layerOutput = []

    	for ( var index = 0; index < this.layerCount; index++) { 
    		//console.log( " index : " + index ) ; 
    		var matrix = undefined; 
    		if ( index == 0 ) {
				matrix = Attic.numpy_transpose(LoL_inputs);
				matrix = Attic.addBias(matrix);
				var layer = Attic.matrix_multiply(this.weights[index],matrix);
                layer = sigmoid_matrix(layer); 

    		}  else {

    			//console.log("!! "  + index ); 
               //console.log( this._layerOutput[index]);


				//matrix = Attic.numpy_transpose(LoL_inputs);
				//matrix = Attic.addBias(matrix);
				//var layerInput = Attic.matrix_multiply(this.weights[index],matrix);


    			
    			//console.log( index +"\t" + layerInput ); 
    		}
    	}
    }
}



var net_shape = [2, 2, 1];
var my_decimal = 0.1;
NN.init(net_shape, my_decimal);
var LoL_inputs = [[0,0],[1,1],[-1, 0.5]]; 
NN.run(LoL_inputs);

/*
var Library = {

                zip_ary2matrix : function(ary) { 
                                // mimick python's zip: 
                                // in python: return zip(ary[:-1],ary[1:])
                                var end1 = ary.length - 1;
                                var result = [];

                                for ( var i = 0; i < end1; i++ ) { 
                                                result[i] = [];
                                                result[i][0] = ary[i];
                                                result[i][1] = ary[i + 1];
                                }

                                return result;
                },

                getRandomMatrix_ofGivenShape : function( rows, cols, decimal ) {
                                // create a matrix of _tiny_ numbers, pos & neg - center about 0
                                //
                                // mimick python's numpy's np.random.normal(scale,())
                                //
                                // note! The Math.random will center on 0
                                // and will be knocked back to the decimal
                                //
                                var m = [];
                                for ( var row = 0; row < rows; row++ ) { 
                                                m[row] = [];
                                                for ( var col = 0; col < cols; col++ ) {
                                                                var r = Math.random() * 2; 
                                                                r -= 1;
                                                                r *= decimal;
                                                                m[row][col] = r;
                                                }
                                }
                                return m;

                }
}
*/


try {
    module.exports.Attic = Attic;
} catch (referenceError) {
    console.log("referenceError: " + referenceError);
}