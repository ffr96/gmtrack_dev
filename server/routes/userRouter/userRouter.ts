import express from 'express';
import User from '../../schemas/users';
import bcrypt from 'bcrypt';
import logsRouter from './logsRouter/logsRouter';
import weightRouter from './weightRouter/weightRouter';

import { parseUser } from '../../utils/parseRequests';
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

router.post('/', (req, res) => {
  try {
    const userToAdd = parseUser({
      username: parseString(req.body.username),
      name: parseString(req.body.name),
      password: parseString(req.body.password),
    });

    const hashAndSave = async () => {
      const passwordHash = await bcrypt.hash(
        parseString(req.body.password),
        10
      );
      const user = new User({
        name: userToAdd.name,
        username: userToAdd.username,
        passwordHash: passwordHash,
      });
      const userSaved = await user.save();
      res.status(201).json(userSaved);
    };
    void hashAndSave();
  } catch (e) {
    res.status(400).end();
  }
});

router.use(validSession); // make sure every request from the routes below
// contain a valid token
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
