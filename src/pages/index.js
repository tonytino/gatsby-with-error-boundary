import React from "react"

class CustomErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.warn('$$$', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function AppBreaker({ text }) {
  const fnThatBreaks = () => null.toUpperCase();
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => setIsClient(true), []);
  const renderer = isClient ? "client" : "server";
  let onClick = () => {};
  const styles = {
    background: isClient ? 'salmon' : 'black',
    border: '2px solid black',
    padding: '1rem',
    margin: '5rem',
  };

  /**
   * Examples of issues that _can_ be resolved via an Error Boundary
   */

  // Rendering error example (uncomment next several lines)
  return (
    <button style={styles} onClick={onClick}>
      {`${isClient ? text.missing.toUpperCase() : text} rendered by ${renderer}`}
    </button>
  );

  // Lifecycle error example (uncomment next line)
  // React.useEffect(fnThatBreaks, []);

  /**
   * Examples of issues that _cannot_ be resolved via an Error Boundary
   */

  // Event Handler error example (uncomment next line and click the button)
  // onClick = fnThatBreaks;

  // Async error example (uncomment next line)
  // setTimeout(fnThatBreaks, 0);

  // Error-free render
  return (
    <button style={styles} onClick={onClick}>
      {`${text} rendered by ${renderer}`}
    </button>
  );
};

export default function Home() {
  return (
    <CustomErrorBoundary>
      <AppBreaker text="hello world" />
    </CustomErrorBoundary>
  );
}
