
module.exports = {
    main: function main(){
        const distance = require('euclidean-distance')

        let inputData = [
            [-1, -6],
            [8, 16],
            [2, -6],
            [2, -6],
            [9, 21],
            [3, -6],
            [0, -7],
            [9, 16],
            [0, -7],
            [-1, -7],
            [1, -6],
            [5, 21],
        ];

        let clusters_M = 10;
        let lengthNeurons_N = inputData[0].length;
        let T = 1
        let speedLearning = 0.7
        let deltaSpeedLearning = 0.05
        class Neuron {
            valuesNeuron = [];
            lengthNeurons_N;
            constructor(lengthNeurons_N) {
                this.lengthNeurons_N = lengthNeurons_N;
                this.createRandomNeuron();
            }

            createRandomNeuron = () => {
                for (let i = 0; i < this.lengthNeurons_N; i++) {
                    this.valuesNeuron.push(Math.random());
                }
            };
        }
        let arrNeuron = [];
        for (let i = 0; i < clusters_M; i++) {
            arrNeuron.push(new Neuron(lengthNeurons_N));
        }
        console.log(arrNeuron)
        let step=[]
        while (speedLearning > 0) {
            for (let epoch = 0; epoch < 100; epoch++) {
                let copyArrNeuron = arrNeuron.map(neuron => {
                    let newNeuron = new Neuron(neuron.lengthNeurons_N);
                    newNeuron.valuesNeuron = [...neuron.valuesNeuron];
                    return newNeuron;
                });

                for (let dataIndex = 0; dataIndex < inputData.length; dataIndex++) {
                    let nearestW_index = 0;

                    for (let j = 0; j < arrNeuron.length; j++) {
                        if (distance(arrNeuron[j].valuesNeuron, inputData[dataIndex]) < distance(arrNeuron[nearestW_index].valuesNeuron, inputData[dataIndex])) {
                            nearestW_index = j;
                        }
                    }

                    for (let j = 0; j < arrNeuron[nearestW_index].valuesNeuron.length; j++) {
                        copyArrNeuron[nearestW_index].valuesNeuron[j] += speedLearning * (inputData[dataIndex][j] - copyArrNeuron[nearestW_index].valuesNeuron[j]);
                    }
                }

                arrNeuron = copyArrNeuron;
            }

            speedLearning -= deltaSpeedLearning;
            step.push(arrNeuron)
        }
        return{inputData:inputData, step:step}
    }
}
