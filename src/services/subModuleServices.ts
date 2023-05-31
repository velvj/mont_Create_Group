import { SubMod } from "../models/subModule";

//sub Module services
class SubModServices{
    //create sub module
    async createSubMod(payload:any){
        try{
let result:any= await SubMod.create(payload);
return result;
        }catch(e){
return e;
        }
    }
//list of sub Modules
    async listOfSubMod(data?:any){
        try{
            let result:any=await SubMod.findAll({...data,raw:true,nest:false});
            return result;
        }catch(e){
            return e;
        }
    }
}

export default new SubModServices();