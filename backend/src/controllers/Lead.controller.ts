import { Request, Response } from "express";
import LeadService from "../services/Lead.services";

class LeadController {
  // Create a new lead
  async createLead(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, status } = req.body;
      const newLead = await LeadService.createLead({ name, email, status });

      res.status(201).json({
        success: true,
        message: "Lead created successfully",
        data: newLead,
      });
      return
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Get all leads
  async getAllLeads(req: Request, res: Response): Promise<void> {
    try {
      const leads = await LeadService.getAllLeads();
      res.status(200).json({ success: true, data: leads });
      return
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new LeadController();
