import express from 'express';
import User from '../../schemas/users';
import bcrypt from 'bcrypt';
import logsRouter from './logsRouter/logsRouter';
import weightRouter from './weightRouter/weightRouter';

import { parseString } from '../../utils/parsers';
import { validSession } from '../../mdw/validSession';

const router = express.Router();

/**
 * Gets user by id
 */

router.get('/:id', validSession, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) return res.json(user);
  return res.sendStatus(404);
});

/**
 * Creates a new user
 */

router.post('/', async (req, res, next) => {
  try {
    const passwordHash = await bcrypt.hash(parseString(req.body.password), 10);
    const user = new User({
      username: parseString(req.body.username),
      email: parseString(req.body.email),
      passwordHash: passwordHash,
    });
    const userSaved = await user.save();
    res.json(userSaved);
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({ message: 'Username already in use' });
    }
    return next('invalid');
  }
});

router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});

router.use(validSession); // Check for valid token
router.use('/:userID/logs', logsRouter);
router.use('/:userID/weight', weightRouter);

//id => {
//  void Exercises.findByIdAndDelete(id)
//    .then(id =>{
//      console.log(`trying to delete ${id}`);
//    })
//    .catch(e => {
//      res.status(400).send(e).end();
//    });
//}

export default router;
