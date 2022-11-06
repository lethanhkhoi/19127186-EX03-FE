import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { Button } from "antd";
import { verify } from "../api/user";
const HomePage = () => {
  const navigate = useNavigate();
  const verifyToken = async () => {
    const response = await verify();
    console.log(response);
    if (response.errorCode) {
      navigate("/login");
    }
  };
  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  useEffect(() => {
    verifyToken();
  }, []);
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{"alignItems":"center", "textAlign": "center"}}>
        <h1>Welcome to Home Page</h1>
        <Button onClick={Logout}>Log out</Button>
      </div>
    </div>
  );
};
export default HomePage;
