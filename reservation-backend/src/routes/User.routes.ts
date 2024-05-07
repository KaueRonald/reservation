import { UserController } from "../controllers/User.controller";
import { ServiceController } from "../controllers/Service.controller";
import { ScheduleController } from "../controllers/Schedule.controller";
import { Router } from "express";

export const UserRoutes = Router();

UserRoutes.post("/createuser", new UserController().createUsers);
UserRoutes.get("/getallusers", new UserController().getAllUsers);
UserRoutes.get("/getuserbyid/:id", new UserController().getUsersById);
UserRoutes.put("/updateuser/:id", new UserController().updateUserById);
UserRoutes.delete("/deleteuser/:id", new UserController().deleteUserById);
UserRoutes.post("/login", new UserController().LoginUser);

//Service Routes
UserRoutes.post("/createservice", new ServiceController().createServices);
UserRoutes.get("/getallservices", new ServiceController().getAllServices);
UserRoutes.get("/getservice/:id", new ServiceController().getServicesById);
UserRoutes.put("/updateservice/:id", new ServiceController().updateServiceById);
UserRoutes.delete("/deleteservice/:id", new ServiceController().deleteServiceById);

//Schedule Routes
UserRoutes.post("/createschedule", new ScheduleController().createSchedule);
UserRoutes.get("/getallschedules", new ScheduleController().GetAllSchedules);
UserRoutes.get("/getschedule/:id", new ScheduleController().GetScheduleById);
UserRoutes.put("/updateschedule/:id", new ScheduleController().UpdateScheduleById);
UserRoutes.delete("/deleteschedule/:id", new ScheduleController().DeleteScheduleById);
