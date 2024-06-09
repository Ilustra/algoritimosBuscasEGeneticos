import NeighBor from "../../utils/Graph/Children";
import Graph from "../../utils/Graph/Graph";

const gerarInteiroAleatorio = (min, max) => (Math.random() * (max - min) + min);

const selectRandonMinMax = (e) => {
  switch (e) {
    case 1: return gerarInteiroAleatorio(1, 3)
    case 4: return gerarInteiroAleatorio(4, 9)
    case 10: return gerarInteiroAleatorio(10, 19)
    case 20: return gerarInteiroAleatorio(20, 29)
  }
}
export const getPesoMatrizModificada = (matriz, pontosBusca, countI, CountJ) => {
  let newMatriz = []
  for (let i = 0; i < countI; i++) {
    let linhaMatriz = []
    for (let j = 0; j < CountJ; j++) {
      let valor = matriz[i][j];
      const [iFim, jFim] = pontosBusca.split('-')
      if (i === parseInt(iFim) && j === parseInt(jFim)) {
        linhaMatriz.push(99)
      } else if (valor > 0) {
        linhaMatriz.push(selectRandonMinMax(valor))
      } else {
        linhaMatriz.push(valor)
      }
    }
    newMatriz.push(linhaMatriz)
  }
  return newMatriz;
}
export const getGrafoFromMatriz = (matriz, countI, countJ) => {
  let graph = new Graph();
  for (let i = 0; i < countI; i++)
    for (let j = 0; j < countJ; j++)
      if (matriz[i][j] >= 0)
        graph.addVertex(`${i}-${j}`)

  for (let i = 0; i < countI; i++)
    for (let j = 0; j < countJ; j++)
      if (matriz[i][j] > -1) {
        let i_j = new NeighBor(`${i}-${j}`, matriz[i][j])
        let i1_j = new NeighBor(`${i + 1}-${j}`, matriz[i + 1][j])
        let _1i_j = new NeighBor(`${i - 1}-${j}`, matriz[i - 1][j])
        let i_J1 = new NeighBor(`${i}-${j + 1}`, matriz[i][j + 1])
        let i_1J = new NeighBor(`${i}-${j - 1}`, matriz[i][j - 1])
        graph.addEdge(`${i}-${j}`, i1_j.getKeyValid(), _1i_j.getKeyValid(), i_J1.getKeyValid(), i_1J.getKeyValid())
      }
  return graph;
}
export default selectRandonMinMax