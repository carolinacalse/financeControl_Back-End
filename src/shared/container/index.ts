import {container} from "tsyringe";
import { UsersRepository } from "../../modules/accounts/repositories/implementation/implementation";

import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { ITypeExpenseRepository } from "../../modules/expense/repositories/TypeExpense/ITypeExpenseRepository";
import { TypeExpenseRepository } from "../../modules/expense/repositories/implementation/TypeExpense/TypeExpenseRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ITypeExpenseRepository>(
  "TypeExpenseRepository",
  TypeExpenseRepository
);
