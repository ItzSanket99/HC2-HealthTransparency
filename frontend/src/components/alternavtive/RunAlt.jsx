import React, { useState } from 'react'
import { AlternativesExplorer } from './AlternativesExplorer';
import { useNavigate } from 'react-router-dom';
 
const RunAlt = () => {
    const [showAlternatives, setShowAlternatives] = useState(true);
    const navigate = useNavigate();

  const searchParams = {
    treatment: "Knee Pain",
  };
  return (
    <>
      {showAlternatives && (
        <AlternativesExplorer
          searchParams={searchParams}
          onBackToResults={() => navigate("/")}
        />
      )}
    </>
  )
}

export default RunAlt