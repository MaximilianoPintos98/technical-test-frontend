import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { playerReducer } from './states/player/player.reducer';
import PlayerEffects from './states/player/player.effect';
import { teamReducer } from './states/team/team.reducer';
import TeamEffects from './states/team/team.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({
      playerReducer,
      teamReducer
    }),
    EffectsModule.forRoot([
      PlayerEffects,
      TeamEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
