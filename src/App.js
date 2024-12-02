import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import InboxPage from "./Inbox";
import SpamPage from "./Spam";
import EmailInspectionPage from "./EmailInspectionPage";
import "./App.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <a href="/" className="folder">
        Home
      </a>
      <a href="/inbox" className="folder">
        Inbox
      </a>
      <a href="/spam" className="folder">
        Spam
      </a>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="gmail-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="home-page">
                  <h2>Welcome to Email Inspector</h2>
                </div>
              }
            />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/spam" element={<SpamPage />} />
            <Route path="/email/:id" element={<EmailInspectionPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
