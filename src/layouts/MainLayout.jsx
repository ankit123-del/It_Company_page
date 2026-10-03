import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-content">
        <div className="container">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
