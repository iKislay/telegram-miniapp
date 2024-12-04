import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const channelSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  userId: {
    type: Number, required: true, unique: true
  },
  owner: {
    type: Schema.Types.ObjectId, ref: "User"
  },
  name: {
    type: String, required: true
  },
  photoUrl: {
    type: String,
    default:
      '/channelProfile.png',
  },
  description: {
    type: String,
    maxlength: 500,
  },
  category: {
    type: String,
    enum: ['Hacking', 'Coding', 'Betting', 'Adult', 'Marketplace', 'Giveaway', 'Politics', 'Entertainment', 'Education & Resources'],
    required: true
  },
  tags: {
    type: [String], // Keywords to help categorize the channel
  },

  //NOTE: To check whether the account is active or not. When user deletes the account, you can store the information anonymously.
  isActivated: {
    type: Boolean,
    default: true,
  },
  pricing: {
    type: {
      type: String,
      enum: ['hourly post', 'permanent post'],
      default: 'hourly post'
    },
    amount: {
      type: Number,
    },
    currency: {
      type: String,
      default: "USD",
    },
  },
  // stats
  stats: {
    followersCount: {
      type: Number,
      default: 0,
    },
    lastActive: {
      type: Date,
    },
  },
  analytics: {
    growthRate: {
      type: Number, 
    },
    averageEngagement: {
      type: Number,
    },
    topCountries: {
      type: [String],
    },
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