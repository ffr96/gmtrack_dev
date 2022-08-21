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

router.post('/', (req, res) => {
  const fetchUser = async () => {
    const user = await User.findOne({
      username: parseString(req.body.username),
    });
    let usertoReturn;
    if (user) {
      const parsedUser: UserReceived = parseLogin({
        username: user.username,
        passwordHash: user.passwordHash,
        id: user.id,
      });
      const passwordIsCorrect = await bcrypt.compare(
        parseString(req.body.password),
        parsedUser.passwordHash
      );

      if (!passwordIsCorrect) {
        throw new Error('Invalid username or password');
      }

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
    } else {
      throw new Error('Invalid username or password');
    }
    return usertoReturn;
  };

  void fetchUser()
    .then((user) => {
      return res.send(user);
    })
    .catch((error) => {
      return res.status(400).json({ message: error.message as string });
    });
});

export default router;
