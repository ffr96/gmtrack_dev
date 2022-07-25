import { parseString } from './parsers';

interface userProps {
  name: unknown,
  username: unknown, 
  password?: unknown,
}

interface userRes {
  name: string,
  username: string,
  password?: string,
}

interface loginProps extends userProps {
  passwordHash: unknown,
  id: unknown
}

interface loginRes extends userRes {
  passwordHash: string,
  id: string
}

export const parseUser = (props:userProps) : userRes => {
  if (props) {
    const name:string = parseString(props.name);
    const username:string = parseString(props.username);
    const password:string = parseString(props.password);

    return {
      name: name,
      username: username,
      password: password,
    };
  } else {
    throw new Error('No info provided on user parse');
  }
};

export const parseLogin = (props:loginProps) : loginRes => {
  if (props) {
    const name:string = parseString(props.name);
    const username:string = parseString(props.username);
    const id:string = parseString(props.id);
    const passwordHash:string = parseString(props.passwordHash);

    return {
      name: name,
      username: username,
      id: id,
      passwordHash: passwordHash
    };
  } else {
    throw new Error('No info provided on login parse');
  }
};