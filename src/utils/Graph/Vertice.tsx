import NeighBor from "./Children";

export default class Vertice {
    value: number;
    key: String
    neighbor: Map<any, number>;

    constructor(value: number, key: String){
      this.neighbor = new Map()
    }

    setValue(value: number){
        this.value = value
    }

    getKey(){
        return this.value
    }
    getValue(){
        return this.value
    }
    getChildrens(){
        return this.neighbor;
    }
    getBestChild(){
        let menor_valor ={ valor: this.neighbor.values().next().value, key: this.neighbor.keys().next().value}
        this.neighbor.forEach((value, key) =>{
            if(value < menor_valor.valor ){
              menor_valor = {valor: value, key: key}
            }
        })
        // this.childrens.delete(menor_valor.key)
        return menor_valor
    }
    getInit(){
        return this.value;
    }
    insert(value: NeighBor[] ){
        Object.values(value).forEach((e: NeighBor)=>{
            if(e.getValue() > 0){
                this.neighbor.set(e.getKey(), e.getValue())
            }
        })
    }
}