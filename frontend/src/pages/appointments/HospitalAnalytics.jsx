import { useEffect, useState } from "react";
import { getAppointments } from "../../utils/appointmentStorage";

export default function HospitalAnalytics() {
  const hospitalUser = JSON.parse(
    localStorage.getItem("hospitalUser")
  );

  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  useEffect(() => {
    const all = getAppointments().filter(
      (appt) =>
        appt.hospitalName === hospitalUser?.hospitalName
    );

    setStats({
      total: all.length,
      approved: all.filter(
        (a) => a.status === "Approved"
      ).length,
      pending: all.filter(
        (a) => a.status === "Pending"
      ).length,
      rejected: all.filter(
        (a) => a.status === "Rejected"
      ).length,
    });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Hospital Analytics
      </h1>

      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Total Requests"
          value={stats.total}
        />
        <StatCard
          title="Approved"
          value={stats.approved}
        />
        <StatCard
          title="Pending"
          value={stats.pending}
        />
        <StatCard
          title="Rejected"
          value={stats.rejected}
        />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 shadow rounded-xl">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}
