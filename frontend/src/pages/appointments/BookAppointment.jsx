import { useState, useEffect } from "react";
import { saveAppointment } from "../../utils/appointmentStorage";
import { useNavigate, useLocation } from "react-router-dom";

export default function BookAppointment() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  const { hospital, treatment } = location.state || {};

const finalCondition = treatment?.name;


  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/signin", {
        state: {
          from: "/book",
          hospital,
          condition: finalCondition,
        },
      });
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate, hospital, finalCondition]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = () => {
    if (!date || !time) {
      alert("Please select date and time");
      return;
    }

    if (!hospital || !finalCondition) {
      alert("Invalid booking request");
      navigate("/");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      hospitalId: hospital.hospitalId,
      hospitalName: hospital.hospitalName,
      patientName: user.name,
      patientEmail: user.email,
      condition: finalCondition,
      treatmentId: treatment?.treatmentId || null,
      date,
      time,
      status: "Pending",
    };

    saveAppointment(newAppointment);

    alert("Appointment Request Sent!");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">
        Book Appointment - {hospital?.hospitalName}
      </h2>

      <p className="text-gray-600 mb-2">
        Condition: {finalCondition}
      </p>

      <input
        type="date"
        className="border p-2 w-full mb-3"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        type="time"
        className="border p-2 w-full mb-3"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Confirm Appointment
      </button>
    </div>
  );
}
