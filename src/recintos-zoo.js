import habitat from './habitat.json'
import animais from './animais.json'

function buscaCarnivoro(bioma, animal, quantidade) {
    let resultado, i, j = 0;
    resultado = {
        "erro": false,
        "recintosViaveis": []
    }
    for (i = 0; i < habitat.habitat.length; i++) {
        if (habitat.habitat[i].bioma === bioma && (habitat.habitat[i].animaisExistentes[0].animal === animal || habitat.habitat[i].animaisExistentes[0] === "vazio")) {
            //Verifica se ha espaço
            let espacoOcupado
            if (habitat.habitat[i].animaisExistentes[0] === "vazio") {
                espacoOcupado = 0
            }
            else {
                espacoOcupado = habitat.habitat[i].animaisExistentes[0].quantidade * animais.animais.leao.tamanho
            }
            let espacoNovosAnimais
            if (animal === "leopardo") {
                espacoNovosAnimais = animais.animais.leopardo.tamanho * quantidade
            }
            else if (animal === "leao") {
                espacoNovosAnimais = animais.animais.leao.tamanho * quantidade
            }
            else {
                espacoNovosAnimais = animais.animais.crocodilo.tamanho * quantidade
            }

            let tamHabitat = habitat.habitat[i].tamanho

            if (tamHabitat - espacoOcupado >= espacoNovosAnimais) {
                resultado.erro = false
                resultado.recintosViaveis[j] = `Recinto ${i + 1} (espaço livre: ${tamHabitat - (espacoNovosAnimais + espacoOcupado)} total: ${tamHabitat})`;
                j++
            }
        }
    }
    if (j === 0) {
        resultado = {
            "erro": "Não há recinto viável",
            "recintosViaveis": false
        }
    }
    return resultado
}

function buscaMacaco(quantidade) {
    let resultado, i, j = 0;
    resultado = {
        "erro": false,
        "recintosViaveis": []
    }
    for (i = 0; i < habitat.habitat.length; i++) {
        let bioma = habitat.habitat[i].bioma
        //Utilizando o includes pois pode existir um recinto com 'savana e rio'
        if (bioma.includes('savana') || bioma === 'floresta') {
            //Verificando se será inserido apenas um macaco, caso verdade, não pode inserir
            if (quantidade === 1 && habitat.habitat[i].animaisExistentes[0] === "vazio") {
                //Verificando se ja não há um recinto disponível para nao atribuir erro à saída
                if (j !== 0) {
                    resultado.erro = 'Não há recinto viável'
                    resultado.recintosViaveis = false
                }
            }
            else {
                let habitatAtual = habitat.habitat[i]
                let espacoOcupado = 0
                let tamHabitat = habitatAtual.tamanho
                //Como o macaco pode habitar com outros animais, aqui esta uma busca para ver se há espaço
                let k
                for (k = 0; k < habitatAtual.animaisExistentes.length; k++) {
                    if (habitatAtual.animaisExistentes[k].animal === 'macaco') {
                        espacoOcupado += habitatAtual.animaisExistentes[k].quantidade * animais.animais.macaco.tamanho
                    }
                    else if (habitatAtual.animaisExistentes[k].animal === 'gazela') {
                        espacoOcupado += habitatAtual.animaisExistentes[k].quantidade * animais.animais.gazela.tamanho
                        espacoOcupado++
                    }
                    else if (habitatAtual.animaisExistentes[k].animal === 'hipopotamo' && habitatAtual.bioma === 'savana e rio') {
                        espacoOcupado += habitatAtual.animaisExistentes[k].quantidade * animais.animais.hipopotamo.tamanho
                        espacoOcupado++
                    }
                }

                if (habitat.habitat[i].animaisExistentes[0].animal === 'hipopotamo' && habitat.habitat[i].bioma === 'savana e rio' && tamHabitat - espacoOcupado > quantidade * animais.animais.macaco.tamanho) {
                    resultado.erro = false
                    resultado.recintosViaveis[j] = `Recinto ${i + 1} (espaço livre: ${tamHabitat - (espacoOcupado + quantidade * animais.animais.macaco.tamanho)} total: ${tamHabitat})`
                    //Incrementando o j para indicar que há pelo menos um recinto disponível
                    j++;
                }
                else {
                    if ((habitat.habitat[i].animaisExistentes[0].animal !== 'leao' && habitat.habitat[i].animaisExistentes[0].animal !== 'leopardo' && habitat.habitat[i].animaisExistentes[0].animal !== 'crocodilo' && habitat.habitat[i].animaisExistentes[0].animal !== 'hipopotamo') && tamHabitat - espacoOcupado >= quantidade * animais.animais.macaco.tamanho) {
                        resultado.erro = false
                        resultado.recintosViaveis[j] = `Recinto ${i + 1} (espaço livre: ${tamHabitat - (espacoOcupado + quantidade * animais.animais.macaco.tamanho)} total: ${tamHabitat})`
                        //Incrementando o j para indicar que há pelo menos um recinto disponível
                        j++;
                    }
                }
            }
        }
    }
    return resultado;
}

