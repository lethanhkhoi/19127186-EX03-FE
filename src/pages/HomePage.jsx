import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { Button } from "antd";
import { useProfile } from "../api/user";
const HomePage = () => {
  const navigate = useNavigate();
  const { refetch, data } = useProfile(false);
  const [name, setName] = useState("");
  useEffect(() => {
    if (data?.errorCode) {
      navigate("/login");
    }
  }, [data]);

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ alignItems: "center", textAlign: "center" }}>
        <h1>Hi! Welcome to Home Page</h1>
        <Button onClick={Logout}>Log out</Button>
      </div>
    </div>
  );
};
export default HomePage;
