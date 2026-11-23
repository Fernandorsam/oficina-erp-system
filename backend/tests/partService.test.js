import { describe, it, expect } from "vitest";
import partService from "../src/services/partService.js";

describe("testando validações do partService", () => {
  it("Deve rejeitar os Dados nulos ao cadastrar uma peça", () => {
    expect(() => partService.addPart(null)).toThrow(
      "Part data must be a valid object",
    );
  });
  it("Deve rejeitar arrays ao cadastrar uma peça", () => {
    expect(() => partService.addPart([])).toThrow(
      "Part data must be a valid object",
    );
  });
  it("Deve rejeitar uma peça sem nome", () => {
    const partData = {
      nome: "",
      codigo: "ABC123",
      fabricante: "Fabricante X",
      valorCompra: 10.5,
      valorVenda: 15.0,
      quantidade: 5,
    };
    expect(() => partService.addPart(partData)).toThrow(
      "Part name is required",
    );
  });
  it("Deve rejeitar uma peça sem informar o nome", () => {
    const partData = {
      codigo: "TESTE-024",
      fabricante: "Bosch",
      valorCompra: 50,
      valorVenda: 80,
      quantidade: 5,
    };
    expect(() => partService.addPart(partData)).toThrow(
      "Part name is required",
    );
  });
  it("Deve rejeitar uma peça com nome composto apenas por espaços", () => {
    const partData = {
      nome: "   ",
      codigo: "ABC123",
      fabricante: "Fabricante X",
      valorCompra: 10.5,
      valorVenda: 15.0,
      quantidade: 5,
    };
    expect(() => partService.addPart(partData)).toThrow(
      "Part name is required",
    );
  });
  it("Deve rejeitar uma peça sem código", () => {
    const partData = {
      nome: "Peça A",
      codigo: "",
      fabricante: "Fabricante X",
      valorCompra: 10.5,
      valorVenda: 15.0,
      quantidade: 5,
    };
    expect(() => partService.addPart(partData)).toThrow(
      "Part code is required",
    );
  });
  it("Deve rejeitar uma peça com codigos compostos apenas por espaços", () => {
    const partData = {
      nome: "Peça A",
      codigo: "   ",
      fabricante: "Fabricante X",
      valorCompra: 10.5,
      valorVenda: 15.0,
      quantidade: 5,
    };
    expect(() => partService.addPart(partData)).toThrow(
      "Part code is required",
    );
  });
  it("Deve rejeitar uma peça sem informar o input código", () => {
    const partData = {
      nome: "Filtro de óleo",
      fabricante: "Bosch",
      valorCompra: 50,
      valorVenda: 80,
      quantidade: 5,
    };
    expect(() => partService.addPart(partData)).toThrow(
      "Part code is required",
    );
  });
  it("Deve rejeitar uma peça sem fabricante", () => {
    const partData = {
      nome: "Peça A",
      codigo: "ABC123",
      fabricante: "",
      valorCompra: 10.5,
      valorVenda: 15.0,
      quantidade: 5,
    };
    expect(() => partService.addPart(partData)).toThrow(
      "Part manufacturer is required",
    );
  });
  it("Deve rejeitar uma peça sem informar o input fabricante", () => {
    const partData = {
      nome: "Filtro de óleo",
      codigo: "TESTE-025",
      valorCompra: 50,
      valorVenda: 80,
      quantidade: 5,
    };
    expect(() => partService.addPart(partData)).toThrow(
      "Part manufacturer is required",
    );
  });
  it("Deve rejeitar uma peça com fabricante composto apenas por espaços", () => {
    const partData = {
      nome: "Peça A",
      codigo: "ABC123",
      fabricante: "   ",
      valorCompra: 10.5,
      valorVenda: 15.0,
      quantidade: 5,
    };
    expect(() => partService.addPart(partData)).toThrow(
      "Part manufacturer is required",
    );
  });
  it("Deve rejeitar uma peça com valor de compra negativo", () => {
    const partData = {
      nome: "Peça A",
      codigo: "ABC123",
      fabricante: "Fabricante X",
      valorCompra: -10.5,
      valorVenda: 15.0,
      quantidade: 5,
    };
    expect(() => partService.addPart(partData)).toThrow(
      "Part purchase value must be a non-negative number.",
    );
  });
  it("Deve rejeitar uma peça com valor da compra não numérico", () => {
    const partData = {
      nome: "Peça A",
      codigo: "ABC123",
      fabricante: "Fabricante X",
      valorCompra: "dez",
      valorVenda: 15.0,
      quantidade: 5,
    };
    expect(() => partService.addPart(partData)).toThrow(
      "Part purchase value must be a non-negative number.",
    );
  });
  it("Deve aceitar valor de compra igual a zero", () => {
    const partData = {
      nome: "Peça de teste",
      codigo: "TESTE-026",
      fabricante: "Bosch",
      valorCompra: 0,
      valorVenda: 50,
      quantidade: 5,
    };
    const newPart = partService.addPart(partData);
    expect(newPart.valorCompra).toBe(0);
  });
  it("Deve rejeitar uma peça com valor da venda negativo", () => {
    const partData = {
      nome: "Peça A",
      codigo: "ABC123",
      fabricante: "Fabricante X",
      valorCompra: 10.5,
      valorVenda: -15.0,
      quantidade: 5,
    };
    expect(() => partService.addPart(partData)).toThrow(
      "Part sale value must be a non-negative number.",
    );
  });
  it("Deve rejeitar o valor da venda que não seja numérico", () => {
    const partData = {
      nome: "Peça A",
      codigo: "ABC123",
      fabricante: "Fabricante X",
      valorCompra: 10.5,
      valorVenda: "quinze",
      quantidade: 5,
    };
    expect(() => partService.addPart(partData)).toThrow(
      "Part sale value must be a non-negative number",
    );
  });
  it("Deve aceitar valor de venda igual a zero", () => {
    const partData = {
      nome: "Peça de teste",
      codigo: "TESTE-027",
      fabricante: "Bosch",
      valorCompra: 0,
      valorVenda: 0,
      quantidade: 5,
    };
    const newPart = partService.addPart(partData);
    expect(newPart.valorVenda).toBe(0);
  });
  it("Deve rejeitar a quantidade negativa", () => {
    const partData = {
      nome: "Peça A",
      codigo: "ABC123",
      fabricante: "Fabricante X",
      valorCompra: 10.5,
      valorVenda: 15.0,
      quantidade: -5,
    };
    expect(() => partService.addPart(partData)).toThrow(
      "Part quantity must be a non-negative number",
    );
  });
  it("Deve rejeitar quantidade  decimal", () => {
    const partData = {
      nome: "Filtro de óleo",
      codigo: "TESTE-010",
      fabricante: "Nakata",
      valorCompra: 50,
      valorVenda: 80,
      quantidade: 5.5,
    };
    expect(() => partService.addPart(partData)).toThrow(
      "Part quantity must be a non-negative number",
    );
  });
  it("Deve rejeitar quantidade que não seja número", () => {
    const partData = {
      nome: "Filtro de óleo",
      codigo: "TESTE-011",
      fabricante: "Nakata",
      valorCompra: 50,
      valorVenda: 80,
      quantidade: "dez",
    };
    expect(() => partService.addPart(partData)).toThrow(
      "Part quantity must be a non-negative number",
    );
  });
  it("Deve aceitar quantidade igual a zero na atualização", () => {
    const partData = {
      nome: "Filtro de óleo",
      codigo: "TESTE-028",
      fabricante: "Bosch",
      valorCompra: 30,
      valorVenda: 50,
      quantidade: 10,
    };
    const newPart = partService.addPart(partData);
    const updatedPart = partService.updatePart(newPart.id, {
      quantidade: 0,
    });
    expect(updatedPart.quantidade).toBe(0);
  });
  it("Deve cadastrar uma peça com dados válidos", () => {
    const partData = {
      nome: "Filtro de óleo",
      codigo: "TESTE-012",
      fabricante: "Nakata",
      valorCompra: 50,
      valorVenda: 80,
      quantidade: 10,
    };
    const newPart = partService.addPart(partData);
    expect(newPart).toHaveProperty("id");
    expect(newPart.nome).toBe(partData.nome);
    expect(newPart.codigo).toBe(partData.codigo);
    expect(newPart.fabricante).toBe(partData.fabricante);
    expect(newPart.valorCompra).toBe(partData.valorCompra);
    expect(newPart.valorVenda).toBe(partData.valorVenda);
    expect(newPart.quantidade).toBe(partData.quantidade);
  });
  it("Deve aceitar uma peça com quantidade igual a zero", () => {
    const partData = {
      nome: "Filtro de ar",
      codigo: "TESTE-013",
      fabricante: "Nakata",
      valorCompra: 40,
      valorVenda: 65,
      quantidade: 0,
    };
    const newPart = partService.addPart(partData);
    expect(newPart).toHaveProperty("id");
    expect(newPart.quantidade).toBe(0);
  });
  it("Deve remover espaços no inicio e no fim dos campos textuais", () => {
    const partData = {
      nome: " Filtro de ar ",
      codigo: " TESTE-014 ",
      fabricante: " Nakata ",
      valorCompra: 40,
      valorVenda: 65,
      quantidade: 0,
    };
    const newPart = partService.addPart(partData);

    expect(newPart.nome).toBe("Filtro de ar");
    expect(newPart.codigo).toBe("TESTE-014");
    expect(newPart.fabricante).toBe("Nakata");
  });
  it("Deve rejeitar um cadastro com codigo da peça duplicado", () => {
    const duplicatedPart = {
      nome: "Filtro de ar",
      codigo: "TESTE-014",
      fabricante: "Nakata",
      valorCompra: 40,
      valorVenda: 65,
      quantidade: 0,
    };
    expect(() => partService.addPart(duplicatedPart)).toThrow(
      "Part with the same code already exists",
    );
  });
  it("Deve rejeitar código duplicado mesmo com letras minúsculas", () => {
    const duplicatedPart = {
      nome: "Filtro de ar",
      codigo: "teste-014",
      fabricante: "Bosch",
      valorCompra: 40,
      valorVenda: 65,
      quantidade: 5,
    };
    expect(() => partService.addPart(duplicatedPart)).toThrow(
      "Part with the same code already exists",
    );
  });
  it("Deve rejeitar uma peça com valor de venda inferior ao valor de compra", () => {
    const partData = {
      nome: "Filtro de óleo",
      codigo: "TESTE-016",
      fabricante: "Nakata",
      valorCompra: 50,
      valorVenda: 40,
      quantidade: 10,
    };
    expect(() => partService.addPart(partData)).toThrow(
      "Part sale value cannot be lower than purchase value.",
    );
  });
  it("Deve rejeitar a atualização do valor de venda menor que valor de compra", () => {
    const partData = {
      nome: "Pastilha de freio",
      codigo: "TESTE-017",
      fabricante: "Nakata",
      valorCompra: 50,
      valorVenda: 80,
      quantidade: 10,
    };
    const newPart = partService.addPart(partData);
    expect(() =>
      partService.updatePart(newPart.id, { valorVenda: 40 }),
    ).toThrow("Part sale value cannot be lower than purchase value.");
  });
  it("Deve rejeitar a atualização do valor de compra maior que valor de venda", () => {
    const partData = {
      nome: "Pastilha de freio",
      codigo: "TESTE-018",
      fabricante: "Nakata",
      valorCompra: 50,
      valorVenda: 80,
      quantidade: 10,
    };
    const newPart = partService.addPart(partData);
    expect(() =>
      partService.updatePart(newPart.id, {
        valorCompra: 85,
      }),
    ).toThrow("Part sale value cannot be lower than purchase value.");
  });
  it("Deve excluir uma peça existente", () => {
    const partData = {
      nome: "Pastilha de freio",
      codigo: "TESTE-019",
      fabricante: "Nakata",
      valorCompra: 50,
      valorVenda: 80,
      quantidade: 10,
    };
    const newPart = partService.addPart(partData);
    const deletePart = partService.deletePart(newPart.id);
    expect(deletePart.id).toBe(newPart.id);
    expect(deletePart.codigo).toBe("TESTE-019");
    expect(() => partService.getPartById(newPart.id)).toThrow(
      `Part with ID ${newPart.id} not found.`,
    );
  });
  it("Deve impedir uma exclusão de peça inesxistente ", () => {
    expect(() => partService.deletePart(9854)).toThrow(
      `Part with ID 9854 not found`,
    );
  });
  it("Deve listar as peças cadastradas", () => {
    const partA = partService.addPart({
      nome: "Filtro de combustível",
      codigo: "TESTE-020",
      fabricante: "Nakata",
      valorCompra: 30,
      valorVenda: 50,
      quantidade: 5,
    });
    const partB = partService.addPart({
      nome: "Filtro de cabine",
      codigo: "TESTE-021",
      fabricante: "Bosch",
      valorCompra: 40,
      valorVenda: 65,
      quantidade: 8,
    });
    const parts = partService.getParts();

    expect(Array.isArray(parts)).toBe(true);
    expect(parts).toContain(partA);
    expect(parts).toContain(partB);
  });
  it("Deve buscar uma peça existente pelo ID", () => {
    const partData = {
      nome: "Disco de freio",
      codigo: "TESTE-022",
      fabricante: "Bosch",
      valorCompra: 100,
      valorVenda: 150,
      quantidade: 4,
    };
    const newPart = partService.addPart(partData);
    const foundPart = partService.getPartById(newPart.id);

    expect(foundPart).toEqual(newPart);
    expect(foundPart.id).toBe(newPart.id);
    expect(foundPart.codigo).toBe("TESTE-022");
  });
  it("Deve lançar erro ao buscar uma peça inexistente", () => {
    expect(() => partService.getPartById(9854)).toThrow(
      "Part with ID 9854 not found.",
    );
  });
  it("Deve atualizar uma peça existente", () => {
    const partData = {
      nome: "Filtro de óleo",
      codigo: "TESTE-023",
      fabricante: "Tecfil",
      valorCompra: 30,
      valorVenda: 50,
      quantidade: 10,
    };

    const newPart = partService.addPart(partData);

    const updateData = {
      nome: "Filtro de óleo atualizado",
      valorCompra: 35,
      valorVenda: 60,
      quantidade: 15,
    };

    const updatedPart = partService.updatePart(newPart.id, updateData);
    expect(updatedPart.nome).toBe("Filtro de óleo atualizado");
    expect(updatedPart.valorCompra).toBe(35);
    expect(updatedPart.valorVenda).toBe(60);
    expect(updatedPart.quantidade).toBe(15);
    expect(updatedPart.codigo).toBe("TESTE-023");
  });
  it("Deve lançar erro ao atualizar uma peça inexistente", () => {
    const updateData = {
      nome: "Peça inexistente",
    };
    expect(() => partService.updatePart(9854, updateData)).toThrow(
      "Part with ID 9854 not found.",
    );
  });
});
