import { Router, Request, NextFunction } from 'express';
import Training from '@/schemas/training';
import Exercises from '@/schemas/exercises';
import User from '@/schemas/users';
import config from '@/config/config';
import {
  parseString,
  parseStringArray,
  parseNumberArray,
  parseNumber,
} from '@/utils/parsers';
import { sameUser } from '@/mdw/sameUser';
import { validId } from '@/mdw/validId';

const router = Router({ mergeParams: true });

/**
 *  Make sure authorized requests are performed only on the
 *  user that holds the token
 */

router.use(sameUser);

/**
 * Gets training logs of user by id
 */

router.get('/', async (req: Request<{ userID: string }>, res) => {
  const trainingLog = await Training.find({ user: req.params.userID })
    .populate('exercises')
    .sort({ date: -1 })
    .skip(Number(req.query.page) * config.perPage)
    .limit(req.query.page ? config.perPage : 0);

  if (trainingLog) {
    return res.send(trainingLog);
  } else {
    return res.sendStatus(404);
  }
});

/**
 * Gets training logs by log id
 */

router.get(
  '/:id',
  validId,
  async (req: Request<{ userID: string; id: string }>, res) => {
    const trainingLog = await Training.findOne({
      _id: req.params.id,
      user: req.params.userID,
    }).populate('exercises');
    if (trainingLog) {
      return res.send(trainingLog);
    } else {
      return res.sendStatus(404);
    }
  }
);

/**
 * Creates an empty log training on a given user id
 */

router.post(
  '/',
  async (req: Request<{ userID: string }>, res, next: NextFunction) => {
    const user = await User.findById(req.params.userID);
    if (user) {
      const comment = req.body.comments
        ? parseString(req.body.comments)
        : undefined;
      const name = req.body.name
        ? parseString(req.body.name)
        : 'Unnamed training';
      if (!req.body.tags || !req.body.date) return next({ message: 'invalid' });

      const log = new Training({
        user: req.params.userID,
        name: name,
        date: parseString(req.body.date),
        tags: parseStringArray(req.body.tags),
        comments: comment,
      });

      const savedLog = await log.save();
      res.send(savedLog);
    } else {
      return res.sendStatus(500);
    }
  }
);

/**
 * Adds exercises to a training log, requires userid and
 * trainingid
 */

router.post(
  '/:logsID',
  (req: Request<{ userID: string; logsID: string }>, res) => {
    try {
      const logID = req.params.logsID;
      const comment = req.body.comments
        ? parseString(req.body.comments)
        : undefined;
      const exercises = new Exercises({
        name: parseString(req.body.name),
        reps: parseNumberArray(req.body.reps),
        sets: parseNumber(req.body.sets),
        weight: parseNumberArray(req.body.weight),
        comments: comment,
      });

      exercises
        .save()
        .then(async (exercisesReceived) => {
          await Training.findByIdAndUpdate(
            logID,
            {
              $push: { exercises: parseString(exercisesReceived.id) },
            },
            { new: true }
          ).populate('exercises');
          res.json(exercisesReceived).status(200);
        })
        .catch(() => {
          res.status(400).json({ message: 'Error adding exercise' });
        });
    } catch (e) {
      res.status(400).json({ message: 'Invalid exercise information' });
    }
  }
);

/**
 * Deletes all of the exercises and then the training log of
 * a given user, requires userid and traininglogid
 */

router.delete(
  '/:logsID',
  (req: Request<{ userID: string; logsID: string }>, res) => {
    Training.findById(req.params.logsID)
      .then((logs) => {
        if (logs) {
          const excID = logs.exercises;
          if (excID.length > 0) {
            excID.forEach((id) => void Promise.resolve(clearExercises(id)));
          }
        }
      })
      .catch(() => res.status(400));

    Training.findByIdAndDelete(req.params.logsID)
      .then((id) => {
        res.status(200).send(id);
      })
      .catch(() => {
        res.status(400).end();
      });
  }
);

const clearExercises = async (id: string) => {
  await Exercises.findByIdAndDelete(id);
};

export default router;
