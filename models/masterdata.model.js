import mongoose from "mongoose";

const Company = mongoose.model(
  "company",
  new mongoose.Schema({
    companyCode: String,
    companyName: String,
    taxCode: String,
    address: String,
    tel: String,
    email: String,
    description: String,
  })
);

const Partner = mongoose.model(
  "partner",
  new mongoose.Schema({
    partnerCode: String,
    partnerName: String,
    partnerType: String,
    taxCode: String,
    bankAccount: String,
    address: String,  
    tel: String,
    email: String,
    description: String,
  })
);

const Project = mongoose.model(
  "project",
  new mongoose.Schema({
    projectCode: String,
    projectName: String,    
    description: String,
  })
);

const Account = mongoose.model(
  "account",
  new mongoose.Schema({
    accountCode: String,
    accountName: String,
    accountCategory: String,
    posting: Boolean,
    accountGroup: String,    
    description: String,
  })
);

const Product = mongoose.model(
  "product",
  new mongoose.Schema({
    productCode: String,
    productName: String,
    productType: String,
    tax: String,
    cost: Number,
    price: Number,
    description: String,
  })
);

const Bank = mongoose.model(
  "bank",
  new mongoose.Schema({
    bankCode: String,
    bankName: String,    
    description: String,
  })
);

export { Company, Partner, Project, Account, Product, Bank };