function buscaHipopotamo(quantidade) {
    let resultado = {
        "erro": false,
        "recintosViaveis": []
    }, i, j = 0;

    for (i = 0; i < habitat.habitat.length; i++) {
        let habitatAtual = habitat.habitat[i];
        if ((habitatAtual.bioma === 'savana' || habitatAtual.bioma === 'rio') && (habitatAtual.animaisExistentes[0].animal === 'hipopotamo' || habitatAtual.animaisExistentes[0] === 'vazio')) {
            let espacoOcupado
            if (habitatAtual.animaisExistentes[0] === 'vazio') {
                espacoOcupado = 0
            }
            else {
                espacoOcupado = habitatAtual.animaisExistentes[0].quantidade * animais.animais.hipopotamo.tamanho;
            }
            let tamHabitat = habitatAtual.tamanho;
            let espacoNovosAnimais = quantidade * animais.animais.hipopotamo.tamanho;
            if (tamHabitat - espacoOcupado >= espacoNovosAnimais) {
                resultado.erro = false;
                resultado.recintosViaveis[j] = `Recinto ${i + 1} (espaço livre: ${tamHabitat - (espacoOcupado + quantidade * animais.animais.hipopotamo.tamanho)} total: ${tamHabitat})`;
                j++;
            }
        }
        else {
            let espacoOcupado
            if (habitatAtual.animaisExistentes[0].animal === 'gazela') {
                espacoOcupado = habitatAtual.animaisExistentes[0].quantidade * animais.animais.gazela.tamanho + 1;
            }
            else {
                if (habitatAtual.animaisExistentes[0].animal === 'macaco') {
                    espacoOcupado = habitatAtual.animaisExistentes[0].quantidade * animais.animais.macaco.tamanho + 1;
                }
            }
            let tamHabitat = habitatAtual.tamanho;
            let espacoNovosAnimais = quantidade * animais.animais.hipopotamo.tamanho;
            let animaisPresente = habitatAtual.animaisExistentes[0].animal;
            if (habitatAtual.bioma === "savana e rio" && (animaisPresente !== 'leao' && animaisPresente !== 'leopardo' && animaisPresente !== 'crocodilo') && tamHabitat - espacoOcupado >= espacoNovosAnimais) {
                resultado.erro = false;
                resultado.recintosViaveis[j] = `Recinto ${i + 1} (espaço livre: ${tamHabitat - (espacoOcupado + quantidade * animais.animais.hipopotamo.tamanho)} total: ${tamHabitat})`;
                j++;
            }
        }
    }
    if (j === 0) {
        resultado.erro = 'Não há recinto viável'
        resultado.recintosViaveis = false
    }
    return resultado;
}

