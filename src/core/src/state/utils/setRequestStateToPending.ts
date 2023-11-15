import { RequestState } from "../types/requestState";

function setRequestStateToPending(): RequestState {
  return {
    isPending: true,
    isSuccessful: false,
    isFailure: false,
  };
}

export { setRequestStateToPending };
