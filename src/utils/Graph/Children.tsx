
export default class NeighBor {
    private key: String;
    private value: any;

    constructor(key: String, value: any){
        this.key = key;
        this.value = value;
    }
    setkey(value: String){
        this.key = value
    }
    setValue(value: any){
        this.value = value
    }
    getKey(){
        return this.key
    }
    getValue(){
        return this.value;
    }
    getKeyValid(){
        return this.value > 0 ? this.key : null
    }
}