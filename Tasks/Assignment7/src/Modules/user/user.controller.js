import { Router } from "express";
import * as userService from "./user.service.js";

const router = Router();

router.post("/", userService.createUser);
router.get("/:userId", userService.getSingleUser);
router.get("/", userService.getAllUsers);
router.patch("/:userId", userService.updateUser);
router.delete("/:userId", userService.deleteUser);

export default router;
