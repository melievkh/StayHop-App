import { StateType } from 'src/types';

export const onPending = (state: StateType) => {
  state.pending = true;
  state.error = null;
};

export const onError = (state: StateType, action: { payload: any }) => {
  state.pending = false;
  state.error = action.payload.error;
};
