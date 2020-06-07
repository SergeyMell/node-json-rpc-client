export function jsonRpcStructure(method: string, params: any[], id: number) {
    return JSON.stringify({
        id,
        method,
        params,
        jsonrpc: '2.0'
    }) + '\n';
}
