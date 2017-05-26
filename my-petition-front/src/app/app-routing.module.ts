import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PetitionsComponent} from './components/petitions/petitions.component';
import {PetitionDetailsComponent} from './components/petition-details/petition-details.component';
import {NewPetitionComponent} from './components/new-petition/new-petition.component';
import {SandboxComponent} from './components/sandbox/sandbox.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/petitions',
    pathMatch: 'full'
  },
  {
    path: 'petitions',
    component: PetitionsComponent
  },
  {
    path: 'petitions/:id',
    component: PetitionDetailsComponent
  },
  {
    path: 'petitions/new',
    component: NewPetitionComponent
  },
  {
    path: 'sandbox',
    component: SandboxComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
