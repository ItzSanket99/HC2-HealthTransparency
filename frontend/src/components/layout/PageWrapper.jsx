const PageWrapper = ({ children }) => {
  return (
    <div id="page-content" style={{ width: "100%" }}>
      {children}
    </div>
  );
};

export default PageWrapper;
