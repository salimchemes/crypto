import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

interface Holding {
    id: string,
    crypto: string,
    currency: string,
    amount: number,
    value?: number,
    isUpdate: boolean
}

@Injectable()
export class HoldingsProvider {

    public holdings: Holding[] = [];

    constructor(private http: HttpClient, private storage: Storage) {

    }

    addHolding(holding: Holding): void {
        if (holding.isUpdate)
            this.holdings.forEach(x => {
                if (x.id = holding.id) {
                    x.crypto = holding.crypto,
                        x.currency = holding.currency,
                        x.value = holding.value,
                        x.amount = holding.amount
                }
            })
        else
            this.holdings.push(holding);
        this.fetchPrices();
        this.saveHoldings();

    }

    removeHolding(holding): void {

        this.holdings.splice(this.holdings.indexOf(holding), 1);
        this.fetchPrices();
        this.saveHoldings();

    }

    saveHoldings(): void {
        this.storage.set('cryptoHoldings', this.holdings);
    }

    loadHoldings(): void {

        this.storage.get('cryptoHoldings').then(holdings => {
            if (holdings !== null) {
                this.holdings = holdings;
                this.fetchPrices();
            }
        });

    }

    verifyHolding(holding): Observable<any> {
        return this.http.get('https://api.cryptonator.com/api/ticker/' + holding.crypto + '-' + holding.currency);
    }

    fetchPrices(refresher?): void {

        let requests = [];

        for (let holding of this.holdings) {

            let request = this.http.get('https://api.cryptonator.com/api/ticker/' + holding.crypto + '-' + holding.currency);

            requests.push(request);

        }

        forkJoin(requests).subscribe(results => {

            results.forEach((result: any, index) => {

                this.holdings[index].value = Math.round(result.ticker.price * 100) / 100;

            });

            if (typeof (refresher) !== 'undefined') {
                refresher.complete();
            }

            this.saveHoldings();

        }, err => {

            if (typeof (refresher) !== 'undefined') {
                refresher.complete();
            }

        });

    }

    fetchLast30Days(holding): Observable<any> {
        return this.http.get('https://min-api.cryptocompare.com/data/histoday?fsym=' + holding.crypto.toUpperCase() + '&tsym=' + holding.currency.toUpperCase() + '&limit=30&aggregate=1');
    }

    fetchLast12Hs(holding): Observable<any> {
        return this.http.get('https://min-api.cryptocompare.com/data/histohour?fsym=' + holding.crypto.toUpperCase() + '&tsym=' + holding.currency.toUpperCase() + '&limit=12&aggregate=1');
    }

}