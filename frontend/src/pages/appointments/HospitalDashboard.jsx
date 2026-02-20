import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HospitalAnalytics from "./HospitalAnalytics";
import HospitalAppointments from "./HospitalAppointments";

export default function HospitalDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("analytics");
  const [hospitalUser, setHospitalUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("hospitalUser");

    if (!storedUser) {
      navigate("/hospital-login");
    } else {
      setHospitalUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  if (!hospitalUser) return null;

  return (
    <div className="flex min-h-screen w-full bg-[#f6f8f8]">

      <div className="w-72 bg-[#0f766e] text-white p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-10">
          {hospitalUser.hospitalName}
        </h2>

        <div className="space-y-3">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`w-full text-left px-4 py-3 rounded-lg transition ${
              activeTab === "analytics"
                ? "bg-white text-[#0f766e] font-semibold"
                : "hover:bg-[#115e59]"
            }`}
          >
            📊 Dashboard
          </button>

          <button
            onClick={() => setActiveTab("appointments")}
            className={`w-full text-left px-4 py-3 rounded-lg transition ${
              activeTab === "appointments"
                ? "bg-white text-[#0f766e] font-semibold"
                : "hover:bg-[#115e59]"
            }`}
          >
            📅 Appointments
          </button>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("hospitalUser");
            navigate("/");
          }}
          className="mt-12 w-full bg-red-500 hover:bg-red-600 transition px-4 py-3 rounded-lg font-semibold"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 px-12 py-12">
        {activeTab === "analytics" && <HospitalAnalytics />}
        {activeTab === "appointments" && <HospitalAppointments />}
      </div>
    </div>
  );
}
