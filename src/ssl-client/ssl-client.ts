import {TLSSocket} from 'tls';
import {AbstractSocketClient} from '../abstract-socket-client';

export class SslClient extends AbstractSocketClient {

    protected initClient(): TLSSocket {
        // @ts-ignore
        return new TLSSocket();
    }

    constructor(port: number, host: string) {
        super(port, host);
    }
}
