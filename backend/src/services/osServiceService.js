import { listOsServ,addOsService,getOsServiceByOsId,getOsServiceById,updateOsService} from "../repositories/osServiceRepo.js";
import { getOSById } from "../repositories/osRepo.js"
import { getServiceById} from "../repositories/serviceRepo.js"

class OsServiceService{

    getOsService(){
        return listOsServ();
    }

    getOsServiceByOsId(id){
        const osId = parseInt(id);
        if(!getOSById(osId)){
            throw new Error("Ordem de serviço não encontrada!!! :(");
        }
        return getOsServiceByOsId(osId);

    }
   

    addServiceToOs(osServ){

        const os  = getOSById(osServ.osId)
        const service = getServiceById(osServ.serviceId)
        
        if(!os){
            throw new Error("Ordem de serviço não encontrada!!! :(");
            
        }
        if(!service){
            throw new Error("Serviço não encontrado!!! :(");
            
        }
        
        const newOsService = {
            id: Date.now(),
            osId: osServ.osId,
            serviceId: service.id,
            descricao: service.descricao,
            valor: service.valor,
            autorizado: false
        };

        return addOsService(newOsService)
    }

    updateAutorization(id, autorizado){
        const osServId = parseInt(id);
      const getOsServ = getOsServiceById(osServId);

      if(!getOsServ){
        throw new Error("Serviço da ordem de serviço não encontrado!!! :(");
      } 

        if(typeof autorizado !== "boolean"){
            throw new Error("O valor de autorização deve ser booleano!!! :(");
        }


      return updateOsService(osServId, {autorizado: autorizado});

    }

    getOsServiceTotal(osId){
        const osServId = parseInt(osId);
        const osServ = getOsServiceByOsId(osServId);
        const os = getOSById(osServId);
        if(!os){
            throw new Error("Ordem de serviço não encontrada!!! :(");
        }
        let totalOrcado = 0;
        let totalAutorizado = 0;
        osServ.forEach(service => {
            totalOrcado += service.valor;
            if(service.autorizado){
                totalAutorizado += service.valor;
            }
        });
        return { totalOrcado, totalAutorizado };

}






}

const osServService = new OsServiceService()
export default osServService

