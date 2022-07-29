import mongoose from 'mongoose';
import { IUser } from '../types/User';
import { parseString } from '../utils/parsers';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  weight: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Weight',
      default: [],
    },
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = parseString(returnedObject._id);
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
