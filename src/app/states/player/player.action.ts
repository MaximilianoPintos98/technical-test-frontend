import { createAction, props } from '@ngrx/store';
import PlayerModel from 'src/app/models/player.model';
import FilterPlayerDTO from 'src/app/models/playerFilter.model';
import PlayerPostModel from 'src/app/models/playerPost.model';

export const removePlayerState = createAction('[Player] Remove');
export const getPlayer = createAction('[Player] Get', props<{ playerId: string }>());
export const getPlayerList = createAction('[Player] GetList', props<{ filters: FilterPlayerDTO }>());
export const getPlayerLoadedList = createAction('[Player] LoadedList', props<{ players: PlayerModel [] }>());
export const getPlayerLoaded = createAction('[Player] Loaded', props<{ player: PlayerModel }>());
export const createPlayer = createAction('[Player] Create', props<{ player: PlayerPostModel }>());
export const updatePlayer = createAction('[Player] Update', props<{ player: PlayerModel }>());
export const deletePlayer = createAction('[Player] Delete', props<{ playerId: string }>());

export const createPlayerSuccess = createAction('[Player] Create Success');
export const updatePlayerSuccess = createAction('[Player] Update Success');
export const deletePlayerSuccess = createAction('[Player] Delete Success');
