import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { CrudRoutingModule } from './crud.routing.module';
import { CrudComponent } from './crud.component';
import { NgModule } from '@angular/core';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [CrudComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    CrudRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CrudModule {}
