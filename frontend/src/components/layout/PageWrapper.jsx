import { useLocation } from "react-router-dom";
import AISummary from "../ai/AISummary";

const PageWrapper = ({ children }) => {
  const location = useLocation();
  const hideAIOnReviews = location.pathname.startsWith("/reviews");

  return (
    <div id="page-content" className="w-full bg-white">

      {/* Global page gutter */}
      <div className="px-5 md:px-8 lg:px-10 xl:px-14">
        {children}
      </div>

      {!hideAIOnReviews && <AISummary />}
    </div>
  );
};

export default PageWrapper;
