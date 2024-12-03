import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const channelSchema = new Schema({
  username: {
    type: String, required: true, lowercase: true, unique: true
  },
  userId: {
    type: Number, required: true, unique: true
  },
  name: {
    type: String, required: true
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
  deletedAt: {
    type: Date
  }
},
  {
    timestamps: true
  });

const Channel = model('Channel', channelSchema)
export default Channel