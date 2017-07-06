import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdInputModule,
  MdProgressSpinnerModule,
  MdIconModule,
  MdSnackBarModule,
  MdTabsModule,
  MdDialogModule,
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
import IMarkdownService from './services/markdown/markdown.service.interface';
import { MarkdownService } from './services/markdown/markdown.service';
import { AuthGuard } from './guards/auth.guard';
import INotificationsService from './services/notifications/notifications.service.interface';
import { NotificationsService } from './services/notifications/notifications.service';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { SignsDialogComponent } from './views/petition-details/signs-dialog/signs-dialog.component';


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
    LoaderComponent,
    ConfirmationDialogComponent,
    SignsDialogComponent,
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    SignsDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FacebookModule.forRoot(),
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdInputModule,
    MdProgressSpinnerModule,
    MdIconModule,
    MdSnackBarModule,
    MdTabsModule,
    MdDialogModule,
  ],
  providers: [
    { provide: IUserService, useClass: UserService },
    // { provide: IPetitionsService, useClass: MockPetitionsService },
    { provide: IPetitionsService, useClass: PetitionsService },
    { provide: IMarkdownService, useClass: MarkdownService },
    { provide: INotificationsService, useClass: NotificationsService },
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
