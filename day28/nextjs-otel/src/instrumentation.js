export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        console.log('---instrumentation in node runtime');
        await import('./otel');
    }
}
