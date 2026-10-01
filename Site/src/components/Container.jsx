function Container({ children, className = "" }) {
  return (
    <div className={`px-5 sm:px-8 lg:px-16 max-w-7xl mx-auto ${className}`}>
      {children}
    </div>
  );
}

export default Container;
