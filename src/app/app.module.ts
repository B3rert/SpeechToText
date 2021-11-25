import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//angularMaterial
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

//Components	
import { AppComponent } from './app.component';
import { SpeechToTextComponent } from './speech-to-text/speech-to-text.component';
import { GenericAcceptDialogComponent } from './component/dialog/generic-accept-dialog/generic-accept-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SpeechToTextComponent,
    GenericAcceptDialogComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    //Angular Material
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
