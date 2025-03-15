import { useState } from 'react';
import { Lead, LeadStatus } from '@/types/lead';

interface LeadFormProps {
  onSubmit: (lead: Omit<Lead, '_id' | 'createdAt'>) => Promise<void>;
}

export default function LeadForm({ onSubmit }: LeadFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    status: 'New' as LeadStatus,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({ firstName: '', lastName: '', email: '', status: 'New' });
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            className="form-select"
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as LeadStatus })}
          >
            <option value="New">New Lead</option>
            <option value="Engaged">Engaged in Discussion</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Closed-Won">Deal Won</option>
            <option value="Closed-Lost">Deal Lost</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add Lead
        </button>
      </div>
    </form>
  );
}