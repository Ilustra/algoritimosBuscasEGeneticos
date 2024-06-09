import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Graph from "../../utils/Graph/Graph";
import MATRIZ_ORIGIM from "../../utils/MATRIZ";
import Bloco from "./Bloco";
import Box from "./Box";
import calcularDistanciaEuclidiana from "./CalculaDistanciaEuclidiana";
import { getGrafoFromMatriz, getPesoMatrizModificada } from "./GerarRandonMinMax";

enum TIPOS {
  ARENOSO = 4,
  SOLIDO = 1,
  PANTANO = 20,
  ROCHOSO = 10,
}

const switchStyleCss = (val) => {
  if (val === 0) {
    return 'ATOR'
  } else if (val === -1) {
    return 'PAREDE'
  } else if (val >= 1 && val <= 3.99) {
    return 'SOLIDO'
  } else if (val >= 4 && val <= 9.99) {
    return 'ARENOSO'
  } else if (val >= 10 && val <= 19.99) {
    return 'ROCHOSO'
  } else if (val >= 20 && val <= 29.99) {
    return 'PANTANO'
  } else if (val === 99) {
    return 'CASA'
  }
  return 'LIVRE'
}

const Mesa: React.FC<any> = (props: any) => {
  const descricao = { 4: 'ARENOSO', 1: 'SOLIDO', 20: 'PANTANO', 10: 'ROCHOSO' }
  const [pontoAtor] = useState('1-1')
  const [pontosBusca, setPontosBusca] = useState('1-1')

  const tamanhoMatriz = { i: 21, j: 21 }
  const [graph, setGraph] = useState(new Graph())

  const [x, setX] = useState([0])
  const [y, setY] = useState([0])

  const [matriz, setMatriz] = useState(MATRIZ_ORIGIM)
  const [path, setPath] = useState([])

  useEffect(() => {
    for (let i = -1; i < tamanhoMatriz.i; i++)
      setX([...x, i])

    for (let i = 0; i < tamanhoMatriz.j; i++)
      setY([...y, i])

      modificaMatrizAndGrafo(matriz)
  }, [])

  const findRota = (value) => path.indexOf(value) !== -1
  const modificaMatrizAndGrafo =(matriz)=>{
    const {i, j} = tamanhoMatriz
    const matrizPesosModificado = getPesoMatrizModificada(matriz, pontosBusca, i, j);
    setMatriz(matrizPesosModificado)
    setGraph(getGrafoFromMatriz(matrizPesosModificado, i, j)) 
  }

  const buscaAEstrela =(value: any, end)=>{
    let current = value
    let visited = new Set();
    let path = [];

    while (current !== end) {
      visited.add(current)
      path.push(current)

      let nextNode = null;
      let minDistance = Infinity

      graph.adjList
      .get(current)
      .filter(e => !visited.has(e))
      .map(e => {
          const [i, j] = e.split('-').map(Number)
          return calcularDistanciaEuclidiana(e, end, matriz[i][j])
      }).forEach(element => {
          const [distance, custo, id] = element
          if(id === pontosBusca){
            nextNode = id;
            visited.add(id)
            return 
          }
          if ((distance + custo )< minDistance) {
            minDistance = distance + custo;
            nextNode = id;
          }
      });
      if(visited.has(pontosBusca)){
        setPath(path)
        return path;
      }
      if (nextNode === null) {
        setPath(path)
        console.log("Não foi possível encontrar um caminho.");
        return path;
      }
      current = nextNode;
    }
    path.push(current);
    setPath(path)
    return path;
  }
  const buscaGulosa = (value: any, end) => {
    let current = value
    let visited = new Set();
    let path = [];

    while (current !== end) {
      visited.add(current)
      path.push(current)

      let nextNode = null;
      let minDistance = Infinity

      graph.adjList
      .get(current)
      .filter(e => !visited.has(e))
      .map(e => {
          const [i, j] = e.split('-').map(Number)
          return calcularDistanciaEuclidiana(e, end, matriz[i][j])
      }).forEach(element => {
          const [distance, custo, id] = element
          if(id === pontosBusca){
            nextNode = id;
            visited.add(id)
            return 
          }
          if (distance  < minDistance) {
            minDistance = distance ;
            nextNode = id;
          }
      });
      if(visited.has(pontosBusca)){
        setPath(path)
        return path;
      }
      if (nextNode === null) {
        setPath([{}])
        console.log("Não foi possível encontrar um caminho.");
        return path;
      }
      current = nextNode;
    }
    path.push(current);
    setPath(path)
    return path;
  }

  const insertPontoBusca = (i, j) => {
    setMatriz(current => (current.map((element, inI) => {
      return element.map((value, inJ) => {
        if (value === 99) {
          return 1
        }
        if (inI == i && inJ == j && value > -1) {
          return 99
        } else {
          return value
        }
      })
    }))
    )
  }
  const clear =()=>{
    setPath([])
    modificaMatrizAndGrafo(MATRIZ_ORIGIM)
  }
  const [isVisibleValueCelula, setIsVisibleCelula] = useState(false)
  return (
    <div className="flex bg-white border ">
      <Box className='relative'>
        <div className="flex flex-row w-full">
          {x.map((value, index) =>  (<div key={index} className={`w-[25px] h-[25px] flex items-center justify-center text-[10px] `}>{value}</div>))}
        </div>
        <div className="relatie flex flex-row">
          <div className="w-[25px]">
          {y.map((value, index) => (<div key={index} className={`w-[25px] h-[25px] flex items-center justify-center text-[10px]  `}>{value}</div>))}
          </div>
          <div className="w-full   flex flex-wrap ">
            {matriz.map((val, index) => (
            <div className="flex flex-wrap " key={index}>
              {val.map((el, i) => (
                  <div key={i} onClick={() => {
                    setPontosBusca(`${index}-${i}`)
                    insertPontoBusca(index, i)
                  }} className={`${findRota(`${index}-${i}`) ? 'ROTA' : ''} relative w-[25px] h-[25px] border-b border-r border-gray-310 p-0 m-0 justify-start items-start ${switchStyleCss(el)} `}>
                   {matriz[index][i] > 0 && <h1 style={{display: isVisibleValueCelula ? '': 'none'}} className="text-[8px] p-0 m-0  none">{`${index},${i} `} <div >{matriz[index][i]}</div></h1> } 
                  </div>
                ))}
            </div>)
            )}
          </div>
        </div>
      </Box>
      <div className="flex flex-col w-[25%] p-10  ">
        <div>
          <div className="flex flex-row">
            <Bloco className={`${descricao[TIPOS.SOLIDO]}`}></Bloco>
            <span className="ml-4">{descricao[TIPOS.SOLIDO]} + {TIPOS.SOLIDO}</span>
          </div>
          <div className="flex flex-row">
            <Bloco className={`${descricao[TIPOS.ROCHOSO]}`}></Bloco>
            <span className="ml-4">{descricao[TIPOS.ROCHOSO]} + {TIPOS.ROCHOSO}</span>
          </div>
          <div className="flex flex-row">
            <Bloco className={`${descricao[TIPOS.ARENOSO]}`}></Bloco>
            <span className="ml-4">{descricao[TIPOS.ARENOSO]} + {TIPOS.ARENOSO}</span>
          </div>
          <div className="flex flex-row">
            <Bloco className={`${descricao[TIPOS.PANTANO]}`}></Bloco>
            <span className="ml-4">{descricao[TIPOS.PANTANO]} + {TIPOS.PANTANO}</span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row">
            <span>inicio: {pontoAtor}  </span>
            <div className="ATOR h-[25px] w-[25px] ml-2"></div>
          </div>
          <div className="flex flex-row">
            <span>fim: {pontosBusca}  </span>
            <div className="CASA h-[25px] w-[25px] ml-2"></div>
          </div>
        </div>

        <Button disabled={path.length > 0} onClick={() => buscaGulosa('1-1', pontosBusca)} variant="outlined" color='primary' className="">BUSCA GULOSA</Button>
        <Button disabled={path.length >0 } onClick={() =>  buscaAEstrela('1-1', pontosBusca)} variant="outlined" color='primary' className="">BUSCA A * </Button>
        <Button color='primary'onClick={clear} className="">limpar</Button>
        <Button color='primary'onClick={()=>setIsVisibleCelula(!isVisibleValueCelula)} className="">VALOR CELULA</Button>

      </div>
    </div>
  );
};
export default Mesa;
