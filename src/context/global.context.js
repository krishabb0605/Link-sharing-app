import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  const [allData, setAllData] = useState({ linkData: [], profileData: '' });

  const handleAllData = (data, flag) => {
    flag
      ? setAllData((prev) => ({ ...prev, linkData: data }))
      : setAllData((prev) => ({ ...prev, profileData: data }));
  };

  localStorage.setItem('allData', JSON.stringify(allData));

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
