import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const ExamSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    provider: { type: String, required: true },
    level: { type: String, required: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    description: { type: String, required: true },
    isPremium: { type: Boolean, default: false },
    questionCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export type ExamDocument = InferSchemaType<typeof ExamSchema>;

export const Exam: Model<ExamDocument> =
  models.Exam || model<ExamDocument>("Exam", ExamSchema);
