import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
	{
		email: {
			type: String,
			unique: true,
			lowercase: true,
			match:
				/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
		},
		userId: {
			type: Number,
			required: true,
			unique: true,
		},

		balance: {
			type: Number,
			default: 0,
		},

		name: {
			type: String,
			required: true,
		},

		type: {
			type: String,
			enum: ["admin", "user", "creator"],
			default: "user",
		},
		language: {
			type: String,
			default: "en",
		},
		isPremium: {
			type: Boolean,
			default: false,
		},
		//NOTE: You can change the gender options acc. to your needs in the app.
		gender: {
			type: String,
			enum: ["male", "female", "other"],
		},
		countryCode: {
			type: String,
		},
		timezone: {
			type: Number,
		},
		birthDate: {
			type: Date,
		},
		photoUrl: {
			type: String,
			default: "/userProfile.png",
		},
		isActivated: {
			type: Boolean,
			default: true,
		},
		isBanned: {
			type: Boolean,
			default: false,
		},
		banReason: {
			type: String,
		},
		isVerified: {
			type: Boolean,
			required: false,
		},
		deviceId: {
			type: String,
		},
		platform: {
			type: String,
			enum: ["Android", "IOS", "Web"],
			required: false,
		},
		deletedAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

const User = model("User", userSchema);
export default User;
