import { useEffect, useState } from "react";
import { getAppointments } from "../../utils/appointmentStorage";

export default function HospitalAnalytics() {
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    rescheduled: 0,
  });

  const hospitalUser = JSON.parse(
    localStorage.getItem("hospitalUser")
  );

  useEffect(() => {
    const all = getAppointments().filter(
      (appt) => appt.hospitalId === hospitalUser?.hospitalId
    );

    setStats({
      total: all.length,
      approved: all.filter(a => a.status === "Approved").length,
      rejected: all.filter(a => a.status === "Rejected").length,
      pending: all.filter(a => a.status === "Pending").length,
      rescheduled: all.filter(a => a.status === "Rescheduled").length,
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Hospital Analytics Overview
      </h1>

      <div className="grid grid-cols-4 gap-6">
        <StatCard title="Total Requests" value={stats.total} />
        <StatCard title="Approved" value={stats.approved} color="green" />
        <StatCard title="Pending" value={stats.pending} color="yellow" />
        <StatCard title="Rejected" value={stats.rejected} color="red" />
      </div>
    </div>
  );
}

function StatCard({ title, value, color = "blue" }) {
  return (
    <div className="bg-white shadow-lg p-6 rounded-xl">
      <h3 className="text-gray-500">{title}</h3>
      <p className={`text-3xl font-bold text-${color}-600`}>
        {value}
      </p>
    </div>
  );
}