function buscaGazela(quantidade) {
    let resultado = {
        "erro": false,
        "recintosViaveis": []
    };
    let i, j = 0, k;
    for (i = 0; i < habitat.habitat.length; i++) {
        let habitatAtual = habitat.habitat[i];
        let animalNoRecinto = habitatAtual.animaisExistentes[0].animal;
        let espacoOcupado = 0;
        if (habitatAtual.bioma === 'savana' && animalNoRecinto !== 'leao' && animalNoRecinto !== 'leopardo' && animalNoRecinto !== 'hipopotamo') {
            let tamHabitat = habitatAtual.tamanho;
            let espacoNovosAnimais = quantidade * animais.animais.gazela.tamanho;
            if (habitatAtual.animaisExistentes[0] === 'vazio') {
                espacoOcupado = 0
            }
            else {
                if (animalNoRecinto === 'macaco') {
                    espacoOcupado = habitatAtual.animaisExistentes[0].quantidade * animais.animais.macaco.tamanho + 1;

                }
                if (animalNoRecinto === 'gazela') {
                    espacoOcupado = habitatAtual.animaisExistentes[0].quantidade * animais.animais.gazela.tamanho;
                }
            }
            if (tamHabitat - espacoOcupado >= espacoNovosAnimais) {
                resultado.recintosViaveis[j] = `Recinto ${i + 1} (espaço livre: ${tamHabitat - (espacoOcupado + espacoNovosAnimais)} total: ${tamHabitat})`;
                j++;
            }
        }
        else {
            if (habitatAtual.bioma === 'savana e rio' && animalNoRecinto !== 'leao' && animalNoRecinto !== 'leopardo' && animalNoRecinto !== 'crocodilo') {
                if (habitatAtual.animaisExistentes.length === 1) {
                    if (habitatAtual.animaisExistentes[0] === 'vazio')
                        espacoOcupado = 0
                    if (animalNoRecinto === 'hipopotamo')
                        espacoOcupado = habitatAtual.animaisExistentes[0].quantidade * animais.animais.hipopotamo.tamanho + 1;
                    if (animalNoRecinto === 'macaco')
                        espacoOcupado = habitatAtual.animaisExistentes[0].quantidade * animais.animais.macaco.tamanho + 1;
                    if (animalNoRecinto === 'gazela')
                        espacoOcupado = habitatAtual.animaisExistentes[0].quantidade * animais.animais.gazela.tamanho;
                }
                else {
                    espacoOcupado = 1;
                    for (k = 0; k < habitatAtual.animaisExistentes.length; k++) {
                        if (habitatAtual.animaisExistentes[k].animal === 'hipopotamo')
                            espacoOcupado += habitatAtual.animaisExistentes[k].quantidade * animais.animais.hipopotamo.tamanho;
                        if (habitatAtual.animaisExistentes[k].animal === 'macaco')
                            espacoOcupado += habitatAtual.animaisExistentes[k].quantidade * animais.animais.macaco.tamanho;
                        if (habitatAtual.animaisExistentes[k].animal === 'gazela') {
                            espacoOcupado += habitatAtual.animaisExistentes[k].quantidade * animais.animais.gazela.tamanho;
                        }
                    }
                }
                let tamHabitat = habitatAtual.tamanho;
                let espacoNovosAnimais = quantidade * animais.animais.gazela.tamanho;
                if(tamHabitat - espacoOcupado >= espacoNovosAnimais) {
                    resultado.recintosViaveis[j] = `Recinto ${i + 1} (espaço livre: ${tamHabitat - (espacoOcupado + espacoNovosAnimais)} total: ${tamHabitat})`;
                    j++;
                }
            }
        }
    }
    if (j === 0) {
        resultado.erro = 'Não há recinto viável';
        resultado.recintosViaveis = false;
    }
    return resultado;
}


class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        let resultado;
        if (!animal) {
            resultado = {
                'erro': `O nome deve ser válido`,
                'recintosViaveis': false
            }
        }
        else if (quantidade <= 0) {
            resultado = {
                "erro": "Quantidade inválida",
                "recintosViaveis": false
            }
        }
        else {
            if (animal === 'leao') {
                resultado = buscaCarnivoro('savana', animal, quantidade)
            }
            else if (animal === 'leopardo') {
                resultado = buscaCarnivoro('savana', animal, quantidade)
            }
            else if (animal === 'crocodilo') {
                resultado = buscaCarnivoro('rio', animal, quantidade)
            }
            else if (animal === 'macaco') {
                resultado = buscaMacaco(quantidade)
            }
            else if (animal === 'gazela') {
                resultado = buscaGazela(quantidade);
            }
            else if (animal === 'hipopotamo') {
                resultado = buscaHipopotamo(quantidade)
            }
            else {
                resultado = {
                    'erro': 'Animal inválido',
                    'recintosViaveis': false
                }
            }
        }
        return resultado;
    }

}

export { RecintosZoo as RecintosZoo };
