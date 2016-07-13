var Library = require('./Library').Library;

var BackPropogationNetwork = {
    layerCount: 0,
    shape: undefined,
    weights: [],

    init: function(layerSize) {
        //init the network
        this.layerCount = layerSize.length - 1;

        this.shape = layerSize;
        this._layerInput = [];
        this._layerOutput = [];

        //for ( a, b ) in zip(layerSize[:-1],layerSize[1:]):
        //  self.weightings.append(np.random.normal(scale=0.1, size=(b,( a + 1 )))
        LoL = Library.zip_ary2matrix(layerSize);
        for ( index in LoL ) {
                var a = LoL[index][0];
                var b = LoL[index][1];
                var bias = 1;
                a += bias;
                //this.weights.push( Library.getRandomMatrix_ofGivenShape(b,a,0.1));

                var weight = Library.getRandomMatrix_ofGivenShape(b,a,0.1);
                this.weights.push(weight);
        }

    }, 
    run : function ( input ) { 
        //shape
        var lnCases = input.length;
        this._layerInput = [];
        this._layerOutput = [];
        for ( var index = 0; index < this.layerCount; index++ ) {
                var stack = undefined; 
                var inputLayer = undefined;
                if ( index == 0 ) {
                        //console.log("input.T " + Library.display_LoL(input) )                               
                        stack = Library.numpy_T(input);

                        console.log("stack: " + Library.display_LoL(stack));
                        console.log("input.T: " + Library.display_LoL(input));
                        




                } else {
                        stack = this.weights[index];                        
                }
                stack = Library.numpy_ones(stack);
                var inputLayer = Library.matrix_multiply(this.weights[index], stack ); 
                console.log( index + "  IN!\n" + Library.display_LoL( tmp ) )                               
                //console.log( index + "  Weight!\n" + Library.display_LoL( this.weights[index] ) );                               
                //console.log( index + "  stack   !\n" + Library.display_LoL( stack ) );                               
                //console.log("\n\n");
        }
        //var transformed = Library.numpy_T( input ); 
        //transformed = Library.numpy_ones(transformed); 
        //console.log(Library.display_LoL(this.weights));

    }

}


BackPropogationNetwork.init([2, 2,1]);
var lvInput = [[0,0],[1,1],[-1, 0.5]];


BackPropogationNetwork.run( lvInput );

//console.log( BackPropogationNetwork.weights); 



console.log("The end");