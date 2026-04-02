import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const SupportContributionSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    message: { type: String, default: "" },
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

export type SupportContributionDocument = InferSchemaType<
  typeof SupportContributionSchema
>;

export const SupportContribution: Model<SupportContributionDocument> =
  models.SupportContribution ||
  model<SupportContributionDocument>(
    "SupportContribution",
    SupportContributionSchema
  );
