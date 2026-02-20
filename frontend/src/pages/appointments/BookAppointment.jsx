import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { mockSearchData } from "../../data/searchResults";
import {
  Star,
  Calendar,
  Clock,
  Shield,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MapPin,
  Building2,
} from "lucide-react";

export default function BookAppointment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { hospital, treatment, conditionName } = state || {};

  const [activeTab, setActiveTab] = useState("Highlights");
  const [patientType, setPatientType] = useState("new");
  const [selectedDate, setSelectedDate] = useState(null);

  /* ✅ NEW: time selection */
  const [selectedTime, setSelectedTime] = useState(null);

  if (!hospital) return null;

  const tabs = ["Highlights", "About", "Insurances", "Reviews"];

  /* FIND CORRECT CONDITION */
  const conditionData = mockSearchData.find((conditionItem) =>
    conditionItem.results.some(
      (h) =>
        h.hospitalId === hospital?.hospitalId &&
        h.treatments.some((t) => t.name === treatment?.name)
    )
  );

  const correctCondition = conditionData?.condition;

  /* ✅ TIME SLOTS */
  const timeSlots = [
    "09:00 AM",
    "10:30 AM",
    "12:00 PM",
    "02:00 PM",
    "03:30 PM",
    "05:00 PM",
  ];

  /* SAVE APPOINTMENT */
  const handleConfirmAppointment = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/signin", {
        state: { hospital, treatment, conditionName: correctCondition },
      });
      return;
    }

    if (!selectedDate) {
      alert("Please select a date");
      return;
    }

    if (!selectedTime) {
      alert("Please select a time");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      hospitalId: hospital.hospitalId,
      hospitalName: hospital.hospitalName,
      patientName: user.name,
      patientEmail: user.email,
      condition: correctCondition,
      treatmentName: treatment?.name,
      date: selectedDate,
      time: selectedTime,
      status: "Pending",
    };

    const existingAppointments =
      JSON.parse(localStorage.getItem("appointments")) || [];

    localStorage.setItem(
      "appointments",
      JSON.stringify([...existingAppointments, newAppointment])
    );

    alert("Appointment Request Sent!");

    /* ✅ NEW: redirect to home */
    navigate("/");
  };

  return (
    <div className="max-w-8xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">

      {/* ================= LEFT COLUMN ================= */}
      <div className="bg-white rounded-xl p-8 border border-gray-300 shadow-sm">

        <div className="flex gap-6 mb-8">
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
            <Building2 className="w-10 h-10 text-teal-700" />
          </div>

          <div>
            <h1 className="text-3xl font-semibold mb-1">
              {hospital.hospitalName}
            </h1>

            <p className="flex items-center gap-2 text-gray-600 mb-2">
              <MapPin className="w-4 h-4" />
              {hospital.city}, {hospital.state}
            </p>

            <div
              onClick={() =>
                navigate("/reviews", {
                  state: {
                    hospital,
                    condition: correctCondition,
                  },
                })
              }
              className="inline-flex items-center gap-2 bg-teal-100 text-teal-900 px-3 py-1.5 rounded cursor-pointer shadow-sm hover:bg-teal-200 transition"
            >
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {hospital.rating} – See all reviews
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">
            {treatment?.name}
          </h2>
          <p className="text-gray-600 text-sm max-w-2xl">
            {conditionName}
          </p>
        </div>

        {/* Highlights (unchanged) */}
        {activeTab === "Highlights" && (
          <div className="space-y-6">
            <div className="flex gap-4">
              <ThumbsUp className="w-6 h-6 text-teal-600" />
              <div>
                <h3 className="font-medium">Highly recommended</h3>
                <p className="text-sm text-gray-600">
                  Trusted by hundreds of patients
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="w-6 h-6 text-teal-600" />
              <div>
                <h3 className="font-medium">Efficient service</h3>
                <p className="text-sm text-gray-600">
                  Short waiting times and fast processing
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Calendar className="w-6 h-6 text-teal-600" />
              <div>
                <h3 className="font-medium">New patient appointments</h3>
                <p className="text-sm text-gray-600">
                  Appointments available for new patients
                </p>
              </div>
            </div>

            <div className="border-t border-gray-300 my-6" />

            <div className="flex gap-4">
              <Shield className="w-6 h-6 text-teal-600" />
              <div>
                <h3 className="font-medium">Insurance accepted</h3>
                <p className="text-sm text-gray-600">
                  Private & government schemes supported
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= RIGHT COLUMN ================= */}
      <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm h-fit sticky top-6">

        <h2 className="text-xl font-semibold mb-2">
          Book an appointment
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          The office partners with TreatWise to schedule appointments
        </p>

        <h3 className="text-sm font-medium mb-3">
          Scheduling details
        </h3>

        {/* DATE SELECTOR */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <ChevronLeft className="w-4 h-4 cursor-pointer" />
          <span>Fri, Feb 20 – Thu, Mar 5</span>
          <ChevronRight className="w-4 h-4 cursor-pointer" />
        </div>

        <div className="grid grid-cols-7 gap-2 text-xs mb-6">
          {Array.from({ length: 14 }).map((_, i) => {
            const date = `2026-02-${20 + i}`;
            return (
              <button
                key={i}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedTime(null);
                }}
                className={`p-2 rounded text-center border border-gray-300 shadow-sm ${
                  selectedDate === date
                    ? "bg-teal-600 text-white"
                    : "bg-teal-50 hover:bg-teal-100"
                }`}
              >
                <div>Mon</div>
                <div>Feb {20 + i}</div>
                <div className="text-[10px]">
                  {selectedDate === date ? "Selected" : "4 appts"}
                </div>
              </button>
            );
          })}
        </div>

        {/* ✅ TIME SELECTION (ADDED) */}
        {selectedDate && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">
              Select Time
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map((time, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 rounded border border-gray-300 shadow-sm text-sm ${
                    selectedTime === time
                      ? "bg-teal-600 text-white border-teal-600"
                      : "bg-white hover:bg-teal-50"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleConfirmAppointment}
          className="w-full bg-[#1f6f6b] text-white py-3 rounded-full font-medium hover:brightness-95 transition mt-5"
        >
          Confirm Appointment
        </button>

      </div>
    </div>
  );
}
