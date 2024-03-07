import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import PrimeModule from 'src/app/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayerComponent } from './player.component';
import { TableModule } from 'primeng/table';
import PlayerCreateFormModule from './player-create-form/player-create-form.module';
import PlayerUpdateFormModule from './player-update-form/player-update-form.module';

@NgModule({
  declarations: [PlayerComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PlayerComponent,
      },
    ]),
    ButtonModule,
    CommonModule,
    PrimeModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    PlayerCreateFormModule,
    DialogModule,
    PlayerUpdateFormModule
  ],
  exports: [PlayerComponent],
  providers: [UpperCasePipe, DatePipe],
})

export default class OwnerFormModule { }
