import {Router} from "express"
import multer from "multer";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middleware/middleware";
import { ListUserController } from "../modules/accounts/useCases/listUser/ListUserController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const listUserController = new ListUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch("/avatar",ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);
usersRoutes.get("/",listUserController.handle);
export {usersRoutes};
