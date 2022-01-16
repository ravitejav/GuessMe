import React from "react";

class ErrorBoundary extends React.Component<{}, { [key: string]: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="center" style={errorBoundaryStyles.container}>
          <h2 style={errorBoundaryStyles.error}>
            Something went wrong. Please try again.
          </h2>
        </div>
      );
    }

    return this.props.children;
  }
}

const errorBoundaryStyles = {
  container: {
    height: "100vh",
  },
  error: {
    color: "red",
    fontSize: "2rem",
    fontWeight: 300,
  },
};

export default ErrorBoundary;
