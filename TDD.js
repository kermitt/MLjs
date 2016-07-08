var Library = require('./Library').Library;

var Tests = {
    show: true,

    _verdict: function(bool, caller) {
        var passfail = bool ? "PASS" : "FAIL";
        console.log(passfail + "\t" + caller);

    },
    _note: function(msg) {
        console.log("\t" + msg);
    },

    test_transpose: function() {
        var ary = [];
        ary[0] = [0, 0];
        ary[1] = [1, 1];
        ary[2] = [-1, 0.5];

        var transposed = Library.numpy_T(ary);

        var expected = [
            [0, 1, -1],
            [0, 1, 0.5]
        ];

        var isOk = true;
        for (var i in transposed) {
            for (var j in transposed[i]) {
                isOk = expected[i][j] == transposed[i][j];
            }
            if (this.show) {
                this._note("\tActual: " + transposed[i] + " and Expected: " + expected[i]);
            }
        }
        this._verdict(isOk, "37\ttest_transpose");
    },

    test_zip: function() {
        var ary = [1, 2, 3, 4, 5, 6, 7];

        var result = Library.zip_ary2matrix(ary);
        this.show ? this._note("\t" + result) : "";

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

        this._verdict(isOk, "61\ttest_zip");
    },

    getRandomMatrix_ofGivenShape: function() {
        var rows = 2;
        var cols = 3;
        var decimal = 0.1;
        var matrix = Library.getRandomMatrix_ofGivenShape(rows, cols, decimal);

        this.show ? this._note(matrix) : "";

        var expectedRows = 2;
        var expectedCols = 3;

        var isOk = true;
        isOk &= expectedRows == matrix.length;
        isOk &= expectedCols == matrix[0].length;

        for (var r = 0; r < matrix.length; r++) {
            for (var c = 0; c < matrix[r].length; c++) {
                isOk &= (matrix[r][c] < 0.101 && matrix[r][c] > -0.101);
            }
        }

        this._verdict(isOk, "85\tgetRandomMatrix_ofGivenShape");
    },

    test_addOnesBiasLayer() {

        var expected = [
            [0, 1, -1],
            [0, 1, 0.5],
            [1, 1, 1]
        ];
        var given = [
            [0, 1, -1],
            [0, 1, 0.5]
        ];
        var actual = Library.numpy_ones(given);
        for (var i in actual) {
            for (var j in actual[i]) {
                isOk = expected[i][j] == actual[i][j];
                //console.log("E: " + expected[i][j] + "    actual " + actual[i][j]);
            }
            if (this.show) {
                this._note("\tActual=" + actual[i] + "\tExpected=" + expected[i]);
            }
        }
        this._verdict(isOk, "109\ttest_addOnesBiasLayer");


    },

    test_matrix_multiply: function() {
        var a = [
            [0.12095622, 0.01576488, 0.00689189],
            [0.04298746, -0.12943021, -0.03780355]
        ]
        var b = [
            [0.46658474, 0.41097667, 0.5276982],
            [0.54608638, 0.60064835, 0.54942421],
            [1.0, 1.0, 1.0, ]
        ]
        var expected = [
            [0.0719372, 0.06607122, 0.07938187],
            [-0.08842633, -0.09787875, -0.08623123]
        ];

        var a2 = [[1, 2, 3],[4, 5, 6] ];
        var b2 = [[7, 8],[9, 10],[11, 12]];
        var expected2 = [[58, 64], [139, 154]];

        var result = Library.matrix_multiply(a, b)

        if ( this.show ) { 
                this._note("RESULT");
                this._note(result);
                //console.log("EXPECTED");
                //console.log(expected);
        }
        var isOk = true;
        for (var r in result) {
            for (var c in result[r]) {
                var x = result[r][c].toFixed(4);
                var y = expected[r][c].toFixed(4);
                isOk &= x == y;
            }
        }
        this._verdict(isOk, "149\ttest_matrix_multiply");
    }
}


function dot_product(a, b) {
    var product = 0;
    for (var index in a) {
        product += a[index] * b[index];
    }
    return product;
}

Tests.test_zip();
Tests.getRandomMatrix_ofGivenShape();
Tests.test_transpose();
Tests.test_addOnesBiasLayer();
Tests.test_matrix_multiply();