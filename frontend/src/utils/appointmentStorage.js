export const getAppointments = () => {
  return JSON.parse(localStorage.getItem("appointments")) || [];
};

export const saveAppointment = (appointment) => {
  const existing = getAppointments();
  localStorage.setItem(
    "appointments",
    JSON.stringify([...existing, appointment])
  );
};

export const updateAppointmentStatus = (id, status, extra = {}) => {
  const updated = getAppointments().map((appt) =>
    appt.id === id
      ? { ...appt, status, ...extra }
      : appt
  );

  localStorage.setItem("appointments", JSON.stringify(updated));
};
