import {listVehicles,createVehicle,getVehicleById,updateVehicle,deleteVehicle} from '../repositories/vehicleRepo.js';
import { buscarClientePorId } from '../repositories/clientRepo.js';

class VehicleService {
    getVehicles() {
        return listVehicles();
    }  

    getVehicleById(id) {
        const vehicleId = parseInt(id);
        return getVehicleById(vehicleId);
    }
    
    addVehicle(vehicle) {
        const cliente = buscarClientePorId(vehicle.clienteId);
        if (!cliente) {
            throw new Error('Cliente nao encontrado');
        }
        return createVehicle(vehicle);
    }

    updateVehicle(id, updatedVehicle) {
        const vehicleId = parseInt(id);
        const existingVehicle = getVehicleById(vehicleId);
        if (!existingVehicle) {
            throw new Error('Veículo não encontrado');
        }
        return updateVehicle(vehicleId, updatedVehicle);
    }

    deleteVehicle(id) {
        const vehicleId = parseInt(id);
        const existingVehicle = getVehicleById(vehicleId);
        if (!existingVehicle) {
            throw new Error('Veículo não encontrado');
        }
        return deleteVehicle(vehicleId);
    }
    



}

const vehicleService = new VehicleService();
export default vehicleService; 






