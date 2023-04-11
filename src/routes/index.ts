import {Router} from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { usersRoutes } from "./users.routes";
import { typeExpenseRoutes } from "./typeExpense.routes";

const router = Router();
router.use("/users", usersRoutes);
router.use("/typeExpense", typeExpenseRoutes);
router.use(authenticateRoutes)

export {router};
