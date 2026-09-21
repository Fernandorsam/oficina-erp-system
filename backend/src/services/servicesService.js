import e from 'express';
import {listServices,addService,getServiceById,updateService} from '../repositories/serviceRepo.js';





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

   
       
 }
const services = new ServicesService();
export default services;