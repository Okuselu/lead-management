export type LeadStatus = "New" | "Engaged" | "Proposal Sent" | "Closed-Won" | "Closed-Lost";

export interface ILead {
  name: string;
  email: string;
  status: LeadStatus;
  createdAt?: Date;
}
