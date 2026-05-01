import React from "react";
import ErrorPage from "./ErrorPage.jsx";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <ErrorPage 
            errorCode="500" 
            description="Terjadi kesalahan internal pada sistem (JS Error). Mohon segarkan halaman atau hubungi admin." 
            image="https://cdn-icons-png.flaticon.com/512/595/595067.png"
        />
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
