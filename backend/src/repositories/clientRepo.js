let clientMock = [
        {"id": 1,
        "name": "John Doe",
         "email": "john.doe@example.com",
        "telefone": "123-456-7890",
        "endereço" : "123 Main St, Anytown, USA",
        "cpf":"123.456.789-00",
        "cidade":"Anytown",
        "bairro":"Centro",
        "estado":"SP",
        "cep":"12345-678",
        "numero":"123",
        "createdAt": Date.now(),
        "updatedAt": Date.now()
    }
     ]
       


export function listarClientes() {
    return clientMock;
}

export function criarCliente(cliente) {
    clientMock.push(cliente);
    return cliente;

}

export function buscarClientePorId(id) {
    return clientMock.find(cliente => cliente.id === id);
}

export function atualizarCliente(id, dadosAtualizados) {
    const index = clientMock.findIndex(cliente => cliente.id === id);
    if (index !== -1) {
        clientMock[index] = { ...clientMock[index], ...dadosAtualizados, updatedAt: Date.now() };
        return clientMock[index];
    }  
}
    
    export function deletarCliente(id) {
        const index = clientMock.findIndex(cliente => cliente.id === id);
        if (index !== -1) {
            const deletedClient = clientMock.splice(index, 1);
            return deletedClient[0];
           
        }   
    }


