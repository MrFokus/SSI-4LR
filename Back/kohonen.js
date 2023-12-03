
module.exports = {
    main: function main(inputData,clusters_M){
        const distance = require('euclidean-distance')
        function normalize(){
            for (let i = 0; i < arrNeuron.length; i++) {
                let norm = Math.sqrt(arrNeuron[i].valuesNeuron.reduce((sum, x) => sum + x*x, 0));
                arrNeuron[i].valuesNeuron = arrNeuron[i].valuesNeuron.map(x => x / norm);
            }
        }
        // let inputData = [
        //     [-1, -6],
        //     [8, 16],
        //     [2, -6],
        //     [2, -6],
        //     [9, 21],
        //     [3, -6],
        //     [0, -7],
        //     [9, 16],
        //     [0, -7],
        //     [-1, -7],
        //     [1, -6],
        //     [5, 21],
        // ];
        // let inputData = [
        //     [-1, -6],
        //     [-2, -3],
        //     [-2, -5],
        //     [2, 6],
        //     [3, 7],
        //     [3, 5],
        //     [2, 7],
        //     [9, 1],
        //     [8, 2],
        //     [10, 3],
        //     [1, -6],
        //     [2, -5],
        // ]

        // let clusters_M = 5;
        let lengthNeurons_N = inputData[0].length;
        let speedLearning = 0.5
        let deltaSpeedLearning = 0.15
        class Neuron {
            valuesNeuron = [];
            lengthNeurons_N;
            constructor(lengthNeurons_N) {
                this.lengthNeurons_N = lengthNeurons_N;
                this.createRandomNeuron();
            }

            createRandomNeuron = () => {
                for (let i = 0; i < this.lengthNeurons_N; i++) {
                    this.valuesNeuron.push(Math.random() * (10 - -10) + -10);
                }
            };
        }
        let arrNeuron = [];
        for (let i = 0; i < clusters_M; i++) {
            arrNeuron.push(new Neuron(lengthNeurons_N));
        }
        console.log(arrNeuron)
        normalize()
        console.log(arrNeuron)
        let step=[arrNeuron]
        while (speedLearning > 0) {
            for (let epoch = 0; epoch < 10000; epoch++) {
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
