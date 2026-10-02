import {describe, it, expect} from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("Testando as rotas de Serviços", () => {
    it("Deve retornar a lista de serviços da ordem de serviço", async () => {
        const response = await request(app).get("/api/services");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty("descricao");
        expect(response.body[0]).toHaveProperty("valor");
        expect(response.body[0]).toHaveProperty("ativo");
    })
    it("Deve criar um novo serviço",async()=>{
        const newService = {
            descricao: "Serviço de teste",
            valor: 100,
            ativo: true
        }
        const response = await request(app).post("/api/services").send(newService);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.descricao).toBe(newService.descricao);
        expect(response.body.valor).toBe(newService.valor);
        expect(response.body.ativo).toBe(newService.ativo);
    })
    it("Deve buscar os serviços pelo id", async () => {
        const response = await request(app).get("/api/services/1");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("descricao");
        expect(response.body).toHaveProperty("valor");
        expect(response.body).toHaveProperty("ativo");
    });
    it("Deve mostrar erro ao buscar serviço com id inexistente", async () => {
        const response = await request(app).get("/api/services/999");
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("error");
    })
    it("Deve atualizar o serviço pelo id", async () => {
        const updatedService = {
            descricao: "Serviço atualizado",
            valor: 200,
            ativo: false
        }
        const response = await request(app).put("/api/services/1").send(updatedService);
        expect(response.status).toBe(200);
        expect(response.body.descricao).toBe(updatedService.descricao);
        expect(response.body.valor).toBe(updatedService.valor);
        expect(response.body.ativo).toBe(updatedService.ativo);
    })
    it("Deve retornar erro ao atualizar serviço com id inexistente", async () => {
        const updatedService = {
            descricao: "Serviço atualizado",
            valor: 200,
            ativo: false
        }
        const response = await request(app).put("/api/services/999").send(updatedService);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    })
    it("Deve deletar o serviço pelo id", async () => {
        const response = await request(app).delete("/api/services/1");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
    })
    it("Deve retornar erro ao deletar serviço com id inexistente", async () => {
        const response = await request(app).delete("/api/services/999");
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    })




}); 
