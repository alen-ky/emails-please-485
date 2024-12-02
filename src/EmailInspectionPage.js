import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Email from "./Email";
import Controls from "./Controls";
import Sidebar from "./Sidebar";
import emailData from "./emails_level_1.json"; // Ensure correct path to email data

function EmailInspectionPage() {
  const { id } = useParams();
  const email = emailData.find((e) => e.id === parseInt(id, 10)); // Find email by ID

  // Move all hooks to the top
  const [selectedError, setSelectedError] = useState(null);
  const [accuracyScore, setAccuracyScore] = useState(63.9); // Initial accuracy score
  const [attemptedFields, setAttemptedFields] = useState({});
  const [fieldHighlights, setFieldHighlights] = useState({}); // Correct/incorrect field indicators

  // If email is not found, return an error page
  if (!email) {
    return <div>Error: Email not found</div>;
  }

  // Handle field clicks for inspection
  const handleFieldClick = (field) => {
    if (!selectedError) {
      alert("Please select an error type first!");
      return;
    }

    const currentAttempts = attemptedFields[selectedError] || [];
    if (currentAttempts.includes(field)) return;

    setAttemptedFields((prev) => ({
      ...prev,
      [selectedError]: [...currentAttempts, field],
    }));

    const isCorrect = email.Errors.some(
      (error) =>
        error.ErrorType.toLowerCase() === selectedError.toLowerCase() &&
        error.ErrorField.toLowerCase() === field.toLowerCase()
    );

    setAccuracyScore((prev) =>
      isCorrect ? Math.min(prev + 20, 100) : Math.max(prev * 0.9, 0)
    );
    setFieldHighlights((prev) => ({
      ...prev,
      [field]: isCorrect ? "correct" : "incorrect",
    }));
  };

  return (
    <div>
      <div className="points-counter">
        Accuracy Score: {accuracyScore.toFixed(1)}%
      </div>
      <h2>{email.Header}</h2>
      <Email
        email={{
          header: email.Header,
          from: email.EmailSender,
          to: email.EmailReceiver,
          body: email.Body,
          images: email.Images,
        }}
        selectedError={selectedError}
        attemptedFields={attemptedFields}
        onFieldClick={handleFieldClick}
        fieldHighlights={fieldHighlights}
      />
      <Sidebar
        criteria={[
          "Sender's Email Address",
          "Urgency",
          "Threat",
          "Suspicious Links",
          "Grammar Errors",
          "Asking for Sensitive Information",
          "Suspicious Attachments",
          "Fake Branding",
          "Suspicious Content",
          "Mismatched Content",
        ]}
        onSelect={setSelectedError}
      />
      <Controls
        onBlock={() => alert("Blocked!")}
        onSend={() => alert("Sent!")}
        isSendDisabled={false}
      />
    </div>
  );
}

export default EmailInspectionPage;
