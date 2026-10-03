import React, { useState, useEffect } from "react";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="pwa-prompt">
      <div className="pwa-prompt-content">
        <span className="pwa-icon">📱</span>
        <div>
          <strong>Install Our App</strong>
          <p>Get faster access to our services</p>
        </div>
      </div>
      <div className="pwa-actions">
        <button
          className="btn btn-outline btn-sm"
          onClick={() => setShow(false)}
        >
          Not Now
        </button>
        <button className="btn btn-primary btn-sm" onClick={handleInstall}>
          Install
        </button>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
