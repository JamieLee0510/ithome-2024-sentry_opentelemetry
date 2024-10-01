export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const { initNodeOtel } = await import('./lib/otel/instrument.node');
        initNodeOtel();
    }
}
