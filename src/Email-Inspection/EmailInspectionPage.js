import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Email from "../Email";
import Controls from "../Controls";
import Sidebar from "../Sidebar";
import emailData from "../emails_level_1.json";
import "./EmailInspectionPage.css";

function EmailInspectionPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const email = emailData.find((e) => e.id === parseInt(id, 10));

    const [selectedError, setSelectedError] = useState(null);
    const [accuracyScore, setAccuracyScore] = useState(63.9);
    const [attemptedFields, setAttemptedFields] = useState({});
    const [fieldHighlights, setFieldHighlights] = useState({});

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

        setAccuracyScore((prev) => (isCorrect ? Math.min(prev + 20, 100) : Math.max(prev * 0.9, 0)));
        setFieldHighlights((prev) => ({
            ...prev,
            [field]: isCorrect ? "correct" : "incorrect",
        }));
    };

    if (!email) {
        return <div>Error: Email not found</div>;
    }

    return (
        <div className="email-inspection-page">
            <div className="points-counter">Accuracy Score: {accuracyScore.toFixed(1)}%</div>
            <h2>{email.Header}</h2>
            <Email
                email={{
                    from: email.EmailSender,
                    to: email.EmailReceiver,
                    header: email.Header,
                    body: email.Body,
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
            />

            {/* Go Back Home Button */}
            <div className="back-home-button">
                <button onClick={() => navigate("/")}>Go Back Home</button>
            </div>
        </div>
    );
}

export default EmailInspectionPage;
