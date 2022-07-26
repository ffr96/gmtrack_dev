import { User, ErrorResponse } from "types";

export const arrayStringToInt = (arr: string[]): number[] => {
  const arrNumber: number[] = [];
  if (arr) {
    arr.forEach((i) => arrNumber.push(Number(i)));
  }

  return arrNumber;
};

/**
 * Receives a date stored on training log and slices it
 * Or takes no argument and returns current date.
 * @param str Date stored on training log
 * @returns
 */

export const getDate = (str?: string) => {
  let date;
  if (str) date = new Date(str).toString().slice(0, 24);
  else date = Date().toString().slice(0, 24);
  return date;
};

/** Checks if there's a message that can be retrieved from an error.
 * @param e error to check
 * @returns Boolean
 */

export const isValidError = (e: unknown): e is ErrorResponse => {
  const error = e as ErrorResponse;
  if (
    error &&
    error.response &&
    error.response.data &&
    typeof error.response.data.message === "string"
  )
    return true;
  return false;
};

//eslint-disable-next-line
//function isUser(o: any): o is User {
//  return "username" in o && "id" in o && "name" in o;
//}
//
//export const getUserParse = (o: unknown): User | undefined => {
//  if (isUser(o)) {
//    return o;
//  }
//};

/**
 * @returns user stored on localStorage
 */

export const getLocalUser = (): User | null => {
  const localUser = localStorage.getItem("user-token");
  if (localUser) {
    return JSON.parse(localUser) as User;
  } else {
    return null;
  }
};

/**
 * Capitalizes first letter
 */

export const capitalizeFirstLetter = (str: string) => {
  if (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};

/**
 * Checks media width
 * @returns true if media > 500px
 */

export const getMediaWidth = () => {
  const width = document.documentElement.clientWidth;
  return width > 600;
};

export const buildUrlQuery = (
  page?: number,
  filter?: { name?: string; from?: string; to?: string }
) => {
  let query = "";
  if (typeof page === "number") query += `page=${page}&`;
  if (filter?.name) query += `name=${filter.name}&`;
  if (filter?.to) query += `to=${filter.to}&`;
  if (filter?.from) query += `from=${filter.from}&`;
  return query;
};
