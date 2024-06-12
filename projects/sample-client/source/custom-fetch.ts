export const latestRequest: {
  ref: {
    url: string;
    body?: string;
  };
} = {
  ref: {
    url: '',
  },
};

export const customFetch = ((...args: Parameters<typeof fetch>) => {
  latestRequest.ref = {
    url: <string>args[0],
    body: <string>args[1]?.body,
  };
  return fetch(...args);
}) as Window['fetch'];
