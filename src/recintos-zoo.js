import habitat from './habitat.json'
import animais from './animais.json'

function buscaCarnivoro(bioma, animal, quantidade) {
    let resultado, i, j=0;
    resultado = {
        "erro":false,
        "recintosViaveis":[]
    }
    for (i = 0; i < habitat.habitat.length; i++) {
        if (habitat.habitat[i].bioma === bioma && (habitat.habitat[i].animaisExistentes[0].animal === animal || habitat.habitat[i].animaisExistentes[0]==="vazio")) {
            //Verifica se ha espaço
            let espacoOcupado
            if(habitat.habitat[i].animaisExistentes[0]==="vazio"){
                espacoOcupado = 0
            }
            else {
                espacoOcupado = habitat.habitat[i].animaisExistentes[0].quantidade * animais.animais.leao.tamanho
            }
            let espacoNovosAnimais
            if(animal === "leopardo"){
                espacoNovosAnimais = animais.animais.leopardo.tamanho * quantidade
            }
            else if(animal==="leao"){
                espacoNovosAnimais = animais.animais.leao.tamanho * quantidade 
            }
            else {
                espacoNovosAnimais = animais.animais.crocodilo.tamanho * quantidade 
            }
            
            let tamHabitat = habitat.habitat[i].tamanho

            if (tamHabitat - espacoOcupado > espacoNovosAnimais) {
                resultado.erro=false
                resultado.recintosViaveis[j] = `Recinto ${i + 1} (espaço livre: ${tamHabitat - (espacoNovosAnimais + espacoOcupado)} total: ${tamHabitat})`;
                console.log(resultado)
                j++
            }
        }
    }
    if(j===0) {
        resultado = {
            "erro":"Não há recinto viável",
            "recintosViaveis":false
        }
    }
    return resultado
}

class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        let resultado, res, i, j = 0;
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
            //Verifica se o animal é leao, se o bioma é savana e se o habitat contem sua especie
            if (animal === 'leao') {
                resultado = buscaCarnivoro('savana',animal,quantidade)
            }
            else if(animal==='leopardo'){
                resultado = buscaCarnivoro('savana',animal,quantidade)
            } 
            else if(animal==='crocodilo'){
                resultado = buscaCarnivoro('rio', animal, quantidade)
            }
            else if(animal==='macaco'){

            }
            else if(animal==='gazela'){

            }
            else if(animal==='hipopotamo'){

            }
            else {
                resultado = {
                    'erro':'Animal inválido',
                    'recintosViaveis':false
                }
            }
        }
        return resultado;
    }

}

export { RecintosZoo as RecintosZoo };
