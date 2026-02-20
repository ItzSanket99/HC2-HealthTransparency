import { useEffect, useState } from "react";
import {
  getAppointments,
  updateAppointmentStatus,
} from "../../utils/appointmentStorage";
import { sendAppointmentEmail } from "../../utils/sendAppointmentEmail";
import { generateDailyApprovedPDF } from "../../utils/generateDailyApprovedPDF";

export default function HospitalAppointments() {
  const hospitalUser = JSON.parse(
    localStorage.getItem("hospitalUser")
  );

  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const refresh = () => {
    const all = getAppointments();

    const filtered = all.filter(
      (appt) =>
        appt.hospitalName === hospitalUser?.hospitalName
    );

    setAppointments(filtered);
  };

  useEffect(() => {
    refresh();
  }, []);

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

  return (
    <div>
      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold text-[#0f2f33]">

          Appointment Management
        </h1>

        <div className="flex items-center gap-4">
          <input
            type="date"
            className="border p-2 rounded"
            value={selectedDate}
            onChange={(e) =>
              setSelectedDate(e.target.value)
            }
          />

          <button
            onClick={handleDownloadPDF}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Download Approved PDF
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-[#e2e8ea]">

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
              <tr key={appt.id} className="border-t">
                <td className="p-3">
                  {appt.patientName}
                </td>
                <td className="p-3">
                  {appt.condition}
                </td>
                <td className="p-3">{appt.date}</td>
                <td className="p-3">{appt.time}</td>
                <td className="p-3 font-semibold">
                  {appt.status}
                </td>

                <td className="p-3 space-x-2">
                  {appt.status === "Pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleUpdate(
                            appt,
                            "Approved"
                          )
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          handleUpdate(
                            appt,
                            "Rejected"
                          )
                        }
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={() =>
                          handleUpdate(
                            appt,
                            "Rescheduled"
                          )
                        }
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Reschedule
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {appointments.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500"
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
