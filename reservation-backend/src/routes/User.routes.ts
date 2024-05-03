import { UserController } from "../controllers/User.controller";
import { ServiceController } from "../controllers/Service.controller";
import { Router } from "express";

export const UserRoutes = Router();

UserRoutes.post("/createuser", new UserController().createUsers);
UserRoutes.get("/getallusers", new UserController().getAllUsers);
UserRoutes.get("/getuserbyid/:id", new UserController().getUsersById);
UserRoutes.get("/getuserbyemail/:email", new UserController().getUsersByEmail);
UserRoutes.put("/updateuser/:id", new UserController().updateUserById);
UserRoutes.delete("/deleteuser/:id", new UserController().deleteUserById);
UserRoutes.post("/login", new UserController().LoginUser);

//Service Routes
UserRoutes.post("/createservice", new ServiceController().createServices);



