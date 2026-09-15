import osService from "../services/osService.js";

export const getOS = (req, res) => {
    const osList = osService.getOS();
    res.json(osList);
    
}
export const createOS = (req, res) => {
    try {
        const osData = req.body;
        const newOS = osService.createOS(osData);
        res.status(201).json(newOS);
        
    } catch (error) {
        res.status(400).json({ error: error.message });
        
    }
}
export const getOSById = (req, res) => {
 try {
    
     const osId = parseInt(req.params.id);
     const os = osService.getOSById(osId);
     if (os) 
         res.json(os);   
 } catch (error) {
    
     res.status(404).json({ error: "Ordem de Serviço não encontrada" });
 }



   
      
}
export const updateOS = (req, res) => {
    try {
        const osId = parseInt(req.params.id);   
        const updatedOS = req.body;
        const os = osService.updateOS(osId, updatedOS);
        res.json(os);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }       
}