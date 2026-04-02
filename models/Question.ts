import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const QuestionSchema = new Schema(
  {
    examSlug: { type: String, required: true, index: true },
    prompt: { type: String, required: true },
    type: { type: String, required: true },
    options: [{ type: String }],
    answer: { type: String, required: true },
    explanation: { type: String, required: true }
  },
  { timestamps: true }
);

export type QuestionDocument = InferSchemaType<typeof QuestionSchema>;

export const Question: Model<QuestionDocument> =
  models.Question || model<QuestionDocument>("Question", QuestionSchema);
