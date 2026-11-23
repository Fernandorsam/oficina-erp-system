import partService from "../services/partService.js";

export const getParts = (req, res) => {
  try {
    const listParts = partService.getParts();
    res.status(200).json(listParts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getPartById = (req, res) => {
  try {
    const partId = parseInt(req.params.id);
    const part = partService.getPartById(partId);
    res.status(200).json(part);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const addPart = (req, res) => {
  try {
    const partData = req.body;
    const newPart = partService.addPart(partData);
    res.status(201).json(newPart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const updatePart = (req, res) => {
  try {
    const partId = parseInt(req.params.id);
    const updatedPart = req.body;
    const part = partService.updatePart(partId, updatedPart);

    res.status(200).json(part);
  } catch (error) {
    if (error.message.includes("not found")) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};
export const deletePart = (req, res) => {
  try {
    const partId = parseInt(req.params.id);
    partService.deletePart(partId);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
