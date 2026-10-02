import {listServices,addService,getServiceById,updateService,deleteService} from '../repositories/serviceRepo.js';





class ServicesService {


 getService() {
    return listServices();
}

getServiceById(id) {
   
    const service = getServiceById(parseInt(id));
    return service;
}

createService(service) {
    const newService = {
        id: Date.now(),
        descricao: service.descricao,
        valor: service.valor,   
        ativo: true
    }
    return addService(newService);
}

updateService(id, updatedService) {
    const serviceId = parseInt(id);
    const existingService = getServiceById(serviceId);
    if (!existingService) {
        throw new Error('Serviço não encontrado');
    }
    return updateService(serviceId, updatedService);
    
}

delServService(id){
    return deleteService(id)
}


   
       
 }
const services = new ServicesService();
export default services;