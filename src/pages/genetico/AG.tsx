function fitness(individuo) {
    let conflitos = 0;
    for (let i = 0; i < individuo.length; i++) {
        for (let j = i + 1; j < individuo.length; j++) {
            if (individuo[i][0].dia === individuo[j][0].dia && individuo[i][1].hr === individuo[j][1].hr) {
                conflitos++;
            }
        }
    }
    return -conflitos; 
}

function torneio(populacao) {
    const torneio = [populacao[Math.floor(Math.random() * populacao.length)], populacao[Math.floor(Math.random() * populacao.length)]];
    torneio.sort((a, b) => fitness(b) - fitness(a));
    return [torneio[0], torneio[1]];
}

function crossover(pai1, pai2) {
    const pontoCorte = Math.floor(Math.random() * (pai1.length - 1)) + 1;

    const filho1 = pai1.slice(0, pontoCorte).concat(pai2.slice(pontoCorte));
    const filho2 = pai2.slice(0, pontoCorte).concat(pai1.slice(pontoCorte));
    return [filho1, filho2];
}

function gerarMutacao(individuo) {
    const [i, j] = [Math.floor(Math.random() * individuo.length), Math.floor(Math.random() * individuo.length)];
    [individuo[i], individuo[j]] = [individuo[j], individuo[i]];
    return individuo;
}


const algoritmoGenetico = (peridodos, tamanhoPopulacao = 23, geracoes = 100) => {

    let populacao = Array.from({ length: tamanhoPopulacao }, () => peridodos[Math.floor(Math.random() * peridodos.length)]);
    let popPeriodo
    for (let geracao = 0; geracao < geracoes; geracao++) {
        let novaPopulacao = [];
        let novaPopulacaoPeriodo = [];
        for (let i = 0; i < tamanhoPopulacao / 2; i++) {
            const [pai1, pai2] = torneio(populacao);

            let [filho1, filho2] = crossover(pai1, pai2);

            filho1 = gerarMutacao(filho1);
            filho2 = gerarMutacao(filho2);
            novaPopulacao.push(filho1, filho2);
        }
        populacao = novaPopulacao;
        popPeriodo = novaPopulacaoPeriodo
    }

    populacao.sort((a, b) => fitness(b) - fitness(a));
    return populacao[0];

}

export default algoritmoGenetico