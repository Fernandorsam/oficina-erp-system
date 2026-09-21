const servMock =[
    {
        id : 1,
        descricao : "Serviço de Teste",
        valor : 100.00,
        ativo : true
    }
]

export  function listServices(){
    return servMock;
}

export function getServiceById(id) {
    const service = servMock.find(service => service.id === id);
    
    return service;
}

export function addService(service) {
   
 servMock.push(service);
 return service;
}
export function updateService(id, updatedService) {
 const index = servMock.findIndex((servIndex) => servIndex.id === id);
 if(index !== -1){
    servMock[index] = {...servMock[index], ...updatedService}
    return servMock[index]
 }
 return null


}
  