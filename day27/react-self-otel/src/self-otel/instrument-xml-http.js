export class MockXMLHttpRequestInstrumentation {
    constructor() {}

    init() {
        if (typeof window !== 'undefined' && window.XMLHttpRequest) {
            const originalXMLHttpRequest = window.XMLHttpRequest;

            // Create a new class that extends the original XMLHttpRequest
            class MockXMLHttpRequest extends originalXMLHttpRequest {
                constructor() {
                    super(); // Call the original constructor
                    this._url = ''; // Store the URL of the request
                }

                // Override the open method to capture the URL and method
                open(method, url, async, user, password) {
                    this._url = url; // Capture the request URL
                    super.open(method, url, async, user, password); // Call the original open method
                }

                // Override the send method to inject headers and handle request lifecycle
                send(body) {
                    // Add a traceparent header before sending the request
                    this.setRequestHeader(
                        'traceparent',
                        '00-xmlTraceId-mockspanId-01',
                    );

                    // Event listener for request completion (successful or failed)
                    this.addEventListener('load', () => {
                        // TODO: exporter logic
                        console.log(`Request to ${this._url} completed.`);
                    });

                    this.addEventListener('error', () => {
                        console.error(`Request to ${this._url} failed.`);
                    });

                    // Call the original send method
                    super.send(body);
                }
            }

            // Override the global XMLHttpRequest with the mocked version
            window.XMLHttpRequest = MockXMLHttpRequest;
        }
    }
}
