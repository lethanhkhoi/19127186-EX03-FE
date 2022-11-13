import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from './pages/HomePage';
import Modal from './components/modal/Modal';
import { Toaster } from "react-hot-toast";
import { useState } from 'react';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "react-query";
const createQueryClient = () => {
  const queryCache = new QueryCache();
  return new QueryClient({
    queryCache,
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        notifyOnChangeProps: "tracked",
      },
    },
  });
};

function App() {
  const [queryClient] = useState(createQueryClient);
  return (
    <div className="Container">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Modal formType={"login"}  />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/login" element={<Modal formType={"login"} />}></Route>
            <Route path="/register" element={<Modal formType={"register"}/>}></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
      <Toaster />
    </div>
  );
}

export default App;
