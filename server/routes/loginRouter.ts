import User from '../schemas/users';
import jwt from 'jsonwebtoken';
import express from 'express';
import bcrypt from 'bcrypt';
import config from '../config/config';
import { parseLogin } from '../utils/parseRequests';
import { parseString } from '../utils/parsers';

const router = express.Router();

interface UserReceived {
  username: string;
  passwordHash: string;
  id: string;
}

/**
 * Perform a login
 */

router.post('/', async (req, res) => {
  let usertoReturn;
  const user = await User.findOne({
    username: parseString(req.body.username),
  });

  if (user) {
    const parsedUser: UserReceived = parseLogin({
      username: user.username,
      passwordHash: user.passwordHash,
      id: user.id,
    });

    /**
     * Compare password provided by request to password stored on the db
     */

    const passwordIsCorrect = await bcrypt.compare(
      parseString(req.body.password),
      parsedUser.passwordHash
    );

    if (!passwordIsCorrect) {
      return res.status(404).json({ message: 'Invalid username or password' });
    }

    /**
     *  Password are the same (ie. username/password provided is correct)
     *  so a token is created and returned to the user
     */

    const userForToken = {
      username: parsedUser.username,
      id: parsedUser.id,
    };

    const SECRET = parseString(config.SECRET);
    const token = jwt.sign(userForToken, SECRET);
    usertoReturn = {
      token: token,
      username: parsedUser.username,
      id: parsedUser.id,
    };
    return res.send(usertoReturn);
  } else {
    return res.status(404).json({ message: 'Invalid username or password' });
  }
});

export default router;
