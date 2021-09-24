import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "이름은 필수입력사항입니다."] },
    email: { type: String, required: [true, "이메일은 필수입력사항입니다."] },
    password: { type: String, required: [true, "비밀번호는 필수입력사항입니다."] },
    company: { type: String, required: [true, "회사는 필수입력사항입니다."] },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamp: true,
  }
);

// 해쉬 패스워드
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);

export default User;
