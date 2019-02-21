import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-1:76f574fb-4c85-4270-9b18-2fde5ad5f288',
    region: 'us-east-1',
    userPoolId: 'us-east-1_gymlFxbTN',
    userPoolWebClientId: '3e4nmhs5bkjkpc734silkdhd3f'
  }
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
