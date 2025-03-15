import { Lead } from '@/types/lead';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050/api';

const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Network response was not ok');
  }
  return data.data;
};

export const leadService = {
  async getAllLeads(): Promise<Lead[]> {
    try {
      const response = await fetch(`${API_URL}/leads`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw new Error('Failed to fetch leads. Please check your connection and try again.');
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
      return await handleResponse(response);
    } catch (error) {
      if (error.message.includes('email')) {
        throw new Error('A lead with this email already exists. Please use a different email address.');
      }
      throw new Error('Failed to create lead. Please try again.');
    }
  }
};