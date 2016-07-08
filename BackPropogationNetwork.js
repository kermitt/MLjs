var Library = require('./Library').Library;

var BackPropogationNetwork = {

                layerCount : 0,
                shape : undefined,
                weights : [],

                init : function(layerSize) {
                                //init the network
                                this.layerCount = layerSize - 1;
                                this.shape = layerSize;

                                // Input/Output data from the last Run

                                this._layerInput = [];
                                this._layerOutput = [];



                                console.log( layerSize);  

                                var r = Library.zip_ary2matrix(layerSize);


                                // create the weight arrays 

                                console.log( r ); 

//                            var ary = [1,2,3,4,5,6,7];

//                            var result = Library.zip_ary2matrix(ary);


//                            console.log( "!!!" + result );
                }

}


BackPropogationNetwork.init( [ 2,3,2]);
