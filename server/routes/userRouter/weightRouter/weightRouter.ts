import express, { Request } from 'express';
import User from '../../../schemas/users';
import Weight from '../../../schemas/weight';

const router = express.Router({ mergeParams: true });

/**
 * Get all the weight data of a user.
 */

router.get('/', async (req: Request<{ userID: string }>, res) => {
  console.log(req.params.userID);
  const user = await User.findById(req.params.userID).populate('weight');
  if (user) {
    return res.send(user.weight);
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
});

/**
 * Submit weight data of a user, save it to the server
 * and append the id to the user's weight reference.
 */

router.post('/', async (req: Request<{ userID: string }>, res, next) => {
  const user = await User.findById(req.params.userID);
  if (user) {
    try {
      const weight = new Weight(req.body);
      const response = await weight.save();
      user.weight.push(response.id);
      await user.save();
      return res.json(req.body);
    } catch (e) {
      return next(e);
    }
  } else {
    return res.sendStatus(404);
  }
});

export default router;
