import express, { Request } from 'express';

const router = express.Router();

router.get('/', (req: Request<{ userID: string }>, res) => {
  res.send('200');
});

export default router;
