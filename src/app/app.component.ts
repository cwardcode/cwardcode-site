import { Component, ViewChild } from '@angular/core';
import { TerminalService } from 'primeng/components/terminal/terminalservice';
//import { Subscription } from 'rxjs/Subscription';
import { Subscription } from 'rxjs';
import { Terminal } from 'primeng/terminal';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TerminalService]
})

export class AppComponent {
  @ViewChild('term') private terminalPrompt: Terminal;
  subscription: Subscription;
  promptText = 'cwardcode $';
  welcomeMessage = 'Welcome to CWardCode. My new site is under construction. Until it is finished, play around and have fun! Type help for more information.'
  constructor(private terminalService: TerminalService) {
    this.terminalService.commandHandler.subscribe(cmd => {
      let response;
      switch(cmd) {

        case 'whoami': {          
          response = 'user@cwardcode.com';
          break;
        }

        case 'login': {
          response = 'Coming Soon...';
          break;
        }

        case 'adduser': {
          response = 'Coming soon...';
          break;
        }

        case 'clear': {
          const commands = this.terminalPrompt.el.nativeElement.children[0];
          console.log(commands.childNodes)
          debugger;
        /*  for(let i = 1; commands.childElementCount.length > 1; i++){
            console.log(commands.children[i]);
            //console.log(this.terminalPrompt.el.nativeElement.children.length)
            if(commands.children[i] != null) {
              commands.removeChild(commands.children[i]);
            }
          }*/
          break;
        }

        case 'help': {
          response = 'Supported commands are: whoami, login, adduser, clear';
          break;
        }
        default: {
          response = 'Unknown Command: ' + cmd;
          break;
        }
      }
      this.terminalService.sendResponse(response);
    });
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
