import React, { useState, useEffect } from "react";

const CurrencySelector = () => {
  const [currency, setCurrency] = useState("INR");

  const currencies = [
    { code: "INR", symbol: "₹", label: "Indian Rupee" },
    { code: "USD", symbol: "$", label: "US Dollar" },
    { code: "EUR", symbol: "€", label: "Euro" },
    { code: "GBP", symbol: "£", label: "British Pound" },
  ];

  const handleChange = (code) => {
    setCurrency(code);
    localStorage.setItem("currency", code);
    window.dispatchEvent(new CustomEvent("currencyChange", { detail: code }));
  };

  useEffect(() => {
    const saved = localStorage.getItem("currency");
    if (saved) setCurrency(saved);
  }, []);

  return (
    <select
      className="currency-selector"
      value={currency}
      onChange={(e) => handleChange(e.target.value)}
      aria-label="Select currency"
    >
      {currencies.map((c) => (
        <option key={c.code} value={c.code}>
          {c.symbol} {c.code}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelector;
