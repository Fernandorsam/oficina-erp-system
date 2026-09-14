import { getById } from "../controllers/clientController.js";
import { listarClientes, criarCliente, buscarClientePorId,atualizarCliente,deletarCliente} from "../repositories/clientRepo.js";

class ClientService {

    listClients() {
        return listarClientes();
    }
   
    
  
   createClient(clientData) {
       const newClient = {
           id : Date.now(),
           name: clientData.name,
           email: clientData.email,
           telefone: clientData.telephone,
           endereço: clientData.endereço,
           cpf: clientData.cpf,
           cidade: clientData.cidade,
           bairro: clientData.bairro,
           estado: clientData.estado,
           cep: clientData.cep,
           numero: clientData.numero
       };
    
   
   criarCliente(newClient);
    return newClient;
     
}

 listarClientePorId(id) {
        return buscarClientePorId(id);}



atualizarCliente(id, dadosAtualizados) {
    return atualizarCliente(id, dadosAtualizados);
}

deletarCliente(id) {
    return deletarCliente(id);
}

}
const clientService = new ClientService();
export default clientService;