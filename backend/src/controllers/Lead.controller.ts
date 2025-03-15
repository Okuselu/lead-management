import { Request, Response } from "express";
import LeadService from "../services/Lead.services";

class LeadController {
  // Create a new lead
  async createLead(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, email, status } = req.body;
      
      // Enhanced input validation
      if (!firstName || !lastName) {
        res.status(400).json({ 
          success: false, 
          message: "Both first name and last name are required" 
        });
        return;
      }

      if (!email) {
        res.status(400).json({ 
          success: false, 
          message: "Email address is required" 
        });
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ 
          success: false, 
          message: "Please provide a valid email address" 
        });
        return;
      }

      const newLead = await LeadService.createLead({ firstName, lastName, email, status });
      res.status(201).json({
        success: true,
        message: "Lead created successfully",
        data: newLead,
      });
    } catch (error: any) {
      if (error.code === 11000) {
        res.status(400).json({ 
          success: false, 
          message: "A lead with this email address already exists" 
        });
        return;
      }
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while creating the lead. Please try again." 
      });
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
