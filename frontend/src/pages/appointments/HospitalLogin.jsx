import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockSearchData } from "../../data/searchResults";

export default function HospitalLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hospitals = mockSearchData[0].results;

  const handleLogin = () => {
    const hospital = hospitals.find(
      (h) =>
        h.hospitalName.toLowerCase().replace(/\s/g, "") ===
        email.toLowerCase()
    );

    if (!hospital) {
      alert("Hospital not found");
      return;
    }

    // Fake password check
    if (password !== "1234") {
      alert("Wrong password");
      return;
    }

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
    <div className="p-6 max-w-sm mx-auto bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">Hospital Login</h2>

      <input
        type="text"
        placeholder="Enter hospital name (no spaces)"
        className="border p-2 w-full mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password (1234)"
        className="border p-2 w-full mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-purple-600 text-white px-4 py-2 rounded w-full"
      >
        Login
      </button>
    </div>
  );
}