import { State } from "../../model";

export const loadingSelector = (state: State) => state.appStatus.loading;