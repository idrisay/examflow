import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const DocumentUploadSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    title: { type: String, required: true },
    notes: { type: String, default: "" },
    mimeType: { type: String, required: true },
    fileName: { type: String, required: true },
    fileData: { type: Buffer, required: true },
    approved: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export type DocumentUploadDocument = InferSchemaType<typeof DocumentUploadSchema>;

export const DocumentUpload: Model<DocumentUploadDocument> =
  models.DocumentUpload ||
  model<DocumentUploadDocument>("DocumentUpload", DocumentUploadSchema);
