export class JSONRpcClient {

    private domain: string;
    private port: number;

    constructor(url: string);
    constructor(domainOrUrl: string, port?: number) {
        this.domain = domainOrUrl
        this.port = port;
    }
}
