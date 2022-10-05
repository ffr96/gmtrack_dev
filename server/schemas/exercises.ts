import mongoose from 'mongoose';
import { parseString } from '@/utils/parsers';

export interface IExercises {
  name: string;
  reps: number[];
  sets: number;
  weight: number[];
  comments?: string;
}

const exercisesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  reps: [
    {
      type: Number,
      required: true,
    },
  ],
  sets: {
    type: Number,
    required: true,
  },
  weight: [Number],
  comments: String,
});

exercisesSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = parseString(returnedObject._id);
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

const Exercises = mongoose.model<IExercises>('Exercises', exercisesSchema);

export default Exercises;
