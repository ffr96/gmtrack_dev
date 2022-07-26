export interface User {
  id: string;
  username: string;
  token: string;
}

export type Measures = {
  calves?: number;
  arms?: number;
  chest?: number;
  legs?: number;
  waist?: number;
  neck?: number;
  hips?: number;
};

export type Weight = {
  weight: number;
  date: string;
  measures?: Measures;
  comments?: string;
};

export interface Exercises {
  name: string;
  reps: number[];
  sets: number;
  weight: number[];
  comments?: string;
  id: string;
}

export interface TrainingLog {
  name: string;
  date: string;
  exercises: Exercises[];
  id: string;
  comments?: string;
  tags?: string[];
}

export interface INotification {
  message: string;
  type: string;
  timer: number;
}

export interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export type Options = {
  value: string;
  label: string;
  isDisabled?: boolean;
};
