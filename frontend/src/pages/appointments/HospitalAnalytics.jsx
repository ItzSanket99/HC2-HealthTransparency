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
      <h1 className="text-4xl font-bold text-[#0f2f33] mb-10">
        Hospital Analytics
      </h1>

      <div className="grid grid-cols-4 gap-8">

        <StatCard
          title="Total Requests"
          value={stats.total}
          color="bg-[#e0f2f1]"
        />

        <StatCard
          title="Approved"
          value={stats.approved}
          color="bg-[#d1fae5]"
        />

        <StatCard
          title="Pending"
          value={stats.pending}
          color="bg-[#fef3c7]"
        />

        <StatCard
          title="Rejected"
          value={stats.rejected}
          color="bg-[#fee2e2]"
        />

      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className={`${color} p-8 rounded-2xl shadow-md`}>
      <h3 className="text-[#5f7a7f] text-sm mb-2">
        {title}
      </h3>

      <p className="text-4xl font-bold text-[#0f2f33]">
        {value}
      </p>
    </div>
  );
}
