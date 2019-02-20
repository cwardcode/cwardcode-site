import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//prime-ng
import { TerminalModule } from 'primeng/terminal';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    TerminalModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
