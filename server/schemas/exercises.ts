import mongoose from 'mongoose';

export interface IExercises {
  name: string,
  reps: number[],
  sets: number,
  weight: number[],
  comments?: string,
}

const exercisesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  reps: [{
    type: Number,
    required: true,
  }],
  sets: {
    type: Number,
    required: true,
  },
  weight: [Number],
  comments: String
});

exercisesSchema.set('toJSON', {
  transform: (document,transformedObject) => {
   delete transformedObject.__v;
   delete transformedObject._id;
  }
});

const Exercises = mongoose.model<IExercises>('Exercises', exercisesSchema);

export default Exercises;