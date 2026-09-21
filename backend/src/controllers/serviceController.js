import services from "../services/servicesService.js";

export function listServices(req, res) {  
    const service = services.getService();
    res.status(200).json(service);
}

export function getServiceById(req, res) {
   
        const { id } = req.params;
        const service = services.getServiceById(id);    
        if(service ) {
            res.status(200).json(service);
        } else {
            res.status(404).json({ error: "Service not found" });
        }
  
}

export function createServices(req, res) {
    try {
        const service = req.body;
        const newService = services.createService(service);
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ error: error.message });     

    }
}

export function updateService(req, res) {
   const { id } = req.params;
   const updatedService = req.body;
   try {
    const service = services.updateService(id,updatedService)
    res.status(200).json(service)
    
   } catch (error) {
    res.status(404).json({message : "serviço não encontrado!!"})
    
   }
}