// lib/generatePdf.ts
import { jsPDF } from "jspdf";

export const generatePDF = (
  firstName: string,
  lastName: string,
  email: string,
  title: string,
  nationality: string,
  dateOfBirth: string,
  phoneNumber: string,
  passportNumber: string,
  outboundFrom: string,
  outboundTo: string,
  outboundDuration: string,
  outboundDate: string,
  returnFrom: string,
  returnTo: string,
  returnDuration: string,
  returnDate: string
) => {
  const doc = new jsPDF();
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const titleX = 15,
    titleY = 20;
  const infoX1 = 15;
  const infoStartY = 40,
    infoIncrement = 10;

  // Add title
  doc.setFontSize(18);
  doc.text("Flight Details", titleX, titleY);

  // Add general information
  doc.setFontSize(12);
  doc.text(`Date: ${currentDate}`, infoX1, infoStartY);
  doc.text(`Time: ${currentTime}`, infoX1, infoStartY + infoIncrement);
  doc.text(
    `Passenger: ${title}. ${firstName} ${lastName}`,
    infoX1,
    infoStartY + 2 * infoIncrement
  );
  doc.text(`Email: ${email}`, infoX1, infoStartY + 3 * infoIncrement);
  doc.text(
    `Nationality: ${nationality}`,
    infoX1,
    infoStartY + 4 * infoIncrement
  );
  doc.text(
    `Date of Birth: ${dateOfBirth}`,
    infoX1,
    infoStartY + 5 * infoIncrement
  );
  doc.text(
    `Phone Number: ${phoneNumber}`,
    infoX1,
    infoStartY + 6 * infoIncrement
  );
  doc.text(
    `Passport Number: ${passportNumber}`,
    infoX1,
    infoStartY + 7 * infoIncrement
  );

  // Add outbound flight details
  doc.setFont("helvetica", "bold");
  doc.text("Outbound Flight Details:", infoX1, infoStartY + 9 * infoIncrement);
  doc.setFont("helvetica", "normal");
  doc.text(`From: ${outboundFrom}`, infoX1, infoStartY + 10 * infoIncrement);
  doc.text(`To: ${outboundTo}`, infoX1, infoStartY + 11 * infoIncrement);
  doc.text(
    `Duration: ${outboundDuration}`,
    infoX1,
    infoStartY + 12 * infoIncrement
  );
  doc.text(`Date: ${outboundDate}`, infoX1, infoStartY + 13 * infoIncrement);

  // Add return flight details
  doc.setFont("helvetica", "bold");
  doc.text("Return Flight Details:", infoX1, infoStartY + 15 * infoIncrement);
  doc.setFont("helvetica", "normal");
  doc.text(`From: ${returnFrom}`, infoX1, infoStartY + 16 * infoIncrement);
  doc.text(`To: ${returnTo}`, infoX1, infoStartY + 17 * infoIncrement);
  doc.text(
    `Duration: ${returnDuration}`,
    infoX1,
    infoStartY + 18 * infoIncrement
  );
  doc.text(`Date: ${returnDate}`, infoX1, infoStartY + 19 * infoIncrement);

  // Save the PDF
  return doc.output("blob");
};
