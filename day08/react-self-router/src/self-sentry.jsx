import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
export class SelfSentry {
    static withSentryReactRouter(RoutesComponent) {
        return ({ children }) => {
            const location = useLocation();

            useEffect(() => {
                console.log('--window.location.href', window.location.href);
                console.log('---locaton:', location);
            }, [location]);

            return <RoutesComponent>{children}</RoutesComponent>;
        };
    }
}
