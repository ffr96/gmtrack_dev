import express, { Request } from 'express';
import config from '../../../config/config';
import User from '../../../schemas/users';
import Weight from '../../../schemas/weight';

const router = express.Router({ mergeParams: true });

/**
 * Get all the weight data of a user.
 */

router.get('/', async (req: Request<{ userID: string }>, res) => {
  let date;
  const filter: Record<string, Record<string, Date> | string> = {
    user: req.params.userID,
  };
  if (req.query.from) {
    date = { $gt: new Date(req.query.from as string) };
  }
  if (req.query.to) {
    date = { ...date, $lt: new Date(req.query.to as string) };
  }
  if (date) {
    filter['date'] = date;
  }

  console.log(filter);
  const weight = await Weight.find(filter)
    .populate('weight')
    .sort({ date: -1 })
    .skip(Number(req.query.page) * config.perPage)
    .limit(req.query.page ? config.perPage : 0);
  if (weight) {
    return res.send(weight);
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
      const weight = new Weight({ ...req.body, user: req.params.userID });
      const response = await weight.save();
      user.weight.push(response.id);
      await user.save();
      return res.json(weight);
    } catch (e) {
      console.log(e);
      return next(e);
    }
  } else {
    return res.sendStatus(404);
  }
});

export default router;
