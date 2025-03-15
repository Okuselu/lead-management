import { Lead } from '@/types/lead';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050/api';

export const leadService = {
  async getAllLeads(): Promise<Lead[]> {
    try {
      const response = await fetch(`${API_URL}/leads`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch leads');
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
  },

  async createLead(lead: Omit<Lead, '_id' | 'createdAt'>): Promise<Lead> {
    try {
      const response = await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lead),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create lead');
      }

      return data.data;
    } catch (error: any) {
      if (error.message.includes('email')) {
        throw new Error('A lead with this email already exists. Please use a different email address.');
      }
      throw error;
    }
  }
};