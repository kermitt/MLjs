var Library = {

    zip_ary2matrix: function(ary) {
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

    getRandomMatrix_ofGivenShape: function(rows, cols, decimal) {
        // create a matrix of _tiny_ numbers, pos & neg - center about 0
        //
        // mimick python's numpy's np.random.normal(scale,())
        //
        // note! The Math.random will center on 0
        // and will be knocked back to the decimal
        //
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
    numpy_T: function(ary) {
        // mimick numpy's matrix.T
        // transpose ary[][]
        var transposed = ary[0].map(function(col, i) {
            return ary.map(function(row) {
                return row[i]
               })
        });
        return transposed;
    },
    display_LoL : function( LoL ) {
            var out = "["; 
            for ( var index in LoL ) {
                out += "\t[";
                out += LoL[index];
                out += "]"; 
                if ( index < LoL.length - 1 ) {
                        out += "\n";
                } else {
                        out += "\t]";
                }
            } 
            return out; 
    },

    numpy_ones: function(ary) {
        // mimick numpy.ones([1,COLUMNS])
        // add a bias layer of ONEs to a rectangle matrix...

        ary[ary.length] = [];
        for (var i = 0; i < ary[0].length; i++) {
            ary[ary.length - 1][i] = 1;
        }
        return ary;
    },

    matrix_multiply: function(a, b) {
        // from stackoverflow
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
    dot_product: function(a, b) {
        var product = 0;
        for (var index in a) {
            product += a[index] * b[index];
        }
        return product;
    }




}



try {
    module.exports.Library = Library;
} catch (referenceError) {
    console.log("referenceError: " + referenceError);
}
/*
https://www.youtube.com/watch?v=ra_s5iZ9Al4
echo "# MLjs" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/kermitt/MLjs.git
git push -u origin master
*/