import express from 'express';
import { exercises } from '../schemas/exercisesDB';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(exercises);
});

export default router;
