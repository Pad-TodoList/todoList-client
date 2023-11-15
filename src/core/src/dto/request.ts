type Request = {
  isRequestPending: boolean;
  isRequestSuccess: boolean;
  isRequestFailure: boolean;
};

const request: Request = {
  isRequestPending: false,
  isRequestSuccess: false,
  isRequestFailure: false,
};

export { Request, request };
