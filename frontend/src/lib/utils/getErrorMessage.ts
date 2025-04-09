export const getErrorMessage = (error: unknown, defaultMessage: string) => {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  } else {
    return defaultMessage;
  }
};
