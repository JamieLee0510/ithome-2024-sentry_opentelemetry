import MyErrorBoundary from './MyErrorBoundary';

export default class SelfSentry {
    static ErrorBoundary({ children, fallback }) {
        return (
            <MyErrorBoundary fallback={fallback}>{children}</MyErrorBoundary>
        );
    }
}
