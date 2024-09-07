class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        let resultado;
        if(!animal){
            resultado = {
                'erro':`O nome deve ser válido`,
                'recintosViaveis':false
            }
        }
        return resultado;
    }

}

export { RecintosZoo as RecintosZoo };
