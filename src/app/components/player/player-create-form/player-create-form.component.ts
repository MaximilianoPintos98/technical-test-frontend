import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import PlayerModel from 'src/app/models/player.model';
import FilterPlayerDTO from 'src/app/models/playerFilter.model';
import PlayerPostModel from 'src/app/models/playerPost.model';
import TeamModel from 'src/app/models/team.model';
import { createPlayer, createPlayerSuccess, getPlayerList } from 'src/app/states/player/player.action';
import PlayerStore from 'src/app/states/player/player.model';
import { selectCurrentPlayerState, selectPlayerReload } from 'src/app/states/player/player.selector';
import { getTeamList } from 'src/app/states/team/team.action';
import TeamStore from 'src/app/states/team/team.model';
import { selectTeamListState } from 'src/app/states/team/team.selector';

@Component({
  selector: 'app-player-create-form',
  templateUrl: './player-create-form.component.html',
  styleUrls: ['./player-create-form.component.scss']
})
export class PlayerCreateFormComponent implements OnInit {
  player: PlayerModel = new PlayerModel();
  teams: TeamModel[] = [];
  teamList$: Observable<any> = this.store.select(selectTeamListState);
  player$: Observable<PlayerModel> = this.store.select(selectCurrentPlayerState);
  reload$: Observable<boolean> = this.store.select(selectPlayerReload);
  selectedTeam: any;
  player_form: FormGroup = this.form.group({});
  playerFilters: FilterPlayerDTO = new FilterPlayerDTO(); 
  suscriptions?: Subscription;

  constructor(
    private readonly store: Store<TeamStore>,
    private readonly storePlayer: Store<PlayerStore>,
    private readonly form: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(getTeamList());
    this.suscriptions = this.reload$.subscribe(s => {
      if(s) {
        this.storePlayer.dispatch(getPlayerList({filters: new FilterPlayerDTO}));
      }
    })

    this.suscriptions.add(this.teamList$.subscribe(s => {
      if (s) {
        this.teams = s;
      }
    }));

    this.suscriptions.add(this.player$.subscribe(s => {
      this.player_form = this.form.group({});
      this.player = s
      this.player_form.addControl('firstName', new FormControl<string>({ value: s.firstName, disabled: false }, { nonNullable: true }))
      this.player_form.addControl('lastName', new FormControl<string>({ value: s.lastName, disabled: false }, { nonNullable: true }))
      this.player_form.addControl('nationality', new FormControl<string>({ value: s.nationality, disabled: false }, { nonNullable: true }))
      this.player_form.addControl('position', new FormControl<string>({ value: s.position, disabled: false }, { nonNullable: true }))
      this.player_form.addControl('teamId', new FormControl<any>({ value: s.teamId, disabled: false }, { nonNullable: true }))
    }));

    this.player_form.controls['firstName'].addValidators([Validators.required]);
    this.player_form.controls['lastName'].addValidators([Validators.required]);
  }

  savePlayer(): void {
    this.selectedTeam = this.player_form.controls['teamId'].value

    const playerToCreate: PlayerPostModel = {
      ...this.player,
      firstName: this.player_form.controls['firstName'].value,
      lastName: this.player_form.controls['lastName'].value,
      position: this.player_form.controls['position'].value,
      nationality: this.player_form.controls['nationality'].value,
      teamId: this.selectedTeam.id,
    }

    this.playerFilters = {
      firstName: this.player_form.controls['firstName'].value,
      lastName: this.player_form.controls['lastName'].value,
    }

    this.store.dispatch(createPlayer({player: playerToCreate}));
    this.store.dispatch(createPlayerSuccess())
    this.player_form.reset();
  }

  ngOnDestroy(): void {
    this.suscriptions?.unsubscribe();
  }
}
