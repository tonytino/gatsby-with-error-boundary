import React from "react";

// https://github.com/bvaughn/react-error-boundary
import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({error}) {
  return (
    <div role="alert">
      <p>Something went wrong (caught at app-level):</p>
      <pre>{error.message}</pre>
    </div>
  )
}

// Wraps every page in a component
export const wrapPageElement = ({ element }) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={() => console.warn('App-level error boundary')}
    >
      {element}
    </ErrorBoundary>
  );
}
