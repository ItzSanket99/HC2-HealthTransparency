import { useLocation } from "react-router-dom";
import AISummary from "../ai/AISummary";

const PageWrapper = ({ children }) => {
  const location = useLocation();

  const hideAIOnReviews = location.pathname.startsWith("/reviews");

  return (
    <div id="page-content" style={{ width: "100%" }}>
      {children}

      {!hideAIOnReviews && <AISummary />}
    </div>
  );
};

export default PageWrapper;
