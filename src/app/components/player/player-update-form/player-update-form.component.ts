import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import PlayerModel from 'src/app/models/player.model';
import FilterPlayerDTO from 'src/app/models/playerFilter.model';
import TeamModel from 'src/app/models/team.model';
import { getPlayerList, updatePlayer, updatePlayerSuccess } from 'src/app/states/player/player.action';
import PlayerStore from 'src/app/states/player/player.model';
import { selectCurrentPlayerState, selectPlayerReload } from 'src/app/states/player/player.selector';
import { getTeamList } from 'src/app/states/team/team.action';
import TeamStore from 'src/app/states/team/team.model';
import { selectTeamListState } from 'src/app/states/team/team.selector';

@Component({
  selector: 'app-player-update-form',
  templateUrl: './player-update-form.component.html',
  styleUrls: ['./player-update-form.component.scss']
})
export class PlayerUpdateFormComponent implements OnInit {
  @Input() player: PlayerModel = new PlayerModel;
  player_update_form: FormGroup = this.form.group({});
  player$: Observable<PlayerModel> = this.store.select(selectCurrentPlayerState);
  teams: TeamModel[] = [];
  reload$: Observable<boolean> = this.store.select(selectPlayerReload);
  teamList$: Observable<any> = this.store.select(selectTeamListState);
  selectedTeam: any;
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
      if (s) {
        this.storePlayer.dispatch(getPlayerList({ filters: new FilterPlayerDTO }));
      }
    })

    this.suscriptions.add(this.teamList$.subscribe(s => {
      if (s) {
        this.teams = s;
      }
    }));

    this.suscriptions.add(this.player$.subscribe(s => {
      this.player_update_form = this.form.group({});
      this.player = s
      this.player_update_form.addControl('firstName', new FormControl<string>({ value: s.firstName, disabled: false }, { nonNullable: true }))
      this.player_update_form.addControl('lastName', new FormControl<string>({ value: s.lastName, disabled: false }, { nonNullable: true }))
      this.player_update_form.addControl('nationality', new FormControl<string>({ value: s.nationality, disabled: false }, { nonNullable: true }))
      this.player_update_form.addControl('position', new FormControl<string>({ value: s.position, disabled: false }, { nonNullable: true }))
      this.player_update_form.addControl('teamId', new FormControl<any>({ value: s.teamId, disabled: false }, { nonNullable: true }))
    }));
  }

  updatePlayer(): void {
    const playertoupdate: PlayerModel = {
      ...this.player,
      id: this.player.id,
      firstName: this.player_update_form.controls['firstName'].value,
      lastName: this.player_update_form.controls['lastName'].value,
      position: this.player_update_form.controls['position'].value,
      nationality: this.player_update_form.controls['nationality'].value,
      teamId: this.player_update_form.controls['teamId'].value.id,
      team: this.player_update_form.controls['teamId'].value
    }

    this.store.dispatch(updatePlayer({ player: playertoupdate }));
    this.store.dispatch(updatePlayerSuccess())
    this.player_update_form.reset();
  }

  ngOnDestroy(): void {
    this.suscriptions?.unsubscribe()    
  }
}
