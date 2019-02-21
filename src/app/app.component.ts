import { Component, ViewChild } from '@angular/core';
import { TerminalService } from 'primeng/components/terminal/terminalservice';
import { Subscription } from 'rxjs';
import { Terminal } from 'primeng/terminal';
import { AmplifyService } from 'aws-amplify-angular';
import {DialogModule} from 'primeng/dialog';

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
  welcomeMessage = 'Welcome to CWardCode. Authentication required to continue.';
  signedIn = false;
  user = null;
  userName = '';
  displaySignIn = false;

  constructor(
    private terminalService: TerminalService,
    public amplifyService: AmplifyService
   ) {

    this.amplifyService = amplifyService;

    if (!this.user) {
      this.displaySignIn = true;
    }

    this.amplifyService.authStateChange$
      .subscribe(authState => {
        this.signedIn = authState.state === 'signedIn';
        if (!authState.user) {
          this.user = null;
          this.displaySignIn = true;
        } else {
          this.user = authState.user;
          this.userName = this.user.username;
          this.displaySignIn = false;
        }
      });

    this.terminalService.commandHandler.subscribe(cmd => {
      let response;
      switch (cmd.toLowerCase()) {
        case 'whoami': {
          if (!this.user) {
            response = 'not signed in';
          } else {
            response = this.userName + '@cwardcode.com';
          }
          break;
        }

        case 'login': {
          if (this.user) {
            break;
          } else {
            this.displaySignIn = true;
          }
          break;
        }

        case 'logout': {
          if (!this.user) {
            break;
          } else {
            this.amplifyService.auth().signOut();
            response = 'You have been signed out.';
            break;
          }
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
          response = 'Coming soon...';
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
