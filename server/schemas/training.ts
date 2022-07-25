import mongoose from 'mongoose';
import { parseString } from '../utils/parsers';

interface ITraining {
  date: string;
  name: string;
  exercises: string[];
  id: string;
  tags: string[];
  comments?: string;
}

const trainingSchema = new mongoose.Schema({
  date: Date,
  name: String,
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercises',
      default: [],
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  id: String,
  tags: [String],
  comments: String,
});

trainingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = parseString(returnedObject._id);
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Training = mongoose.model<ITraining>('Training', trainingSchema);

export default Training;
