import { useEffect, useState } from "react";
import {
  getAppointments,
  updateAppointmentStatus,
} from "../../utils/appointmentStorage";
import { sendAppointmentEmail } from "../../utils/sendAppointmentEmail";
import { generateDailyApprovedPDF } from "../../utils/generateDailyApprovedPDF";


export default function HospitalAppointments() {
  const [appointments, setAppointments] = useState([]);
  const hospitalUser = JSON.parse(localStorage.getItem("hospitalUser"));
  const [selectedDate, setSelectedDate] = useState("");

  const handleDownloadPDF = () => {
  if (!selectedDate) {
    alert("Please select a date");
    return;
  }

  const approvedForDay = appointments.filter(
    (appt) =>
      appt.status === "Approved" &&
      appt.date === selectedDate
  );

  if (approvedForDay.length === 0) {
    alert("No approved appointments for this date.");
    return;
  }

  generateDailyApprovedPDF(
    approvedForDay,
    selectedDate,
    hospitalUser.hospitalName
  );
};

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    const filtered = getAppointments().filter(
      (appt) => appt.hospitalId === hospitalUser?.hospitalId
    );
    setAppointments(filtered);
  };

  const handleUpdate = async (appt, status) => {
    let updatedDate = appt.date;
    let updatedTime = appt.time;

    if (status === "Rescheduled") {
      updatedDate = prompt(
        "Enter new date (YYYY-MM-DD)",
        appt.date
      );
      updatedTime = prompt(
        "Enter new time (HH:MM)",
        appt.time
      );

      if (!updatedDate || !updatedTime) return;
    }

    updateAppointmentStatus(appt.id, status, {
      date: updatedDate,
      time: updatedTime,
    });

    await sendAppointmentEmail(
      {
        ...appt,
        date: updatedDate,
        time: updatedTime,
      },
      status
    );

    refresh();
  };

  return (
    <div>
      <div className="flex justify-between mb-4" >
      <h1 className="text-3xl font-bold mb-6">
        Appointment Management
      </h1>

      <div className="flex items-center gap-4 mb-6">
        <input
          type="date"
          className="border p-2 rounded"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <button
          onClick={handleDownloadPDF}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Download Approved PDF
        </button>
      </div>
    </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">Condition</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appt) => (
              <tr
                key={appt.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-3">{appt.patientName}</td>
                <td className="p-3">{appt.condition}</td>
                <td className="p-3">{appt.date}</td>
                <td className="p-3">{appt.time}</td>

                <td className="p-3">
                  <span
                    className={`font-semibold ${
                      appt.status === "Approved"
                        ? "text-green-600"
                        : appt.status === "Rejected"
                        ? "text-red-600"
                        : appt.status === "Rescheduled"
                        ? "text-blue-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {appt.status}
                  </span>
                </td>

                <td className="p-3 space-x-2">
                  {/* ONLY SHOW BUTTONS IF PENDING */}
                  {appt.status === "Pending" ? (
                    <>
                      <button
                        onClick={() =>
                          handleUpdate(appt, "Approved")
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          handleUpdate(appt, "Rejected")
                        }
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={() =>
                          handleUpdate(appt, "Rescheduled")
                        }
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Reschedule
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400 text-sm">
                      No actions available
                    </span>
                  )}
                </td>
              </tr>
            ))}

            {appointments.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="p-6 text-center text-gray-500"
                >
                  No appointment requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
