import { useState, useEffect } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    let currentValue;
    const val = JSON.parse(localStorage.getItem(key));
    try {
      currentValue = JSON.parse(
        localStorage.getItem(key) || String(defaultValue)
      );
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(value);
    console.log(JSON.parse(localStorage.getItem(key)));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
