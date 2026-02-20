import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockSearchData } from "../../data/searchResults";

const HospitalLogin = () => {
  const navigate = useNavigate();
  const [hospitalNameInput, setHospitalNameInput] = useState("");
  const [password, setPassword] = useState("");

  // Flatten all hospitals
  const hospitals = mockSearchData.flatMap(
    (condition) => condition.results
  );

  const handleLogin = (e) => {
    e.preventDefault();

    if (!hospitalNameInput || !password) {
      alert("Please enter hospital name and password");
      return;
    }

    // Find hospital by lowercase name without spaces
    const hospital = hospitals.find((h) => {
      const formattedName = h.hospitalName
        .toLowerCase()
        .replace(/\s/g, "");

      return formattedName === hospitalNameInput;
    });

    if (!hospital) {
      alert("Hospital not found");
      return;
    }

    if (password !== "1234") {
      alert("Wrong password");
      return;
    }

    // Save hospital user
    localStorage.setItem(
      "hospitalUser",
      JSON.stringify({
        hospitalId: hospital.hospitalId,
        hospitalName: hospital.hospitalName,
        role: "hospital",
      })
    );

    navigate("/hospital-dashboard");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <div className="auth-form-section">
          <h1>Hospital Portal</h1>
          <p className="auth-subtitle">
            Login to manage appointments and analytics
          </p>

          <form className="auth-form" onSubmit={handleLogin}>
            <label>Hospital Name</label>
            <input
              type="text"
              placeholder="Enter hospital name"
              value={hospitalNameInput}
              onChange={(e) =>
                setHospitalNameInput(
                  e.target.value.toLowerCase().replace(/\s/g, "")
                )
              }
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="auth-btn" type="submit">
              Login
            </button>
          </form>

          <p className="auth-footer">
            Back to{" "}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-teal-700 font-medium underline"
            >
              Home
            </button>
          </p>
        </div>

        <div className="auth-visual">
          <h2>
            Manage Requests.<br />
            Track Patients.<br />
            Grow Trust.
          </h2>
        </div>

      </div>
    </div>
  );
};

export default HospitalLogin;
