import express from "express";
import { userRoutes } from "../modules/User/user.route";
import path from "path";
import { AdminRoutes } from "../modules/admin/admin.route";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { SpecialtiesRoutes } from "../modules/specialties/specialties.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/specialties",
    route: SpecialtiesRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
