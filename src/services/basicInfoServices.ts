import {Basic} from '../models/basicInfo';

//basic group services
class BasicInfoService{
    //create group service
    async createBasicInfo(payload:any){
       try{
let result:any=await Basic.create(payload)
console.log(">>result",result)
return result;
       }catch(e){
        console.log("eee>>",e)
        return e;

       }
    }
    //update group service
    async updateBasicInfo(payload:any,id:any){
        try{
            let result:any=await Basic.update(payload,id);
            return result;
        }catch(e){
            return e
        }
    }
}


export default new BasicInfoService();