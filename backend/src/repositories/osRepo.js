let osMock =[
    {
        id: 1,
        numero: "OS001",
        clienteId: 1,
        veiculoId: 1,
        status: "ABERTA",
        dataAbertura: "2023-06-01T10:00:00Z",
        createdAt: "2023-06-01T10:00:00Z",
        updatedAt: "2023-06-01T10:00:00Z"
    }
]

export function listOS() {
    return osMock;
} 

export function getOSById(id) {
    return osMock.find(os => os.id === id);
}

export function createOS(os) {
    osMock.push(os);
    return os;
}  

export function updateOS(id, updatedOS) {
    const index = osMock.findIndex(os => os.id === id);
    if (index !== -1) {
        osMock[index] = { ...osMock[index], ...updatedOS };
        return osMock[index];
    }   
    return null
     
}
 