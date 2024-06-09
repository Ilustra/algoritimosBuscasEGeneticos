//https://acervolima.com/implementacao-de-graph-em-javascript/

import NeighBor from "./Children";
import Vertice from "./Vertice";


export default class Graph {
    
    adjList: Map<any, any> ;

    constructor()
    {
     this.adjList = new Map<any, any>();
    }
      
    addVertex(key: String)
    {
        this.adjList.set(key,  [])
    }

    addEdge(key: any, children1: any, children2: any, children3: any,children4: any)    {
        if(children1)
        this.adjList.get(key).push(children1)
        if(children2)
        this.adjList.get(key).push(children2)
        if(children3)
        this.adjList.get(key).push(children3)
        if(children4)
        this.adjList.get(key).push(children4)
    }

    getMelhor(value: any){
    }

}