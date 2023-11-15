import { RequestState } from "../types/requestState";

function setRequestStateToFailure(): RequestState {
  return {
    isPending: false,
    isSuccessful: false,
    isFailure: true,
  };
}

export { setRequestStateToFailure };
