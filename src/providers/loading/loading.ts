import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';
/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingProvider {
  loading: Loading;
  constructor(public http: HttpClient, public loadingController: LoadingController) {
    console.log('Hello LoadingProvider Provider');
  }

  show(content): Promise<any> {
    this.loading = this.loadingController.create({
      content: content
    });

    return this.loading.present();
  }

  dismiss(dismissCallback: Function = () => { }): Promise<any> {

    return this.loading.dismiss();
  }
}
