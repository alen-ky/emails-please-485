import React from "react";
import { useNavigate } from "react-router-dom";

const inboxEmails = [
  {
    id: 0,
    sender: "noreply@securemail.com",
    subject: "Suspicious Activity Detected",
  },
  { id: 1, sender: "support@fakebank.com", subject: "Your Account is Locked" },
];

function InboxPage() {
  const navigate = useNavigate();

  const handleEmailClick = (id) => {
    navigate(`/email/${id}`);
  };

  return (
    <div>
      <h2>Inbox</h2>
      <ul>
        {inboxEmails.map((email) => (
          <li
            key={email.id}
            onClick={() => handleEmailClick(email.id)}
            className="email-item"
          >
            <strong>{email.sender}</strong>: {email.subject}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InboxPage;
