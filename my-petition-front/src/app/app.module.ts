import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCardModule, MdCheckboxModule, MdInputModule} from '@angular/material';
import {FacebookModule} from 'ngx-facebook';
import 'hammerjs';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {PetitionsComponent} from './components/petitions/petitions.component';
import {PetitionDetailsComponent} from './components/petition-details/petition-details.component';
import {NewPetitionComponent} from './components/new-petition/new-petition.component';
import {PetitionTileComponent} from './components/petitions/petition-tile/petition-tile.component';
import {SandboxComponent} from './components/sandbox/sandbox.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PetitionsComponent,
    PetitionDetailsComponent,
    NewPetitionComponent,
    PetitionTileComponent,
    SandboxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FacebookModule.forRoot(),
    NoopAnimationsModule,
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
