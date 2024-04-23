import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  const [allData, setAllData] = useState();

  const handleAllData = (data) => {
    setAllData((prev) => ({ ...prev, data }));
  };
  return (
    <GlobalContext.Provider
      value={{
        allData,
        handleAllData,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
