const osServiceRepo = [
    {
    id: 1,
    osId : 1,
    serviceId : 1,
    descricao : "teste de osService",
    valor : 100,
    autorizado : false

}]

export function listOsServ(){
    return osServiceRepo;
}
export function getOsServiceByOsId(id){
   
    return osServiceRepo.filter(osServ => osServ.osId === id);

}
export function getOsServiceById(id){
    return osServiceRepo.find(osServ => osServ.id === id);
}   
export function addOsService(osServ){
    osServiceRepo.push(osServ);

    return osServ;
}
export function updateOsService(id, updatedOsServ) {
    const index = osServiceRepo.findIndex((osServIndex) => osServIndex.id === id);
    if(index !== -1){
        osServiceRepo[index] = {...osServiceRepo[index], ...updatedOsServ}
        return osServiceRepo[index]
    }
    return null
}


