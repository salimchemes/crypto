import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { HoldingsProvider } from '../../providers/holdings/holdings';
import { LoadingProvider } from '../../providers/loading/loading';
@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(private navCtrl: NavController,
        private holdingsProvider: HoldingsProvider,
        private loading: LoadingProvider) {

    }

    ionViewDidLoad(): void {
        this.loading.show('Loading...');
        this.holdingsProvider.loadHoldings(); 
        this.loading.dismiss();
    }

    addHolding(): void {
        this.navCtrl.push('AddHoldingPage');
    }

    goToCryptonator(): void {
        window.open('https://www.cryptonator.com/api', '_system');
    }

    refreshPrices(refresher): void {
        this.holdingsProvider.fetchPrices(refresher);
    }

    goToHolding(holding) {
        this.navCtrl.push('AddHoldingPage', { holding: holding });
        console.log(holding);
    }

    viewChart(holding) {
        this.navCtrl.push('ChartPage', { holding: holding });
    }

}