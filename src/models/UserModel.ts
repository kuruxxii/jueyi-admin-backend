import mongoose from "mongoose";
const { Schema, model } = mongoose;
import type { User } from "../lib/definitions";

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  number: { type: String, required: true, unique: true },
  subscription: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
});

export const UserModel = model("User", userSchema);

userSchema.methods.isSubscriptionActive = function () {
  const now = new Date(); // Get the current date and time
  return now <= this.subscription.endDate;
};
