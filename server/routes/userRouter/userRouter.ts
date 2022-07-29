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

router.get('/:id', (req, res) => {
  const fetchUser = async () => {
    return await User.findById(req.params.id);
  };

  void fetchUser()
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      res.status(404).send("Can't find user").end();
      console.error(`@user-router : ${e.message}`);
    });
});

/**
 * Creates a new user
 */

router.post('/', async (req, res, next) => {
  try {
    const passwordHash = await bcrypt.hash(parseString(req.body.password), 10);
    const user = new User({
      name: req.body.name as string,
      username: req.body.username as string,
      passwordHash: passwordHash,
    });
    const userSaved = await user.save();
    res.status(201).json(userSaved);
  } catch (e) {
    if (e.code === 11000)
      return res.status(400).json({ message: 'Username already in use' });
    return next(e);
  }
});

router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  console.log(user);
  res.sendStatus(200);
});

router.use(validSession);
/**
 *  Makes sure every request from the routes below
 *  contain a valid token
 * */
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
