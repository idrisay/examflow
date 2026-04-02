import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const AttemptSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    examId: { type: String, required: true },
    score: { type: Number, required: true },
    answers: [
      {
        questionId: { type: String, required: true },
        answer: { type: String, required: true },
        correct: { type: Boolean, required: true }
      }
    ]
  },
  { timestamps: true }
);

export type AttemptDocument = InferSchemaType<typeof AttemptSchema>;

export const Attempt: Model<AttemptDocument> =
  models.Attempt || model<AttemptDocument>("Attempt", AttemptSchema);
