import expressAsyncHandler from "express-async-handler";
import User from "../../models/user.model.js";

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, company } = req?.body;

  // 사용자가 이미 존재하는 경우
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) throw new Error("이미 존재하는 이메일입니다.");

  try {
    const user = await User.create({ name, email, password, company });
    res.status(200).json(user);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

export const fetchUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
});
