import { Lead } from '@/types/lead';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050/api';

const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }
  return data.data;
};

export const leadService = {
  async getAllLeads(): Promise<Lead[]> {
    try {
      const response = await fetch(`${API_URL}/leads`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      return await handleResponse(response);
    } catch (error: unknown) {
      console.error('Error fetching leads:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to fetch leads: ${error.message}`);
      }
      throw new Error('Failed to fetch leads. Please check your connection and try again.');
    }
  },

  async createLead(lead: Omit<Lead, '_id' | 'createdAt'>): Promise<Lead> {
    try {
      const response = await fetch(`${API_URL}/leads`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(lead),
      });
      return await handleResponse(response);
    } catch (error: unknown) {
      console.error('Error creating lead:', error);
      if (error instanceof Error) {
        if (error.message.includes('email')) {
          throw new Error('A lead with this email already exists. Please use a different email address.');
        }
        throw new Error(`Failed to create lead: ${error.message}`);
      }
      throw new Error('Failed to create lead. Please try again.');
    }
  }
};