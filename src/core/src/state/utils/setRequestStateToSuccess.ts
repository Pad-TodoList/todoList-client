import { RequestState } from "../types/requestState";

function setRequestStateToSuccess(): RequestState {
  return {
    isPending: false,
    isSuccessful: true,
    isFailure: false,
  };
}

export { setRequestStateToSuccess };
