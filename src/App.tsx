/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import VoiceAssistant from "./pages/VoiceAssistant";
import DocumentVerification from "./pages/DocumentVerification";
import LiveChat from "./pages/LiveChat";
import EmergencyServices from "./pages/EmergencyServices";
import RescueNumbers from "./pages/RescueNumbers";
import SafetyTips from "./pages/SafetyTips";
import VisaCheck from "./pages/VisaCheck";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/voice-assistant" element={<VoiceAssistant />} />
                <Route path="/visa-check" element={<VisaCheck />} />
                <Route
                  path="/document-verification"
                  element={<DocumentVerification />}
                />
                <Route path="/live-chat" element={<LiveChat />} />
                <Route
                  path="/emergency-services"
                  element={<EmergencyServices />}
                />
                <Route path="/rescue-numbers" element={<RescueNumbers />} />
                <Route path="/safety-tips" element={<SafetyTips />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
