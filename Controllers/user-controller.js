import User from "../models/user-schema.js";
import bcryptjs from "bcryptjs";

export async function deleteUser(req, res) {
  await User.deleteMany({});
  res.send("Deleted successfully");
}
export async function getUser(req, res) {
  const id = req.params.id;
  const getuser = await User.findById({ _id: id });
  res.json({ user: getuser });
}

//Signup:
export async function Signup(req, res) {
  try {
    const { name, job, institution, email, password } = req.body;
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (err) {
      return console.log(err);
    }
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User aleady exists! Login instead" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const newUser = new User({
      name,
      job,
      institution,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(200).json({
      message: "Account created successfully",
      User: { newUser },
    });
  } catch (error) {
    console.log(error);
  }
}

//Login user:
export async function Login(req, res) {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({
      massage: "Invalid Credentials",
    });
  }
  const isPasswordCorrect = await bcryptjs.compare(
    password,
    existingUser.password
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid Credentials" });
  } else {
    return res.status(200).json({ message: "Login Successfull", existingUser });
  }
}

//Update user
export async function updateUser(req, res) {
  const id = req.params.id;
  console.log(id);
  const { name, job, institution, email } = req.body;
  console.log(req.body);
  try {
    const user = await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name,
          job,
          institution,
          email,
        },
      }
    );
    try {
      const getUser = await User.findById({ _id: id });
    } catch (error) {
      console.log(error);
    }

    return res.json({ message: "Updated successfully", user: getUser });
  } catch (error) {
    console.log(error);
  }
}
