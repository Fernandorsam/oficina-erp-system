import {listVehiclesRepo,createVehicleRepo,getVehicleByIdRepo,updateVehicleRepo,deleteVehicleRepo} from '../repositories/vehicleRepo.js';
import { buscarClientePorId } from '../repositories/clientRepo.js';

class VehicleService {
    getVehicles() {
        return listVehiclesRepo();
    }  

    getVehicleById(id) {
        const vehicleId = parseInt(id);
        return getVehicleByIdRepo(vehicleId);
    }
    
    addVehicle(vehicle) {
        const cliente = buscarClientePorId(vehicle.clienteId);
        if (!cliente) {
            throw new Error('Cliente nao encontrado');
        }
        return createVehicleRepo(vehicle);
    }

    updateVehicle(id, updatedVehicle) {
        const vehicleId = parseInt(id);
        const existingVehicle = getVehicleById(vehicleId);
        if (!existingVehicle) {
            throw new Error('Veículo não encontrado');
        }
        return updateVehicleRepo(vehicleId, updatedVehicle);
    }

    deleteVehicle(id) {
        const vehicleId = parseInt(id);
        const existingVehicle = getVehicleById(vehicleId);
        if (!existingVehicle) {
            throw new Error('Veículo não encontrado');
        }
        return deleteVehicleRepo(vehicleId);
    }
    



}

const vehicleService = new VehicleService();
export default vehicleService; 






