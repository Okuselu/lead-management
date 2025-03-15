import LeadModel from "../models/Lead.model";
import { ILead } from "../interfaces/Lead.interface";

class LeadService {
  // Create a new lead
  async createLead(data: ILead): Promise<ILead> {
    return await LeadModel.create(data);
  }

  // Fetch all leads
  async getAllLeads(): Promise<ILead[]> {
    return await LeadModel.find();
  }
}

export default new LeadService();
