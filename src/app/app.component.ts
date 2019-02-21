import { Component, ViewChild } from '@angular/core';
import { TerminalService } from 'primeng/components/terminal/terminalservice';
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
  // tslint:disable-next-line:max-line-length
  welcomeMessage = 'Welcome to CWardCode. My new site is under construction. Until it is finished, play around and have fun! Type help for more information.';
  constructor(private terminalService: TerminalService) {
    this.terminalService.commandHandler.subscribe(cmd => {
      let response;
      switch (cmd.toLowerCase()) {

        case 'whoami': {
          response = 'user@cwardcode.com';
          break;
        }

        case 'login': {
          // TODO use actual library
          response = 'Redirecting to login page..';
          // tslint:disable-next-line:max-line-length
          window.location.replace('https://auth.cwardcode.com/login?redirect_uri=https%3A%2F%2Fcwardcode.com&response_type=token&client_id=3e4nmhs5bkjkpc734silkdhd3f&state=TQz4g2Lm1yklfmUbtZlCeN0ptdIQOzL5&scope=openid%20profile%20email');
          break;
        }

        case 'exit': {
          response = 'Goodbye!';
          window.location.replace('https://google.com');
          break;
        }

        case 'view-source': {
          response = 'Exiting the site and navigating to github';
          window.location.replace('https://github.com/cwardcode/cwardcode-site');
          break;
        }

        case 'adduser': {
          response = 'Coming soon...';
          break;
        }

        case 'clear': {
          const commands = this.terminalPrompt.el.nativeElement.children[0];
          console.log(commands.childNodes);
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
          response = 'supported commands are: whoami, login, adduser, clear, view-source, exit';
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

  OnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
