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
describe("US-02-autorização individual de serviços", () =>{
  it("Deve autorizar um serviço vinculado a uma OS", async () => {
    const vinculo = await request(app)
     .post("/api/os-service")
     .send({ osId: 1, serviceId: 1 });

    const response = await request(app)
      .put(`/api/os-service/${vinculo.body.id}/authorization`)
      .send({ autorizado: true });

    expect(response.status).toBe(200);
    expect(response.body.autorizado).toBe(true);
  });
  it("Deve revogar a autorização de um serviço vinculado a uma OS", async () => {
    const vinculo = await request(app)
      .post("/api/os-service")
      .send({ osId: 1, serviceId: 1 });

      const autorização = await request(app)
      .put(`/api/os-service/${vinculo.body.id}/authorization`)
      .send({ autorizado: true });

      expect(autorização.status).toBe(200);
      expect(autorização.body.autorizado).toBe(true);

      const revogação = await request(app)
      .put(`/api/os-service/${vinculo.body.id}/authorization`)
      .send({ autorizado: false });

      expect(revogação.status).toBe(200);
      expect(revogação.body.autorizado).toBe(false);
  });
it("Deve alterar somente a autorização, preservando os demais dados do vínculo", async () => {
  const vinculo = await request(app)
    .post("/api/os-service")
    .send({ osId: 1, serviceId: 1 });

  const response = await request(app)
    .put(`/api/os-service/${vinculo.body.id}/authorization`)
    .send({ autorizado: true });

  expect(response.status).toBe(200);

  expect(response.body).toMatchObject({
    ...vinculo.body,
    autorizado: true,
  });
});

it.each([
  ["texto",{autorizado : "true"}],
  ["número",{autorizado : 1}],
  ["nulo",{autorizado : null}],
  ["campos ausentes",{}],

])(
  "deve rejeitar autorização com valor inválido(%s)",
  async(_tipo,body)=>{
    const vinculo = await request(app)
    .post("/api/os-service")
    .send({ osId: 1, serviceId: 1 }); 

     const response = await request(app)
     .put(`/api/os-service/${vinculo.body.id}/authorization`)
      .send(body);

      expect(response.status).toBe(400);

  }
)
it("Deve retornar  404 ao tentar autorizar um vinculo inesxistente", async () => {
  const response = await request(app)
    .put(`/api/os-service/999/authorization`)
    .send({ autorizado: true });
    expect(response.status).toBe(404);

});




});
