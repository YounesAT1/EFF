import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

export interface EmailProps {
  formData: any;
  flightOfferInfos: any;
  pdfUrl: string; // Add pdfUrl to the props
}

export default function FlightEmail({
  formData,
  flightOfferInfos,
  pdfUrl,
}: EmailProps) {
  const headingStyle: React.CSSProperties = {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#6a0dad",
    textAlign: "center",
  };

  const paragraphStyle: React.CSSProperties = {
    fontSize: "16px",
    marginBottom: "20px",
    textAlign: "center",
  };

  const buttonStyle: React.CSSProperties = {
    display: "inline-block",
    backgroundColor: "#6a0dad",
    borderRadius: "3px",
    color: "#fff",
    fontWeight: "bold",
    border: "1px solid rgba(0,0,0,0.1)",
    cursor: "pointer",
    padding: "12px 30px",
    textDecoration: "none",
    fontSize: "16px",
    marginBottom: "20px",
    textAlign: "center",
  };

  const hrStyle: React.CSSProperties = {
    border: "none",
    borderTop: "1px solid #ddd",
    margin: "30px 0",
  };

  return (
    <Html>
      <Head />
      <Preview>Notification from Travely</Preview>
      <Tailwind>
        <Body>
          <Container>
            <Section>
              <Heading style={headingStyle}>
                Hello {formData.firstName} {formData.lastName},<br />
                Thank you for choosing Travely!
              </Heading>
              <p style={paragraphStyle}>
                We are thrilled to let you know that your flight has been
                successfully booked. Get ready for an amazing adventure ahead!
              </p>
              <p style={paragraphStyle}>
                Do not forget to download your invoice from our website.
              </p>
              <div style={{ textAlign: "center" }}>
                <a href={pdfUrl} style={buttonStyle} download>
                  Download Invoice
                </a>
              </div>
              <Hr style={hrStyle} />
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
