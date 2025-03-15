import { Lead } from '@/types/lead';

interface LeadListProps {
  leads: Lead[];
}

export default function LeadList({ leads }: LeadListProps) {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.firstName}</td>
              <td>{lead.lastName}</td>
              <td>{lead.email}</td>
              <td>
                <span className={`badge ${getStatusBadgeClass(lead.status)}`}>
                  {lead.status}
                </span>
              </td>
              <td>{new Date(lead.createdAt!).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case 'New':
      return 'bg-primary';
    case 'Engaged':
      return 'bg-warning';
    case 'Proposal Sent':
      return 'bg-info';
    case 'Closed-Won':
      return 'bg-success';
    case 'Closed-Lost':
      return 'bg-danger';
    default:
      return 'bg-secondary';
  }
}