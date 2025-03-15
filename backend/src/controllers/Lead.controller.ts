import { Request, Response } from "express";
import LeadService from "../services/Lead.services";

class LeadController {
  // Create a new lead
  async createLead(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, email, status } = req.body;
      
      // Add request body logging for debugging
      console.log('Request body:', req.body);

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

      const newLead = await LeadService.createLead({ firstName, lastName, email, status });
      res.status(201).json({
        success: true,
        message: "Lead created successfully",
        data: newLead,
      });
    } catch (error: any) {
      console.error('Error creating lead:', error);
      res.status(500).json({ 
        success: false, 
        message: error.message || "Internal server error" 
      });
    }
  }

  async getAllLeads(req: Request, res: Response): Promise<void> {
    try {
      const leads = await LeadService.getAllLeads();
      res.status(200).json({ success: true, data: leads });
    } catch (error: any) {
      console.error('Error fetching leads:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new LeadController();
