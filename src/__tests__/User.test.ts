import request from 'supertest';
import { app } from '../app';

import CreateConnection from '../database'

describe("Users", () => {
    beforeAll(async () => {
        const connection =  await CreateConnection();
        await connection.runMigrations();
    });

    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/users")
        .send({
            email: "user@exemple.com",
            name: "User Exemple"
        });

        expect(response.status).toBe(201)
    })
});