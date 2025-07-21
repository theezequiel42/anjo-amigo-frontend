function LoadingIndicator() {
  return (
    <div id="loading-indicator" className="loading-indicator" role="status">
      <span className="sr-only">Carregando...</span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  );
}

export default LoadingIndicator;
