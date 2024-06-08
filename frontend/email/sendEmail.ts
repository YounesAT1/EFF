"use server";
import { Resend } from "resend";
import FlightEmail from "./flight-booking-email";
import { generatePDF } from "./detailsPdf";
import fs from "fs";
import path from "path";

const resend = new Resend("re_ed4ySeJd_AAN2x1sSJjwgVBDTdTaEp9ay");

// Helper function to convert Blob to Buffer
const blobToBuffer = async (blob: any) => {
  return Buffer.from(await blob.arrayBuffer());
};

export const sendEmail = async (formData: any, flightOfferInfos: any) => {
  try {
    const senderEmail = formData.email;
    const fullName = `${formData.firstName} ${formData.lastName}`;

    // Generate the PDF content
    const pdfBlob = await generatePDF(
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.title,
      formData.nationality,
      formData.dateOfBirth,
      formData.phoneNumber,
      formData.passportNumber,
      flightOfferInfos?.outbound?.infos?.departureAirport,
      flightOfferInfos?.outbound?.infos?.arrivalAirport,
      flightOfferInfos?.outbound?.duration,
      flightOfferInfos?.departureDate,
      flightOfferInfos?.return?.infos?.departureAirport,
      flightOfferInfos?.return?.infos?.arrivalAirport,
      flightOfferInfos?.return?.duration,
      flightOfferInfos?.arrivalDate
    );

    // Convert Blob to Buffer
    const pdfBuffer = await blobToBuffer(pdfBlob);

    // Define the directory and file path
    const directory = path.join(process.cwd(), "public", "documents");
    const fileName = `invoice-${formData.email}.pdf`;
    const filePath = path.join(directory, fileName);

    // Ensure the directory exists
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    // Store the PDF on the server
    fs.writeFileSync(filePath, pdfBuffer);

    // Create a URL for the PDF file
    const pdfUrl = `http://localhost:3000/documents/${fileName}`;

    // Send the email
    await resend.emails.send({
      from: "Trevely <onboarding@resend.dev>",
      to: "youness.monkyde@gmail.com",
      reply_to: senderEmail,
      subject: `Hello ${fullName}, here is your reservation details`,
      react: FlightEmail({ formData, flightOfferInfos, pdfUrl }),
    });

    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
