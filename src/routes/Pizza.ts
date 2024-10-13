import express, { Request, Response } from "express";
import Pizza from "../controllers/Pizza";

const app = express();

app.get("/", async (req: Request, res: Response) => {
    try {
        const pizzas = await Pizza.getAll();
        res.status(200).send({ code: 200, pizzas });
    } catch (error) {
        console.error(error);
        res.status(500).send({ code: 500, message: "Error Interno" });
    }
});

// Exportar el app
export default app;
