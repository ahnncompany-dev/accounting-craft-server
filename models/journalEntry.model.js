import mongoose from "mongoose";

const JournalEntry = mongoose.model(
  "journalEntry",
  mongoose.Schema({
    company: String,
    documentType: String,
    documentNumber: String,
    documentDate: String,
    partner: String,
    project: String,
    paymentType: String,
    bank: String,
    description: String,
    debit: [{ account: String, amount: Number }],
    credit: [{ account: String, amount: Number }],
    transactions: [{ product: String, quantity: Number }],
    recordDate: { type: Date, default: new Date() },
    user: String,
  })
);

export default JournalEntry;
