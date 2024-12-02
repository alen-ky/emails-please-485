import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Email from "./Email";
import Sidebar from "./Sidebar";
import Controls from "./Controls";

const emailData = [
  {
    id: 0,
    Header: "Suspicious Activity Detected",
    Body: "We noticed unusual login attempts.",
    EmailSender: "noreply@securemail.com",
    EmailReceiver: "user@example.com",
    Errors: [{ ErrorType: "Urgency", ErrorField: "Header" }],
  },
  {
    id: 1,
    Header: "Your Account is Locked",
    Body: "Please update your information immediately to regain access.",
    EmailSender: "support@fakebank.com",
    EmailReceiver: "user@example.com",
    Errors: [{ ErrorType: "Suspicious Links", ErrorField: "Body" }],
  },
];

function EmailInspectionPage() {
  const { id } = useParams();
  const email = emailData.find((e) => e.id === parseInt(id));

  const [selectedError, setSelectedError] = useState(null);

  return (
    <div>
      <h2>{email.Header}</h2>
      <Email
        email={{
          from: email.EmailSender,
          to: email.EmailReceiver,
          header: email.Header,
          body: email.Body,
        }}
        selectedError={selectedError}
      />
      <Sidebar
        criteria={["Urgency", "Suspicious Links"]}
        onSelect={(error) => setSelectedError(error)}
      />
      <Controls onBlock={() => alert("Blocked")} onSend={() => alert("Sent")} />
    </div>
  );
}

export default EmailInspectionPage;
