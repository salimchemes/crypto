import { Component } from '@angular/core';
import { NavController, IonicPage, Platform } from 'ionic-angular';
import { HoldingsProvider } from '../../providers/holdings/holdings';
import { LoadingProvider } from '../../providers/loading/loading'; 
import { ConnectivityProvider } from '../../providers/connectivity/connectivity';
@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public IsOffline: boolean = false; 
    constructor(private navCtrl: NavController,
        private holdingsProvider: HoldingsProvider,
        private loading: LoadingProvider,
        private platform: Platform,
        private connectivity: ConnectivityProvider) {

    } 

    ionViewDidLoad(): void {
        this.platform.ready().then(() => {
            this.loadData();
        });
    }

    loadData() {
        this.IsOffline = this.connectivity.isOffline();
        this.loading.show('Loading...');
        this.holdingsProvider.loadHoldings();
        this.loading.dismiss();
    }

    addHolding(): void {
        if (this.checkIfOffline())
            return;
        this.navCtrl.push('AddHoldingPage');
    }

    goToCryptonator(): void {
        window.open('https://www.cryptonator.com/api', '_system');
    }

    refreshPrices(refresher): void {
        if (this.checkIfOffline())
            return
        this.holdingsProvider.fetchPrices(refresher);
    }

    goToHolding(holding) {
        if (this.checkIfOffline())
            return
        this.navCtrl.push('AddHoldingPage', { holding: holding });
        console.log(holding);
    }

    viewChart(holding, item) {
        item.close(); 
        if (this.checkIfOffline())
            return
        this.navCtrl.push('ChartPage', { holding: holding });
    } 
 
    checkIfOffline() {
        if (this.connectivity.isOffline()) {
            this.IsOffline = true;
            return true;
        }
        return false;
    }

}