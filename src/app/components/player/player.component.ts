import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import PlayerModel from 'src/app/models/player.model';
import FilterPlayerDTO from 'src/app/models/playerFilter.model';
import { deletePlayer, getPlayerList } from 'src/app/states/player/player.action';
import PlayerStore from 'src/app/states/player/player.model';
import { selectPlayerListState, selectPlayerReload } from 'src/app/states/player/player.selector';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-player-component',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  players: PlayerModel[] = [];

  player: PlayerModel = new PlayerModel;

  playerId: string = '';

  playersList$: Observable<any> = this.store.select(selectPlayerListState);

  playerFilters: FilterPlayerDTO = new FilterPlayerDTO(); 

  displayDialog: boolean = false;

  displayUpdateDialog: boolean = false;

  reload$: Observable<boolean> = this.store.select(selectPlayerReload)

  suscriptions?: Subscription;

  firstName?: string;

  lastName?: string;

  constructor(
    private readonly store: Store<PlayerStore>
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(getPlayerList({ filters: this.playerFilters }));

    this.suscriptions = this.reload$.subscribe(s =>{
      if(!s) {
        this.showDialog(false, false);
      }
    })
    
    this.suscriptions.add(this.playersList$.subscribe(s =>{
      if(s) this.players = s;
    }));
  }

  showDialog(createDialog: boolean, updateDialog: boolean) {
    this.displayDialog = createDialog;
    this.displayUpdateDialog = updateDialog;
  }
  
  editPlayer(player: PlayerModel): void {
    this.player = player;
    this.showDialog(false, true);
  }

  deletePlayer(playerId: string): void {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      showCancelButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(deletePlayer({ playerId }))
      }
    })
  }

  search() {
    const filters = { ...this.playerFilters }
    filters.firstName = this.firstName
    filters.lastName = this.lastName

    this.store.dispatch(getPlayerList({ filters: filters }));

    this.firstName = ''
    this.lastName = ''
  }

  ngOnDestroy(): void {
    this.suscriptions?.unsubscribe()    
  }
}
