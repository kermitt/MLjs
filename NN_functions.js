
/* A collection of helper functions. Mostly to mimick some of numpy's functionality */

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
    	//
        // add a bias layer of ONEs to a rectangle matrix...
        //
        // mimick numpy.ones([1,COLUMNS]) and then vstack
        // e.g., 
        // matrix_with_added_bias = weightings[0].dot(np.vstack([input.T, np.ones([1,layers])]))


        ary[ary.length] = [];
        for (var i = 0; i < ary[0].length; i++) {
            ary[ary.length - 1][i] = 1;
        }
        return ary;
    },

	numpy_transpose: function(ary) {
		// transpose a LoL
		//
        // mimick numpy's matrix.T
        var transposed = ary[0].map(function(col, i) {
            return ary.map(function(row) {
                return row[i]
               })
        });
        return transposed;
    },
    matrix_multiply: function(a, b) {
        var a_rows = a.length;
        var a_columns = a[0].length;
        var b_rows = b.length;
        var b_columns = b[0].length;
        var matrix = new Array(a_rows);
        for (var r = 0; r < a_rows; r++) {
            matrix[r] = new Array(b_columns);
            for (var c = 0; c < b_columns; c++) {
                matrix[r][c] = 0;
                for (var i = 0; i < a_columns; i++) {
                    matrix[r][c] += a[r][i] * b[i][c];
                }
            }
        }
        return matrix;
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

try {
    module.exports.Attic = Attic;
} catch (referenceError) {
    console.log("referenceError: " + referenceError);
}