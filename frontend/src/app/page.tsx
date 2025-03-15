'use client';

import { useEffect, useState } from 'react';
import { Lead } from '@/types/lead';
import { leadService } from '@/services/leadService';
import LeadForm from '@/components/LeadForm';
import LeadList from '@/components/LeadList';

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const loadLeads = async () => {
    setIsLoading(true);
    try {
      const data = await leadService.getAllLeads();
      setLeads(data);
    } catch (err) {
      setError('Failed to load leads');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLead = async (newLead: Omit<Lead, '_id' | 'createdAt'>) => {
    try {
      await leadService.createLead(newLead);
      await loadLeads();
      setError(''); // Clear any existing errors
    } catch (err: any) {
      setError(err.message || 'Failed to add lead');
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Lead Management</h1>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
          <button 
            type="button" 
            className="btn-close float-end" 
            onClick={() => setError('')}
          />
        </div>
      )}

      <div className="row">
        <div className="col-md-4">
          <LeadForm onSubmit={handleAddLead} />
        </div>
        <div className="col-md-8">
          {isLoading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <LeadList leads={leads} />
          )}
        </div>
      </div>
    </div>
  );
}
