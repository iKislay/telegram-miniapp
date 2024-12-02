import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  username: {
    type: String, required: true, lowercase: true, unique: true
  },
  name: {
    type: String, required: true
  },
  /*NOTE: If you are using admin panel and controllers specific to admin panel,
      you can control the authority of users with the help of this field.*/
  type: {
    type: String,
    enum: ['admin', 'user', 'reader', 'creator'],
    default: 'user',
  },
  language: {
    type: String,
    default: 'en',
  },
  isPremium: {
    type: Boolean, default: false
  },
  //NOTE: You can change the gender options acc. to your needs in the app.
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  countryCode: {
    type: String,
  },
  timezone: {
    type: Number
  },
  birthDate: {
    type: Date
  },
  photoUrl: {
    type: String,
    default:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png',
  },
  //NOTE: To check whether the account is active or not. When user deletes the account, you can store the information anonymously.
  isActivated: {
    type: Boolean,
    default: true,
  },
  //NOTE: To check whether the user skipped the email-verification step or not. You can delete the unverified accounts day by day.
  isVerified: {
    type: Boolean,
    required: false
  },
  deviceId: {
    type: String,
  },
  //NOTE: You can add more options acc. to your need.
  platform: {
    type: String,
    enum: ['Android', 'IOS'],
    required: false
  },
  //NOTE: In case the user delete its account, you can store its non-personalized information anonymously.
  deletedAt: {
    type: Date
  }
},
  {
    timestamps: true
  });

const User = model('User', userSchema)
export default User