import {TLSSocket} from "tls";
import {Socket} from 'net';
import {jsonRpcStructure} from './data-structure.provider';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

export abstract class AbstractSocketClient {

    protected port: number;
    protected host: string;

    protected abstract initClient(): Socket | TLSSocket;

    protected constructor(port: number, host: string) {
        this.port = port;
        this.host = host;
    }

    private get connection(): Observable<Socket | TLSSocket> {
        const socket = this.initClient();
        return new Observable(observer => {

            socket.on('close', () => {
                console.log('closed');
                socket.removeAllListeners();
                observer.complete();
            });
            socket.on('error', err => {
                socket.removeAllListeners();
                observer.error(err);
            });

            socket.connect(
                this.port, this.host,
                () => {
                    console.log('connecting');
                    observer.next(socket);
                    observer.complete();
                }
            );
        });
    }

    request(method: string, params = [], id = 1): Observable<any> {
        const data = jsonRpcStructure(method, params, id);
        return this.connection
            .pipe(
                switchMap(socket => {
                    return new Observable(observer => {
                        socket.write(data, err => {
                                if (err) {
                                    observer.error(err);
                                }
                            }
                        );
                        socket.on('data', data => observer.next(data.toString()));

                        observer.add(() => {
                            console.log('ending');
                            socket.end();
                            socket.destroy();
                        });
                    })
                })
            )
    }

}
