import React from "react";
import { useNavigate } from "react-router-dom";

const spamEmails = [
  { id: 2, sender: "spam@phishy.com", subject: "Claim your prize now!" },
  {
    id: 3,
    sender: "fake@lottery.com",
    subject: "You've won a million dollars!",
  },
];

function SpamPage() {
  const navigate = useNavigate();

  const handleEmailClick = (id) => {
    navigate(`/email/${id}`);
  };

  return (
    <div>
      <h2>Spam</h2>
      <ul>
        {spamEmails.map((email) => (
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

export default SpamPage;
