import React from "react";
import "./LocaleSelect.css";
import { useLocale, useSetLocale } from "./contexts/LocaleContext";

function LocaleSelect(props) {
  //   const { locale, setLocale } = useContext(LocaleContext);
  const locale = useLocale();
  const setLocale = useSetLocale();

  const handleChange = (e) => {
    setLocale(e.target.value);
  };
  return (
    <div>
      <select className="LocaleSelect" value={locale} onChange={handleChange}>
        <option value="ko">한국어</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}

export default LocaleSelect;
