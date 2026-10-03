import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { analyticsApi } from "../api/analyticsApi";

export const useVisitorTracking = () => {
  const location = useLocation();

  const getSessionId = () => {
    let sessionId = sessionStorage.getItem("visitor_session_id");
    if (!sessionId) {
      sessionId =
        "session_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem("visitor_session_id", sessionId);
    }
    return sessionId;
  };

  useEffect(() => {
    const track = async () => {
      const skipPaths = [
        "/admin",
        "/portal",
        "/employee",
        "/login",
        "/register",
      ];
      if (skipPaths.some((path) => location.pathname.startsWith(path))) {
        return;
      }

      await analyticsApi.track({
        page: location.pathname + location.search,
        referrer: document.referrer || "Direct",
        screenSize: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language || "en",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
        sessionId: getSessionId(),
      });
    };

    const timer = setTimeout(track, 500);
    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);
};
