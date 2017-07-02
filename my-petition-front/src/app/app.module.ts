import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdInputModule,
  MdProgressSpinnerModule
} from '@angular/material';
import { FacebookModule } from 'ngx-facebook';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './views/app.component';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { PetitionsComponent } from './views/petitions/petitions.component';
import { PetitionDetailsComponent } from './views/petition-details/petition-details.component';
import { NewPetitionComponent } from './views/new-petition/new-petition.component';
import { PetitionTileComponent } from './views/petitions/petition-tile/petition-tile.component';
import { SandboxComponent } from './views/sandbox/sandbox.component';
import IPetitionsService from './services/petitions/petitions.service.interface';
import { MockPetitionsService } from './services/petitions/mock-petitions.service';
import { PetitionsService } from './services/petitions/petitions.service';
import { UserService } from './services/user/user.service';
import IUserService from './services/user/user.service.interface';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PetitionsComponent,
    PetitionDetailsComponent,
    NewPetitionComponent,
    PetitionTileComponent,
    SandboxComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FacebookModule.forRoot(),
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdInputModule,
    MdProgressSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: IUserService, useClass: UserService },
    { provide: IPetitionsService, useClass: MockPetitionsService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
