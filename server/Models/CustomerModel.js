import { Double } from "mongodb";
import mongoose from "mongoose";

const CustomerSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  civilNo: {
    type: Number,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  customerType: {
    type: String,
    required: true,
  },
  numAdults: {
    type: Number,
    required: true,
  },
  numChildren: {
    type: Number,
    required: true,
  },
  celebrationType: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// ✅ Prevent same date+time double bookings
CustomerSchema.index({ date: 1, time: 1 }, { unique: true });

const CustomerModel = mongoose.model("farmcustomers", CustomerSchema);

export default CustomerModel;
