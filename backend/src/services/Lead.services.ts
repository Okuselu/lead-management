import LeadModel from "../models/Lead.model";
import { ILead } from "../interfaces/Lead.interface";

class LeadService {
  // Create a new lead
  async createLead(data: Omit<ILead, 'createdAt'>): Promise<ILead> {
    return await LeadModel.create(data) as unknown as ILead;
  }

  // Fetch all leads
  async getAllLeads(): Promise<ILead[]> {
    return await LeadModel.find().lean() as ILead[];
  }
}

export default new LeadService();
