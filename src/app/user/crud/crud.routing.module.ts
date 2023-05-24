import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { CrudComponent } from './crud.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
const crudRoutes: Routes = [
  {
    path: '',
    component: CrudComponent,
    children: [
      { path: '', component: AddComponent },
      { path: 'edit/:id', component: EditComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(crudRoutes)],
  exports: [RouterModule],
})
export class CrudRoutingModule {}
