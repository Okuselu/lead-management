export type LeadStatus = "New" | "Engaged" | "Proposal Sent" | "Closed-Won" | "Closed-Lost";

export interface Lead {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  status: LeadStatus;
  createdAt?: Date;
}