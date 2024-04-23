import { Box } from '@chakra-ui/react';
import './App.css';
import { Content, Header, Preview, Profile } from './Component';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalContextProvider from './context/global.context';

function App() {
  return (
    <Box>
      <GlobalContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Header />}>
              <Route index element={<Content />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/preview' element={<Preview />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContextProvider>
    </Box>
  );
}

export default App;
