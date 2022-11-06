import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from './pages/HomePage';
import Modal from './components/modal/Modal';
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "react-query";

function App() {
  return (
    <div className="Container">
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />}></Route>
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
