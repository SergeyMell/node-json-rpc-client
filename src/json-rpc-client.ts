import {Connection} from './json-rpc-client.interface';
import {url} from 'inspector';

export class JSONRpcClient {

    private domain: string;
    private port: number;
    private connection: Connection;

    constructor(url: string)
    constructor(domainOrUrl: string, port?: number, connection?: Connection) {
        domainOrUrl.split('://')
    }
}
