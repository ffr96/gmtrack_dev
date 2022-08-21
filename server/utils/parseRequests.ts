import { Measures } from '../schemas/weight';
import { parseString } from './parsers';

interface userProps {
  username: unknown;
  password?: unknown;
}

interface userRes {
  username: string;
  password?: string;
}

interface loginProps extends userProps {
  passwordHash: unknown;
  id: unknown;
}

interface loginRes extends userRes {
  passwordHash: string;
  id: string;
}

export const parseMeasures = (measures: unknown): Measures => {
  const measuresCheck = measures as Measures;
  const toReturn: Measures = {};
  if (
    measuresCheck.arms &&
    (typeof measuresCheck.arms === 'number' ||
      typeof measuresCheck.arms === 'string')
  )
    toReturn.arms = Number(measuresCheck.arms);

  if (
    measuresCheck.calves &&
    (typeof measuresCheck.calves === 'number' ||
      typeof measuresCheck.calves === 'string')
  )
    toReturn.calves = Number(measuresCheck.calves);

  if (
    measuresCheck.chest &&
    (typeof measuresCheck.chest === 'number' ||
      typeof measuresCheck.chest === 'string')
  )
    toReturn.chest = Number(measuresCheck.calves);

  return toReturn;
};

export const parseUser = (props: userProps): userRes => {
  if (props) {
    const username: string = parseString(props.username);
    const password: string = parseString(props.password);

    return {
      username: username,
      password: password,
    };
  } else {
    throw new Error('No info provided on user parse');
  }
};

export const parseLogin = (props: loginProps): loginRes => {
  if (props) {
    const username: string = parseString(props.username);
    const id: string = parseString(props.id);
    const passwordHash: string = parseString(props.passwordHash);

    return {
      username: username,
      id: id,
      passwordHash: passwordHash,
    };
  } else {
    throw new Error('No info provided on login parse');
  }
};
