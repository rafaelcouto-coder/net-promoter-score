import request from 'supertest';
import { app } from '../app';

import CreateConnection from '../database'

describe("Surveys", () => {
    beforeAll(async () => {
        const connection =  await CreateConnection();
        await connection.runMigrations();
    });

    it("Should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys")
        .send({
            title: "title exemplo",
            description: "description Exemple"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id")
    });

    it("Should be ale to get all surveys", async () => {
        await request(app).post("/surveys")
        .send({
            title: "title exemplo",
            description: "description Exemple"
        });

        const response = await request(app).get("/surveys");
        expect(response.body.length).toBe(2);
    })

});