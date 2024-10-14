import { Router } from 'express';
import { createPizza, getAll, getOne, update, remove } from '../controllers/Pizza';

const router = Router();

router.get("/", async (req, res) => {
  try {
    const pizzas = await getAll();
    res.status(200).send({ code: 200, pizzas });
  } catch (error) {
    console.error(error);
    res.status(500).send({ code: 500, message: "Error Interno" });
  }
});

router.get("/:pizzaId", async (req, res) => {
  try {
    const pizza = await getOne(req.params.pizzaId);
    res.status(200).send({ code: 200, pizza });
  } catch (error) {
    console.error(error);
    res.status(500).send({ code: 500, message: "Error Interno" });
  }
});

router.post("/", async (req, res) => {
  try {
    const pizzaId = await createPizza(req.body);
    res.status(200).send({ code: 200, pizzaId });
  } catch (error) {
    console.error(error);
    res.status(500).send({ code: 500, message: "Error Interno" });
  }
});

router.put("/:pizzaId", async (req, res) => {
  try {
    const pizzaId = await update(req.params.pizzaId, req.body);
    res.status(200).send({ code: 200, pizzaId });
  } catch (error) {
    console.error(error);
    res.status(500).send({ code: 500, message: "Error Interno" });
  }
});

router.delete("/:pizzaId", async (req, res) => {
  try {
    const removed = await remove(req.params.pizzaId);
    res.status(200).send({ code: 200, removed });
  } catch (error) {
    console.error(error);
    res.status(500).send({ code: 500, message: "Error Interno" });
  }
});

export default router;
