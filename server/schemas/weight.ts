import mongoose from 'mongoose';
import { parseString } from '../utils/parsers';

export interface Measures {
  calves?: number;
  arms?: number;
  chest?: number;
  legs?: number;
  waist?: number;
  neck?: number;
  hips?: number;
}

export type IWeight = {
  weight: number;
  date: Date;
  measures?: Measures;
};

const weightSchema = new mongoose.Schema({
  weight: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  measures: {
    required: false,
    type: {
      calves: {
        type: Number,
        required: false,
      },
      arms: {
        type: Number,
        required: false,
      },
      chest: {
        type: Number,
        required: false,
      },
      legs: {
        type: Number,
        required: false,
      },
      waist: {
        type: Number,
        required: false,
      },
      neck: {
        type: Number,
        required: false,
      },
      hips: {
        type: Number,
        required: false,
      },
    },
  },
});

weightSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = parseString(returnedObject._id);
    delete returnedObject.measures._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Weight = mongoose.model<IWeight>('Weight', weightSchema);

export default Weight;
