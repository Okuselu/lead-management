import mongoose, { Schema, Document } from "mongoose";
import { LeadStatus } from "../interfaces/Lead.interface";

export interface ILeadDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  status: LeadStatus;
  createdAt: Date;
}

const LeadSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    status: { 
      type: String, 
      enum: ["New", "Engaged", "Proposal Sent", "Closed-Won", "Closed-Lost"], 
      default: "New" 
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model<ILeadDocument>("Lead", LeadSchema);
export default Lead;
