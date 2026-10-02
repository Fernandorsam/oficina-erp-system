import osServService from "../services/osServiceService.js";


export function getOsServiceCtrl(req,res){
    return osServService.getOsService();
}
export function getOsServiceByOsIdCtrl(req,res){
    try {
        const osId = req.params.id;
        const osServ = osServService.getOsServiceByOsId(osId);
        res.status(200).json(osServ)
    } catch (error) {
        res.status(404).json({error: "Ordem de serviço não encontrada!!! :("})
    }
}

export function osServServiceCtrl(req,res){
    try {
        const osServ = req.body;
        const newOsServ = osServService.addServiceToOs(osServ);
        res.status(201).json(newOsServ)

        
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }

}

export function updateAutorizationCtrl(req,res){
    try {
        const osServId = req.params.id;
        const autorizado = req.body.autorizado;

        if(typeof autorizado !== "boolean"){
          return res.status(400).json({error:"O valor de autorização deve ser booleano!!! :("})
        }
        const updatedOsServ = osServService.updateAutorization(osServId, autorizado);
        res.status(200).json(updatedOsServ)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export function  getOsServiceTotalCtrl(req,res){
    try {
        const osId = req.params.id;
        const totals = osServService.getOsServiceTotal(osId);
        res.status(200).json(totals)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}