import { Router } from "express";
import { getRepository } from "typeorm";
import { TypeExpenses } from "../modules/expense/entities/TypeExpense";
import { CreateTypeExpenseController } from "../modules/expense/useCases/TypeExpense/createTypeExpense/createTypeExpenseController";
import { ListTypeExpenseController } from "../modules/expense/useCases/TypeExpense/listTypeExpense/ListTypeExpenseController";
import { UpdateTypeExpenseController } from "../modules/expense/useCases/TypeExpense/updateTypeExpense/updateTypeExpenseController";

const typeExpenseRoutes = Router ();

const createTypeExpenseController = new CreateTypeExpenseController();
const listTypeExpenseController = new ListTypeExpenseController();
const updateTypeExpenseController = new UpdateTypeExpenseController();


typeExpenseRoutes.post("/", createTypeExpenseController.handle);

typeExpenseRoutes.get("/",listTypeExpenseController.handle);

typeExpenseRoutes.put("/edit",updateTypeExpenseController.handle);

typeExpenseRoutes.get("/view/:id",  async (request, response) => {
  try {
    const {id} = request.params;
    const typeExpenseRepository = getRepository(TypeExpenses)
    const typeExpense = await typeExpenseRepository.createQueryBuilder("tf")
    .where("tf.typeExpense_id = :id", {id})
    .getOne();

    return response.json(typeExpense);

  } catch (error) {

  }
})

typeExpenseRoutes.put("/cancel", async (request, response) => {
  try {
    const {id, user} = request.body;
    const typeExpenseRepository = getRepository(TypeExpenses)

    const typeExpense = await typeExpenseRepository.createQueryBuilder("tf")
    .where("tf.typeExpense_id = :id", {id})
    .getOne();

    const typeExpenseCancel = {
      ...typeExpense,
      cancel_date: new Date(),
      cancel_user: user,
      cancel: "Y"
    }
    await typeExpenseRepository.save(typeExpenseCancel);
    return response.send("Cancel");

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeExpenseRoutes.get("/list/active", async (request, response) => {
  try {
    const typeExpenseRepository = getRepository(TypeExpenses)

    const typeExpense = await typeExpenseRepository.createQueryBuilder("tf")
    .orderBy("tf.docNum", "DESC")
    .where("tf.cancel = 'N'")
    .getRawMany()

    return response.json(typeExpense);

  } catch (error) {
    return response.status(400).json({error})
  }
});

typeExpenseRoutes.get("/numTypeExpense", async (request, response) => {
  try {

      const typeExpenseRepository = getRepository(TypeExpenses);
      const typeExpense = await typeExpenseRepository.createQueryBuilder("tf")
      .orderBy("tf.typeExpense_id", "DESC")
      .where("tf.cancel = 'N'")
      .limit(1)
      .getRawMany()

      return response.json(typeExpense);
  } catch (error) {
      return response.status(400).json({ error })
  }
})


export {typeExpenseRoutes};
