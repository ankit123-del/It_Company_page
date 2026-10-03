import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ===== PROVIDERS =====
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { RBACProvider } from "./context/RBACContext";
import { RealtimeProvider } from "./context/RealtimeContext";

// ===== LAYOUT =====
import MainLayout from "./layouts/MainLayout";

// ===== GLOBAL FLOATING COMPONENTS =====
import ScrollToTop from "./components/common/ScrollToTop";
import CookieConsent from "./components/common/CookieConsent";
import SmartChatBot from "./components/common/SmartChatBot";
import WhatsAppButton from "./components/common/WhatsAppButton";
import NewsletterPopup from "./components/common/NewsletterPopup";
import ExitIntentPopup from "./components/common/ExitIntentPopup";
import PWAInstallPrompt from "./components/common/PWAInstallPrompt";
import ReadingProgress from "./components/common/ReadingProgress";
import CommandPalette from "./components/common/CommandPalette";
import KeyboardShortcuts from "./components/common/KeyboardShortcuts";
import Announcements from "./components/common/Announcements";
import OnboardingTour from "./components/common/OnboardingTour";
import VisitorTracker from "./components/common/VisitorTracker";

// ===== PUBLIC PAGES =====
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import CompareServices from "./pages/CompareServices";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Careers from "./pages/Careers";
import Portfolio from "./pages/Portfolio";
import CaseStudies from "./pages/CaseStudies";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import KnowledgeBase from "./pages/KnowledgeBase";
import QuoteGenerator from "./pages/QuoteGenerator";
import SpeedTester from "./pages/SpeedTester";
import SEOAnalyzer from "./pages/SEOAnalyzer";

// ===== CLIENT / USER PAGES =====
import Analytics from "./pages/Analytics";
import ProjectTracker from "./pages/ProjectTracker";
import ClientPortal from "./pages/ClientPortal";
import Invoices from "./pages/Invoices";
import Support from "./pages/Support";

// ===== EMPLOYEE PAGES =====
import EmployeePortal from "./pages/EmployeePortal";
import TimeTracking from "./pages/TimeTracking";

// ===== MANAGER / ADMIN PAGES =====
import KanbanBoard from "./pages/KanbanBoard";
import CRM from "./pages/CRM";
import AdminPanel from "./pages/AdminPanel";

// ===== ENTERPRISE FEATURES =====
import TeamChat from "./pages/TeamChat";
import OKR from "./pages/OKR";
import APIKeys from "./pages/APIKeys";
import SecuritySettings from "./pages/SecuritySettings";
import WorkflowBuilder from "./pages/WorkflowBuilder";
import Leaderboard from "./pages/Leaderboard";

// ===== NEW ULTRA-PREMIUM FEATURES =====
import AIAssistant from "./pages/AIAssistant";
import Billing from "./pages/Billing";
import PrivacyCenter from "./pages/PrivacyCenter";

// ===== 404 =====
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <RBACProvider role="admin">
          <RealtimeProvider>
            <Router>
              {/* ===== VISITOR TRACKER (inside Router) ===== */}
              <VisitorTracker />

              {/* ===== TOP PROGRESS BAR ===== */}
              <ReadingProgress />

              {/* ===== GLOBAL UI OVERLAYS ===== */}
              <CommandPalette />
              <KeyboardShortcuts />
              <OnboardingTour />

              {/* ===== MAIN LAYOUT ===== */}
              <MainLayout>
                <Routes>
                  {/* ==================== PUBLIC ROUTES ==================== */}
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route
                    path="/services/compare"
                    element={<CompareServices />}
                  />
                  <Route path="/services/:slug" element={<ServiceDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/case-studies" element={<CaseStudies />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/docs" element={<KnowledgeBase />} />
                  <Route path="/docs/:id" element={<KnowledgeBase />} />
                  <Route path="/quote" element={<QuoteGenerator />} />
                  <Route path="/tools/speed-test" element={<SpeedTester />} />
                  <Route path="/tools/seo-analyzer" element={<SEOAnalyzer />} />

                  {/* ==================== CLIENT / USER ROUTES ==================== */}
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/tracker" element={<ProjectTracker />} />
                  <Route path="/portal" element={<ClientPortal />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/support" element={<Support />} />

                  {/* ==================== EMPLOYEE ROUTES ==================== */}
                  <Route path="/employee" element={<EmployeePortal />} />
                  <Route path="/timesheet" element={<TimeTracking />} />

                  {/* ==================== MANAGER / ADMIN ROUTES ==================== */}
                  <Route path="/kanban" element={<KanbanBoard />} />
                  <Route path="/crm" element={<CRM />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/admin/:section" element={<AdminPanel />} />

                  {/* ==================== ENTERPRISE FEATURES ==================== */}
                  <Route path="/chat" element={<TeamChat />} />
                  <Route path="/okr" element={<OKR />} />
                  <Route path="/api-keys" element={<APIKeys />} />
                  <Route path="/security" element={<SecuritySettings />} />
                  <Route path="/workflows" element={<WorkflowBuilder />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />

                  {/* ==================== ULTRA-PREMIUM FEATURES ==================== */}
                  <Route path="/ai" element={<AIAssistant />} />
                  <Route path="/billing" element={<Billing />} />
                  <Route path="/privacy" element={<PrivacyCenter />} />

                  {/* ==================== 404 NOT FOUND ==================== */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </MainLayout>

              {/* ==================== GLOBAL FLOATING COMPONENTS ==================== */}
              <ScrollToTop />
              <CookieConsent />
              <SmartChatBot />
              <WhatsAppButton />
              <NewsletterPopup />
              <ExitIntentPopup />
              <PWAInstallPrompt />
              <Announcements />
            </Router>
          </RealtimeProvider>
        </RBACProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
