import {TLSSocket} from 'tls';
import {AbstractSocketClient} from '../abstract-socket-client';

export class SslClient extends AbstractSocketClient {

    // @ts-ignore
    protected client = new TLSSocket();

    constructor(port: number, host: string) {
        super(port, host);
    }
}
