export class MockFetchInstrumentation {
    constructor() {
        //this.exporter = exporter;
    }

    init() {
        if (typeof window !== 'undefined' && window.fetch) {
            const originalFetch = window.fetch;
            // Override the fetch function
            //const instrument = this;
            window.fetch = async (...args) => {
                let [resource, config] = args;

                // Create a new configuration object if not provided
                config = config || {};

                // Ensure headers object exists
                config.headers = config.headers || {};

                // Append the traceHeader (mock value) to the headers
                config.headers['traceparent'] = '00-fetchTraceId-mockspanId-01';

                // Call the original fetch with the modified config
                return originalFetch(resource, config)
                    .then((response) => {
                        // TODO: exporter logic
                        return response;
                    })
                    .catch((error) => {
                        throw error;
                    });
            };
        }
    }
}
