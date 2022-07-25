import { Router, Request, NextFunction } from 'express';
import Training from '../../../schemas/training';
import Exercises from '../../../schemas/exercises';
import User from '../../../schemas/users';
import {
  parseString,
  parseStringArray,
  parseNumberArray,
  parseNumber,
} from '../../../utils/parsers';
const router = Router({ mergeParams: true });

/**
 * Gets training logs of user by id
 */

router.get('/', (req: Request<{ userID: string }>, res) => {
  void Training.find({ user: req.params.userID })
    .populate('exercises')
    .then((trainingLog) => {
      if (trainingLog) {
        res.send(trainingLog);
      } else {
        res.status(404).json({ message: 'Training not found' });
      }
    })
    .catch(() => res.status(400).end());
});

/**
 * Creates an empty log training on a given user id
 */

router.post(
  '/',
  (req: Request<{ userID: string }>, res, next: NextFunction) => {
    void User.findById(req.params.userID)
      .then((user) => {
        if (!user) throw new Error();
        const comment = req.body.comments
          ? parseString(req.body.comments)
          : undefined;
        const name = req.body.name
          ? parseString(req.body.name)
          : 'Unnamed training';
        if (!req.body.tags || !req.body.date) return next('invalid');

        const log = new Training({
          user: req.params.userID,
          name: name,
          date: parseString(req.body.date),
          tags: parseStringArray(req.body.tags),
          comments: comment,
        });

        void log.save().then((log) => {
          res.send(log);
        });
      })
      .catch(() => res.sendStatus(500));
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
