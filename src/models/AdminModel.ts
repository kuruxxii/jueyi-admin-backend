import mongoose from "mongoose";
const { Schema, model } = mongoose;
import type { Admin } from "../lib/definitions";

const adminSchema = new Schema<Admin>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const AdminModel = model("Admin", adminSchema);
