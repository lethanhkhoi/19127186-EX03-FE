import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userAPI from "../api/user";
import "./index.css";
import { Button } from "antd";
const HomePage = () => {
  const navigate = useNavigate();
  const verify = async () => {
    const response = await userAPI.verify();
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
    verify();
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
