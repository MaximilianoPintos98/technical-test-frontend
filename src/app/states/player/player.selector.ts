import { createSelector } from "@ngrx/store";
import PlayerStore from "./player.model";

export const getFullState = (currentState: any): PlayerStore => currentState.playerReducer;
export const selectCurrentPlayerState = createSelector(
    getFullState, (state: PlayerStore) => state.current!,
);
export const selectPlayerListState = createSelector(
    getFullState, (state: PlayerStore) => state.players!,
);
export const selectPlayerReload = createSelector(
    getFullState, (state: PlayerStore) => state.reload!,
);
