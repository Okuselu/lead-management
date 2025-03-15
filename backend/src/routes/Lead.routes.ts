import express from "express";
import LeadController from "../controllers/Lead.controller";

const router = express.Router();

router.post("/leads", LeadController.createLead);
router.get("/leads", LeadController.getAllLeads);

export default router;
