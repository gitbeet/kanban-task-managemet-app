import { createContext, useContext, useState } from "react";

const darkModeContext = createContext();

export function useDarkMode() {
  const context = useContext(darkModeContext);
  if (!context) throw new Error("Dark mode context not found");
  return context;
}

export default function DarkmodeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  return (
    <darkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </darkModeContext.Provider>
  );
}
