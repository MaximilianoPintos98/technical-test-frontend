import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import PrimeModule from 'src/app/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayerUpdateFormComponent } from './player-update-form.component';

@NgModule({
  declarations: [PlayerUpdateFormComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PlayerUpdateFormComponent,
        outlet: 'form-create'
      },
    ]),
    ButtonModule,
    CommonModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [PlayerUpdateFormComponent],
  providers: [UpperCasePipe, DatePipe],
})

export default class PlayerUpdateFormModule { }
