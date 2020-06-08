import {Connection} from './json-rpc-client.interface';
import {TcpClient} from './tcp-client/tcp-client';
import {SslClient} from './ssl-client/ssl-client';

export module JSONRpc {

    export function client(host: string, port: number, connection: Connection) {
        switch (connection) {
            case 'tcp':
                return new TcpClient(port, host);
            case 'ssl':
            case 'tls':
                return new SslClient(port, host);
            default:
                throw new Error('Unsupportable connection type');
        }
    }
}
