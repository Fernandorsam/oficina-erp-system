import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe(" US-01-Vinculo entre OS e Serviços", () => {
  it("Deve Vincular um serviço existente a uma OS existente", async () => {
    const response = await request(app)
      .post("/api/os-service")
      .send({ osId: 1, serviceId: 1 });

    expect(response.status).toBe(201);
    expect(response.body.descricao).toBe("Serviço de Teste");
    expect(response.body.valor).toBe(100);
    expect(response.body.autorizado).toBe(false);
  });
  it("Deve retornar erro ao tentar vincular um serviço inexistente a uma OS existente", async () => {
    const response = await request(app)
      .post("/api/os-service")
      .send({ osId: 1, serviceId: 999 });

    expect(response.status).toBe(400);
  });
  it("Deve retornar erro ao tentar vincular um serviço existente a uma OS inexistente", async () => {
    const response = await request(app)
      .post("/api/os-service")
      .send({ osId: 999, serviceId: 1 });
    expect(response.status).toBe(400);
  });
  it("Deve retornar erro ao tentar vincular um serviço inexistente a uma OS inexistente", async () => {
    const response = await request(app)
      .post("/api/os-service")
      .send({ osId: 999, serviceId: 999 });
    expect(response.status).toBe(400);
  });
  it("Deve impedir a alteração de preço e da autorização do serviço vinculado a uma OS", async () => {
    const response = await request(app)
      .post("/api/os-service")
      .send({ osId: 1, serviceId: 1, valor: 2, descricao: "Serviço adulterado", autorizado: true });
    expect(response.status).toBe(201);
    expect(response.body.descricao).toBe("Serviço de Teste");
    expect(response.body.valor).toBe(100);
    expect(response.body.autorizado).toBe(false);
  });
});
