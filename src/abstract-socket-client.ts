import {TLSSocket} from "tls";
import {Socket} from 'net';
import {jsonRpcStructure} from './data-structure.provider';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

export abstract class AbstractSocketClient {

    protected port: number;
    protected host: string;

    protected abstract client: Socket | TLSSocket;

    protected constructor(port: number, host: string) {
        this.port = port;
        this.host = host;
    }

    private get connection(): Observable<void> {
        return new Observable(observer => {
            const errorHandler = (e) => observer.error(e);

            this.client.on('close', () => {
                observer.complete();
            });

            this.client.on('error', err => {
                observer.error(err);
            });

            this.client.connect(
                this.port, this.host,
                () => {
                    this.client.removeListener('error', errorHandler);
                    observer.next();
                    observer.complete();
                }
            );

            this.client.on('error', errorHandler)
        });
    }

    request(method: string, params = [], id = 1): Observable<any> {
        const data = jsonRpcStructure(method, params, id);

        const request = new Observable(observer => {

            this.client.write(data, err => {
                    if (err) {
                        observer.error(err);
                    }
                }
            );

            this.client.on('data', (data) => {
                observer.next(data.toString());
            });

            observer.add(() => {
                console.log('ending');
                this.client.removeAllListeners();
                this.client.end();
            });

        });

        return this.connection
            .pipe(switchMap(() => request));

    }

}
