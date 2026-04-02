import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "student" }
  },
  { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof UserSchema>;

export const User: Model<UserDocument> =
  models.User || model<UserDocument>("User", UserSchema);
