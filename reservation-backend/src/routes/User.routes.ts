import { UserController } from "../controllers/User.controller";
import { Router } from "express";

export const UserRoutes = Router();

UserRoutes.post("/createuser", new UserController().createUsers);
UserRoutes.get("/getallusers", new UserController().getAllUsers);
UserRoutes.get("/getuserbyid/:id", new UserController().getUsersById);
UserRoutes.put("/updateuser/:id", new UserController().updateUserById);
UserRoutes.delete("/deleteuser/:id", new UserController().deleteUserById);


