// GlobalStateContext.js
import React, { useState } from "react";
import GlobalStateContext from "./GlobalStateContext";

function generateUID() {
  // Generates a random 8-character alphanumeric string
  return Math.random().toString(36).substring(2, 10);
}

const GlobalStateProvider = ({ children }) => {
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [memberIfo, setMemberInfo] = useState();
  const [communityMembers, setCommityMembers] = useState();

  return (
    <GlobalStateContext.Provider
      value={{
        isAuthenticate,
        setIsAuthenticate,
        memberIfo,
        setMemberInfo,
        communityMembers,
        setCommityMembers,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
export default GlobalStateProvider;
