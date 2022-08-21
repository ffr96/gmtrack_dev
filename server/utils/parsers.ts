import mongoose from 'mongoose';

const isString = (str: unknown): str is string => {
  return (
    typeof str === 'string' ||
    str instanceof String ||
    str instanceof mongoose.Types.ObjectId
  );
};

const isNumb = (numb: unknown): numb is number => {
  return typeof numb === 'number' || numb instanceof Number;
};

export const parseString = (str: unknown): string => {
  if (!str || !isString(str)) {
    throw new Error(`Error parsing; not a string: ${str}`);
  }

  return str;
};

export const parseNumber = (numb: unknown): number => {
  if (!numb || !isNumb(numb)) {
    throw new Error('Error parsing; not a number');
  }

  return numb;
};

export const parseStringArray = (str: unknown[] | null): string[] => {
  const newComments: string[] = [];
  if (str) {
    try {
      str.forEach((obj) => newComments.push(parseString(obj)));
    } catch (e) {
      throw new Error('Error parsing @ parseStringArray');
    }
  } else {
    throw new Error('Cant parse string @ string array');
  }

  return newComments;
};

export const parseNumberArray = (numb: unknown[]): number[] => {
  const newNumbers: number[] = [];
  if (numb) {
    try {
      numb.forEach((n) => newNumbers.push(parseNumber(n)));
    } catch (e) {
      throw new Error('Error parsing @ parseNumber');
    }
  } else {
    throw new Error('Error parsing, empty numb @ parseNumberArray');
  }
  return newNumbers;
};
