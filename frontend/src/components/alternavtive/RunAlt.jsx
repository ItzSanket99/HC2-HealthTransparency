import { AlternativesExplorer } from "./AlternativesExplorer";
import { useNavigate, useParams } from "react-router-dom";

// ✅ Import both from same file
import {
  mockKneeAlternatives,
  mockHeartAlternatives,
} from "../../data/mockAlternatives";

const RunAlt = () => {
  const navigate = useNavigate();
  const { condition } = useParams();

  const decodedCondition = decodeURIComponent(condition);

  let alternatives = [];

  if (decodedCondition === "Knee Pain") {
    alternatives = mockKneeAlternatives;
  } else if (decodedCondition === "Heart Surgery") {
    alternatives = mockHeartAlternatives;
  }

  return (
    <AlternativesExplorer
      searchParams={{ treatment: decodedCondition }}
      alternatives={alternatives}   // ✅ correct filtered data
      onBackToResults={() => navigate("/")}
    />
  );
};

export default RunAlt;
