import {Socket} from 'net';
import {AbstractSocketClient} from '../abstract-socket-client';

export class TcpClient extends AbstractSocketClient {

    protected client = new Socket();

    constructor(port: number, host: string) {
        super(port, host);
    }
}
