import { createReducer, on } from '@ngrx/store';
import PlayerStore from './player.model';
import PlayerModel from 'src/app/models/player.model';
import { createPlayerSuccess, deletePlayerSuccess, getPlayerLoaded, getPlayerLoadedList, removePlayerState, updatePlayerSuccess } from './player.action';


export const initialState: PlayerStore = {
  players: [],
  current: new PlayerModel(),
  reload: false
};

export const playerReducer = createReducer(
  initialState,
  on(getPlayerLoaded, (state, action) => ({ ...state, current: action.player, players: state.players })),
  on(getPlayerLoadedList, (state, action) => ({ ...state, current: state.current, players: action.players, reload: false })),
  on(removePlayerState, (state) => ({ ...state, current: new PlayerModel(), players: state.players })),
  on(createPlayerSuccess, (state) => ({ ...state, reload: true })),
  on(updatePlayerSuccess, (state) => ({ ...state, reload: true })),
  on(deletePlayerSuccess, (state) => ({ ...state, reload: true }))
);
