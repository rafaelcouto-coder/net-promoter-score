import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';

import CreateConnection from '../database'

describe("Users", () => {
    beforeAll(async () => {
        const connection =  await CreateConnection();
        await connection.runMigrations();
    });

    afterAll(async() => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/users")
        .send({
            email: "user@exemple.com",
            name: "User Exemple"
        });

        expect(response.status).toBe(201)
    })

    it("Should not be able to create a user with exists mail", async () => {
        const response = await request(app).post("/users")
        .send({
            email: "user@exemple.com",
            name: "User Exemple"
        });

        expect(response.status).toBe(400)
    })
});