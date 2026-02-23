import { createContext, useContext, useState, useEffect } from "react";

const GuestContext = createContext(null);

export const useGuest = () => {
  const context = useContext(GuestContext);
  if (!context) {
    throw new Error("useGuest must be used within a GuestProvider");
  }
  return context;
};

export const GuestProvider = ({ children }) => {
  const [isGuestMode, setIsGuestMode] = useState(() => {
    return localStorage.getItem("guestMode") === "true";
  });
  const [guestApiKey, setGuestApiKey] = useState(() => {
    return localStorage.getItem("guestApiKey") || "";
  });
  const [searchCount, setSearchCount] = useState(() => {
    const saved = localStorage.getItem("guestSearchCount");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [guestProfiles, setGuestProfiles] = useState([]);

  // Persist guest mode state
  useEffect(() => {
    localStorage.setItem("guestMode", isGuestMode.toString());
  }, [isGuestMode]);

  // Persist API key
  useEffect(() => {
    if (guestApiKey) {
      localStorage.setItem("guestApiKey", guestApiKey);
    } else {
      localStorage.removeItem("guestApiKey");
    }
  }, [guestApiKey]);

  // Persist search count
  useEffect(() => {
    localStorage.setItem("guestSearchCount", searchCount.toString());
  }, [searchCount]);

  const enterGuestMode = (apiKey) => {
    setGuestApiKey(apiKey);
    setIsGuestMode(true);
  };

  const exitGuestMode = () => {
    setIsGuestMode(false);
    setGuestApiKey("");
    setGuestProfiles([]);
    localStorage.removeItem("guestMode");
    localStorage.removeItem("guestApiKey");
  };

  const incrementSearchCount = () => {
    setSearchCount((prev) => prev + 1);
  };

  const resetSearchCount = () => {
    setSearchCount(0);
    localStorage.removeItem("guestSearchCount");
  };

  const value = {
    isGuestMode,
    guestApiKey,
    searchCount,
    guestProfiles,
    setGuestProfiles,
    enterGuestMode,
    exitGuestMode,
    incrementSearchCount,
    resetSearchCount,
    setGuestApiKey,
  };

  return (
    <GuestContext.Provider value={value}>{children}</GuestContext.Provider>
  );
};

export default GuestContext;
