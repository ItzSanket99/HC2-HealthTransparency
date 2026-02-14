import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HospitalAnalytics from "./HospitalAnalytics";
import HospitalAppointments from "./HospitalAppointments";
import { useState } from "react";

export default function HospitalDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("analytics");

  const hospitalUser = JSON.parse(
    localStorage.getItem("hospitalUser")
  );

  useEffect(() => {
    if (!hospitalUser) {
      navigate("/hospital-login");
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6">
        <h2 className="text-xl font-bold mb-6">
          {hospitalUser?.hospitalName}
        </h2>

        <button
          onClick={() => setActiveTab("analytics")}
          className="block w-full text-left mb-3 hover:bg-blue-700 p-2 rounded"
        >
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab("appointments")}
          className="block w-full text-left mb-3 hover:bg-blue-700 p-2 rounded"
        >
          Appointments
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("hospitalUser");
            navigate("/");
          }}
          className="block w-full text-left mt-6 bg-red-600 p-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === "analytics" && <HospitalAnalytics />}
        {activeTab === "appointments" && <HospitalAppointments />}
      </div>
    </div>
  );
}
