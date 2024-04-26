import { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  const [allData, setAllData] = useState({
    linkData: [],
    profileData: '',
  });

  useEffect(() => {
    const storedData = localStorage.getItem('allData');
    if (storedData) {
      setAllData(JSON.parse(storedData));
    }
  }, []);

  const handleAllData = (data, flag) => {
    flag
      ? setAllData((prev) => ({ ...prev, linkData: data }))
      : setAllData((prev) => ({ ...prev, profileData: data }));
  };

  useEffect(() => {
    localStorage.setItem('allData', JSON.stringify(allData));
  }, [allData]);
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
