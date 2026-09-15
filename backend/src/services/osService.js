import {listOS,createOS,getOSById,updateOS} from '../repositories/osRepo.js';
import {buscarClientePorId} from '../repositories/clientRepo.js';
import {getVehicleById} from '../repositories/vehicleRepo.js';

class OSservice {

    getOS() {
        return listOS();    
    }

    getOSById(id) {
        const os = getOSById(id);
        if (!os) {
            throw new Error(`Ordem de Serviço com ID ${id} não encontrada.`);
        }       
        return os;
    }


    createOS(os) {
        const cliente = buscarClientePorId(os.clienteId);
        if (!cliente) {
            throw new Error(`Cliente com ID ${os.clienteId} não encontrado.`);
        }
        const veiculo = getVehicleById(os.veiculoId);
        if (!veiculo) {
            throw new Error(`Veículo com ID ${os.veiculoId} não encontrado.`);
        }

        if(os.clienteId !== veiculo.clienteId) {
            throw new Error(`O veículo com ID ${os.veiculoId} não pertence ao cliente com ID ${os.clienteId}.`);
        }
        
        const id = Date.now();
        const novaOS = {
            id : id,
            clienteId: os.clienteId,
            veiculoId: os.veiculoId,
            status : "ABERTA",
            numero : `OS${id}`,
            dataAbertura: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
          
        }


             return createOS(novaOS);
    }

    updateOS(id, updatedOS) {
        const os = getOSById(id);
        if (!os) {
            throw new Error(`Ordem de Serviço com ID ${id} não encontrada.`);
        }
        return updateOS(id,{status: updatedOS.status});
    }

}


const osService = new OSservice();
export default osService;


