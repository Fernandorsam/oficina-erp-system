import clientService from "../services/clientService.js";

export function list(req, res) {
  const clients = clientService.listClients();
  res.json(clients);
}

export function create(req, res) {
  const clientData = req.body;
  const newClient = clientService.createClient(clientData);
  res.status(201).json(newClient);
}

export function getById(req, res) {
  const clientId = parseInt(req.params.id);
  const client = clientService.listarClientePorId(clientId);
  if (client) {
    res.status(200).json(client);
  } else {
    res.status(404).json({ message: "Client not found" });
  }
}

export function update(req, res) {
  const clientId = parseInt(req.params.id);
  const updatedData = req.body;
  const updatedClient = clientService.atualizarCliente(clientId, updatedData);
  if (updatedClient) {
    res.status(200).json(updatedClient);
  } else {
    res.status(404).json({ message: "Client not found" });
  }
}

export function del(req, res) {
    const clientId = parseInt(req.params.id);
    const deletedClient = clientService.deletarCliente(clientId);
    if (deletedClient) {
        res.status(200).json({ message: "Client deleted successfully"});
    } else {
        res.status(404).json({ message: "Client not found" });
    }   
}
