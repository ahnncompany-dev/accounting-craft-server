import mongoos from "mongoose";

const dbConnect = async () => {
  try {
    await mongoos.connect(process.env.ACCOUNTINGCRAFT_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DB Connected Successfully `);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

export default dbConnect;
