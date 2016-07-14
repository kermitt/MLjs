var Attic = require('./NN_functions').Attic;

/* See NN_TDD for example usage.
Esp see simple_endToEnd()
or check NN_Driver from an example usage */

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
				matrix = Attic.addBias(ary);
				var layer = Attic.matrix_multiply(this.weights[index],matrix);
    		}
    		this.layerInput[index] = layer;
    		var siggy = Attic.sigmoid_matrix(layer)
    		this.layerOutput[index] = siggy;
    	}

		var lastith = this.layerOutput.length - 1;
		results= this.layerOutput[lastith];
		return results;
    }
}

try {
    module.exports.NN = NN;

} catch (referenceError) {
    console.log("referenceError: " + referenceError);
}