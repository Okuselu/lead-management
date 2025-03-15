import mongoose, { Schema, Document } from "mongoose";

// Define the possible status values for a lead
export type LeadStatus = "New" | "Engaged" | "Proposal Sent" | "Closed-Won" | "Closed-Lost";

// Define the TypeScript interface for a lead document
export interface ILead extends Document {
  name: string;
  email: string;
  status: LeadStatus;
  createdAt: Date;
}

// Define the Mongoose schema for the lead model
const LeadSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: { 
      type: String, 
      enum: ["New", "Engaged", "Proposal Sent", "Closed-Won", "Closed-Lost"], 
      default: "New" 
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Mongoose model
const Lead = mongoose.model<ILead>("Lead", LeadSchema);
export default Lead;
