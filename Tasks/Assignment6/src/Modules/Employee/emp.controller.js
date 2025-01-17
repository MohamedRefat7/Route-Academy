import { Router } from "express";
import * as empService from "./emp.service.js";

const router = Router();

router.post("/", empService.createEmp);
router.get("/:empId", empService.getEmp);
router.get("/", empService.getAllEmp);
router.patch("/:empId", empService.updateEmp);
router.delete("/:empId", empService.deleteEmp);

export default router;
