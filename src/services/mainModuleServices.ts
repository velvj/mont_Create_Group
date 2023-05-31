import  {MainMod} from '../models/mainModule';

//main module services
class MainModService{
    //create main Module
async createMainMod(payload:any){
    try{
let result:any=await MainMod.create(payload)
return result;
    }catch(e){
        return e;
    }
}
}

export default new MainModService();