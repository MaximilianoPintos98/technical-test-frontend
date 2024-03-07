import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    DropdownModule,
  ],
})

export default class PrimeModule { }
