import { RecintosZoo } from "./recintos-zoo.js";

describe('Recintos do Zoologico', () => {

    test('Deve rejeitar animal inválido', () => {
            const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
            expect(resultado.erro).toBe("Animal inválido");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve rejeitar quantidade inválida', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
            expect(resultado.erro).toBe("Quantidade inválida");
            expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recintos para 10 leoes', () => {
            const resultado = new RecintosZoo().analisaRecintos('leao', 10);
            expect(resultado.erro).toBe("Não há recinto viável");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new RecintosZoo().analisaRecintos('crocodilo', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 7 (espaço livre: 5 total: 14)');
        expect(resultado.recintosViaveis.length).toBe(2);
    });

    test('Deve encontrar recintos para 2 macacos', () => {

        const resultado = new RecintosZoo().analisaRecintos('macaco', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosViaveis[3]).toBe('Recinto 6 (espaço livre: 4 total: 6)');
        expect(resultado.recintosViaveis.length).toBe(4);
    });

    //CASOS DE TESTES EXTRAS
    
    test('O animal deve ter um nome', () => {
        const resultado = new RecintosZoo().analisaRecintos('', 2);
        expect(resultado.erro).toBe("O nome deve ser válido");
        expect(resultado.recintosViaveis).toBeFalsy();
    })

    test('Deve encontrar recinto para 1 leao', () => {
        const resultado = new RecintosZoo().analisaRecintos('leao', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 5 (espaço livre: 3 total: 9)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 6 (espaço livre: 3 total: 6)');
        expect(resultado.recintosViaveis.length).toBe(2);
    });

    test('Deve encontrar recinto para leao numa savana vazia', () => {
        const resultado = new RecintosZoo().analisaRecintos('leao', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 5 (espaço livre: 3 total: 9)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 6 (espaço livre: 3 total: 6)');
        expect(resultado.recintosViaveis.length).toBe(2);
    })

    test('Deve encontrar recinto para 2 leopardos', () => {
        const resultado = new RecintosZoo().analisaRecintos('leopardo', 2)
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 6 (espaço livre: 2 total: 6)')
        expect(resultado.recintosViaveis.length).toBe(1)
    })

});

