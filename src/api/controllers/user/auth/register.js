import { User } from '../../../../models/index.js';

export default async (req, res) => {
  
  const exists = await User.exists({ username: req.body.username })
  .catch((err) => {
    return res.status(500).json({message: "Faild to register user", success: false});
  });

  if (exists) return res.status(409).json({message: "User already exists", success: false});

  let user = new User({
    email: req.body.email,
    name: req.body.name,
    username: req.body.username,
    language: req.body.language,
    platform: req.body.platform,
    isPremium: req.body.isPremium,
    timezone: req.body.timezone,
    lastLogin: Date.now()
  });

  user = await user.save().catch((err) => {
    return res.status(500).json({message: "Faild to register user", success: false});
  });

  return res.status(200).json({
    message: "Successfully registered user",
    success: true
  });
};