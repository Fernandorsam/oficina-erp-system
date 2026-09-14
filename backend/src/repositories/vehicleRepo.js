let vehicleMock = [
    {
        id: 1,
        clienteId: 1,
        marca: "Toyota",
        modelo: "Camry",
         ano: 2020,
        cor: "Silver",
        placa: "ABC123"          
    }
]

export function listVehicles() {
    return vehicleMock;
}   
export function getVehicleById(id) {
    return vehicleMock.find(vehicle => vehicle.id === id);
}

export function createVehicle(vehicle) {
    vehicleMock.push(vehicle);
    return vehicle;
}

export function updateVehicle(id, updatedVehicle) {
    const index = vehicleMock.findIndex(vehicle => vehicle.id === id);
    if (index !== -1) {
        vehicleMock[index] = { ...vehicleMock[index], ...updatedVehicle };
        return vehicleMock[index];
    }
    return null;
}

export function deleteVehicle(id) {
    const index = vehicleMock.findIndex(vehicle => vehicle.id === id);
    if (index !== -1) {
        const deletedVehicle = vehicleMock.splice(index, 1);
        return deletedVehicle[0];
    }
    return null;
}
