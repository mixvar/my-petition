import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PetitionsComponent} from './views/petitions/petitions.component';
import {PetitionDetailsComponent} from './views/petition-details/petition-details.component';
import {NewPetitionComponent} from './views/new-petition/new-petition.component';
import {SandboxComponent} from './views/sandbox/sandbox.component';


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
    path: 'new-petition',
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
