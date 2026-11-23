import {
  getPartsRepo,
  getPartByIdRepo,
  createPartRepo,
  updatePartRepo,
  deletePartRepo,
} from "../repositories/partRepo.js";

class PartService {
  getParts() {
    return getPartsRepo();
  }
  getPartById(id) {
    const partID = Number(id);
    const part = getPartByIdRepo(partID);
    if (!part) {
      throw new Error(`Part with ID ${partID} not found.`);
    }
    return part;
  }
  addPart(partData) {
    if (
      partData === null ||
      typeof partData !== "object" ||
      Array.isArray(partData)
    ) {
      throw new Error("Part data must be a valid object");
    }

    if (typeof partData.nome !== "string" || partData.nome.trim() === "") {
      throw new Error("Part name is required");
    }
    if (typeof partData.codigo !== "string" || partData.codigo.trim() === "") {
      throw new Error("Part code is required");
    }
    if (
      typeof partData.fabricante !== "string" ||
      partData.fabricante.trim() === ""
    ) {
      throw new Error("Part manufacturer is required");
    }
    if (!Number.isFinite(partData.valorCompra) || partData.valorCompra < 0) {
      throw new Error("Part purchase value must be a non-negative number.");
    }
    if (!Number.isFinite(partData.valorVenda) || partData.valorVenda < 0) {
      throw new Error("Part sale value must be a non-negative number.");
    }
    if (partData.valorVenda < partData.valorCompra) {
      throw new Error("Part sale value cannot be lower than purchase value.");
    }
    if (
      !(
        Number.isFinite(partData.quantidade) &&
        Number.isInteger(partData.quantidade)
      ) ||
      partData.quantidade < 0
    ) {
      throw new Error("Part quantity must be a non-negative number");
    }
    const normalizedPartData = {
      ...partData,
      nome: partData.nome.trim(),
      fabricante: partData.fabricante.trim(),
      codigo: partData.codigo.trim(),
    };
    const existingPart = getPartsRepo().some(
      (part) =>
        part.codigo.trim().toLowerCase() ===
        normalizedPartData.codigo.toLowerCase(),
    );
    if (existingPart) {
      throw new Error("Part with the same code already exists");
    }
    const parts = getPartsRepo();
    const nextId =
      parts.length > 0 ? Math.max(...parts.map((part) => part.id)) + 1 : 1;
    const newPart = {
      ...normalizedPartData,
      id: nextId,
    };
    return createPartRepo(newPart);
  }
  updatePart(id, updateData) {
    const partID = Number(id);
    const part = getPartByIdRepo(partID);
    if (!part) {
      throw new Error(`Part with ID ${partID} not found.`);
    }
    if (
      updateData.nome !== undefined &&
      (typeof updateData.nome !== "string" || updateData.nome.trim() === "")
    ) {
      throw new Error("Part name cannot be empty or whitespace.");
    }
    if (
      updateData.fabricante !== undefined &&
      (typeof updateData.fabricante !== "string" ||
        updateData.fabricante.trim() === "")
    ) {
      throw new Error("Part manufacturer cannot be empty or whitespace.");
    }
    if (
      updateData.codigo !== undefined &&
      (typeof updateData.codigo !== "string" || updateData.codigo.trim() === "")
    ) {
      throw new Error("Part code cannot be empty or whitespace.");
    }
    if (
      updateData.valorCompra !== undefined &&
      (!Number.isFinite(updateData.valorCompra) || updateData.valorCompra < 0)
    ) {
      throw new Error("Part purchase value must be a non-negative number.");
    }
    if (
      updateData.valorVenda !== undefined &&
      (!Number.isFinite(updateData.valorVenda) || updateData.valorVenda < 0)
    ) {
      throw new Error("Part sale value must be a non-negative number.");
    }
    const valorCompra = updateData.valorCompra ?? part.valorCompra;
    const valorVenda = updateData.valorVenda ?? part.valorVenda;
    if (valorVenda < valorCompra) {
      throw new Error("Part sale value cannot be lower than purchase value.");
    }
    if (
      updateData.quantidade !== undefined &&
      (!(
        Number.isFinite(updateData.quantidade) &&
        Number.isInteger(updateData.quantidade)
      ) ||
        updateData.quantidade < 0)
    ) {
      throw new Error("Part quantity must be a non-negative integer.");
    }
    const codigo = updateData.codigo ?? part.codigo;
    if (
      getPartsRepo().some(
        (p) =>
          p.codigo.toLowerCase() === codigo.toLowerCase() && p.id !== partID,
      )
    ) {
      throw new Error("Another part with the same code already exists");
    }
    return updatePartRepo(partID, updateData);
  }
  deletePart(id) {
    const partID = Number(id);
    this.getPartById(partID);
    return deletePartRepo(partID);
  }
}

const partService = new PartService();
export default partService;
