//import mongoose from 'mongoose';

export interface IUser {
  name: string,
  username: string,
  id: string,
  passwordHash: string
}

export interface TrainingType {
  date: string,
  name: string,
}