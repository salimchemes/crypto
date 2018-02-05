import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';

/*
  Generated class for the ConnectivityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConnectivityProvider {

  onDevice: boolean;

  constructor(public platform: Platform, private network: Network) {
    console.log('platform is cordova: ' + this.platform.is('cordova'));
    this.onDevice = this.platform.is('cordova');
  }
  isOnline(): boolean {
    if (this.onDevice && this.network.type) {
      console.log('isonline network name: ' + this.network.type);
      return this.network.type !== 'none';
    } else {
      return navigator.onLine;
    }
  }

  isOffline(): boolean {
    if (this.onDevice && this.network.type) {
      console.log('isoffline network name: ' + this.network.type);
      return this.network.type === 'none';
    } else {
      return !navigator.onLine;
    }
  }

}
