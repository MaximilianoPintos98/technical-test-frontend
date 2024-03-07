import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import PrimeModule from 'src/app/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayerCreateFormComponent } from './player-create-form.component';

@NgModule({
  declarations: [PlayerCreateFormComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PlayerCreateFormComponent,
        outlet: 'form-create'
      },
    ]),
    ButtonModule,
    CommonModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [PlayerCreateFormComponent],
  providers: [UpperCasePipe, DatePipe],
})

export default class PlayerCreateFormModule { }
