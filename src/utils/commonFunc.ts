//common Data check
export const  commonData=(ele:any)=>{
    try{
return{
    sub_module_id: ele.sub_module_id,
        is_all: ele.is_all,
        is_create: ele.is_create,
        is_view: ele.is_view,
        is_update: ele.is_update,
        is_delete: ele.is_delete,
        is_download_print: ele.is_download_print,
        is_view_notes: ele.is_view_notes}
    }catch(e){
        return e;
    }
}
//is_all true check
export const  selectedAll=(ele:any)=>{
    try{
return{
    sub_module_id: ele.sub_module_id,
        is_all: true,
        is_create: true,
        is_view: true,
        is_update:true,
        is_delete: true,
        is_download_print:true,
        is_view_notes: true}
    }catch(e){
        return e;
    }
}