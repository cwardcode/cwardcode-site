import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AmplifyAngularModule, AmplifyService, AmplifyIonicModule } from 'aws-amplify-angular';
import { TerminalModule } from 'primeng/terminal';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    TerminalModule,
    BrowserModule,
    AppRoutingModule,
    AmplifyAngularModule,
    AmplifyIonicModule,
    DialogModule,
    BrowserAnimationsModule
  ],
  providers: [AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
