var Attic = require('./NN_functions').Attic;
var NN = require('./NN').NN;

var net_shape = [2, 2, 1];
var my_decimal = 0.1;
NN.init(net_shape, my_decimal);
var LoL_inputs = [[0,0],[1,1],[-1, 0.5]]; 
var results = NN.run(LoL_inputs);
console.log(results);

