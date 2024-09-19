import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { onLCP, onFCP } from 'web-vitals';

export class SelfSentry {
    static withSentryReactRouter(RoutesComponent) {
        return ({ children }) => {
            const location = useLocation();

            useEffect(() => {
                console.log('--window.location.href', window.location.href);
                onLCP((metric) => this._reportWebVitals('LCP', metric));
                onFCP((metric) => this._reportWebVitals('FCP', metric));
            }, [location]);

            return <RoutesComponent>{children}</RoutesComponent>;
        };
    }

    static _reportWebVitals(type, metric) {
        console.log('metric:', metric);
        const metricInfo = {
            type: type,
            value: metric.value,
            delta: metric.delta,
            id: metric.id,
        };
        console.log('metricInfo:', metricInfo);
        // TODO: send to monitor server
    }
}
