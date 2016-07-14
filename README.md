# MLjs

NN.js = main logic<br/>
NN_functions.js = grab bag of functions which mimick some python functionality<br/>
NN_TDD.js = my tests<br/>
NN_Driver.js = The equivilent of 'main'<br/>
<p>
NOTE! Profs to Ryan Harris's neuralnet videos...  Better than Udemy.com. :) 
His channel is at: https://www.youtube.com/channel/UCRAmB5K-2GLvtaXcH9GCy-A
<p>



Below is the python that I ported over into javascript ( hope the .md file does not break my formatting )
import numpy as np
<code>
class BackPropagationNetwork:
    layerCount = 0
    shape = None
    weightings = []
    def __init__(self, layerSize):
        self.layerCount = len(layerSize) - 1
        self.shape = layerSize
        self._layerInput = []
        self._layerOutput = []
        for ( a, b ) in zip(layerSize[:-1],layerSize[1:]):
            bias = 1
            a += bias
            self.weightings.append(np.random.normal(scale=0.1, size=(b,a)))

    def Run(self,input):
        """run the network based on the input data"""
        lnCases = input.shape[0]

        ### clear out the previous intermediate value lists
        self._layerInput = []
        self._layerOutput = []

        for index in range(self.layerCount):
            if index == 0:
                layerInput = self.weightings[0].dot(np.vstack([input.T, np.ones([1,lnCases])]))
            else:
                l = self._layerOutput[-1]
                ones = np.ones([1,lnCases])
                layerInput = self.weightings[index].dot(np.vstack([l,ones]))
            self._layerInput.append(layerInput)
            sigmoid = self.sgm(layerInput)
            self._layerOutput.append(sigmoid)

        result = self._layerOutput[-1].T
        return result

    # transfer function
    def sgm(self,x,Derivative=False):
        if not Derivative:
            return 1 / ( 1 + np.exp(-x))
        else:
            out = self.sgm(x)
            return out*(1-out)

if __name__ == "__main__":
    """
    # SIMPLE RUN
    bpn = BackPropagationNetwork((2,2,1))
    print("SHAPE\n{0}".format(bpn.shape))
    print("WEIGHTINGS\n{0}".format(bpn.weightings))
    lvInput = np.array([[0,0],[1,1],[-1, 0.5]])
    print("INPUT\n{0}".format(lvInput))
    lvOutput = bpn.Run(lvInput)
    print("OUTPUT\n{0}".format(lvOutput))
    """

    # COMPLICATED RUN
    bpn = BackPropagationNetwork((3,12,5,1))
    print("SHAPE\n{0}".format(bpn.shape))
    print("WEIGHTINGS\n{0}".format(bpn.weightings))
    lvInput = np.array([[1,0,0],[0.4,1,1],[.6, -1, 0.5]])
    print("INPUT\n{0}".format(lvInput))
    lvOutput = bpn.Run(lvInput)
    print("OUTPUT\n{0}".format(lvOutput))
</code>
