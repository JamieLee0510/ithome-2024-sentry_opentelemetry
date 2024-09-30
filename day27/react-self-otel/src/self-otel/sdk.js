import { MockFetchInstrumentation } from './instrument-fetch';
import { MockXMLHttpRequestInstrumentation } from './instrument-xml-http';

export class MockWebSdk {
    constructor() {
        this.instruments = [
            new MockFetchInstrumentation(),
            new MockXMLHttpRequestInstrumentation(),
        ];
    }
    start() {
        this.instruments.forEach((instruments) => {
            instruments.init();
        });
    }
}
