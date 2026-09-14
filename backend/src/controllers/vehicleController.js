import vehicleService from '../services/vehicleService.js';

export function listVehicles(req, res) {
    const vehicles = vehicleService.getVehicles();
    res.json(vehicles);
}

export function listVehicleById(req, res) {
    const { id } = req.params;
    const vehicle = vehicleService.getVehicleById(id);
    if (!vehicle) {
        return res.status(404).json({ error: 'Veículo não encontrado' });
    }
    res.json(vehicle);
}

export function createVehicle(req, res) {

    try {
         const vehicle = req.body;
         const newVehicle = vehicleService.addVehicle(vehicle);
         res.status(201).json(newVehicle);
        
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
   
}   

export function updateVehicle(req, res) {
    const { id } = req.params;
    const updatedVehicle = req.body;
    try {
        const vehicle = vehicleService.updateVehicle(id, updatedVehicle);
        res.json(vehicle);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export function deleteVehicle(req, res) {
    const { id } = req.params;
    try {
        const deletedVehicle = vehicleService.deleteVehicle(id);
        res.json(deletedVehicle);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

