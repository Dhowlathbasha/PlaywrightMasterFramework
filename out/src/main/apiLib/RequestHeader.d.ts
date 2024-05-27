export default class RequestHeader {
    private map;
    set(key: string, value: any): RequestHeader;
    get(): {
        [k: string]: any;
    };
}
