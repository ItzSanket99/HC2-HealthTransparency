import emailjs from "@emailjs/browser";

export const sendAppointmentEmail = async (appointment, status) => {
  let templateId = "";

  // If Approved → Use Confirmation Template
  if (status === "Approved") {
    templateId = "template_4qv9ncj";
  } else {
    // For Rescheduled + Rejected/Canceled → Use Update Template
    templateId = "template_vybqo9s";
  }

  try {
    const response = await emailjs.send(
      "gmail_service_123",
      templateId,
      {
        patient_name: appointment.patientName,
        patient_email: appointment.patientEmail,
        hospital_name: appointment.hospitalName,
        condition: appointment.condition,
        date: appointment.date,
        time: appointment.time,
        status: status,
      },
      "BSggKoeGqgjJZeVYZ"
    );

    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Email failed:", error);
  }
};
