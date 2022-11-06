import { Button, Form, Input, notification } from "antd";
import React from "react";
import { useState } from "react";
import "./index.css";
import userAPI from "../../api/user";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
const Modal = ({formType}) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const changeFormStyle = (value) => {
    navigate(`/${value}`);
  };
  const { mutate } = useMutation((values) => onSubmit(values));

  const onSubmit = async (data) => {
    if (formType === "login") {
      delete data.confirmPassword;
      const res = await userAPI.login(data);
      if (res.errorCode) {
        toast.error(res.data, { position: "top-right" });
      } else {
          toast.success("Login successfully", { position: "top-right" });
          localStorage.setItem("token", res.data.token);
          navigate("/");
      }
    } else if (formType === "register") {
      const res = await userAPI.register(data);
      if (res.errorCode) {
        toast.error(res.data, { position: "top-right" });
      } else {
        toast.success("Login successfully", { position: "top-right" });
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    }
  };

  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit(mutate)}>
        <h2>{formType === "login" ? "Sign In" : "Sign Up"}</h2>
        <div name="email" className="inputBox">
          <input className="input" required {...register("email")} />
          <span className="label">Email:</span>
          <i></i>
        </div>
        <div name="password" className="inputBox" type="password">
          <input
            type="password"
            className="input"
            autoComplete="off"
            required
            {...register("password")}
          />
          <span className="label">Password:</span>
          <i></i>
        </div>
        {formType === "register" ? (
          <div name="confirmPassword" className="inputBox">
            <input
              type="password"
              className="input"
              {...register("confirmPassword")}
              autoComplete="off"
              required
            />
            <span className="label">Confirm Password:</span>
            <i></i>
          </div>
        ) : (
          <></>
        )}

        <div className="links">
          <p
            onClick={() => {
              changeFormStyle("forgot");
            }}
          >
            Forgot Password
          </p>
          <p
            onClick={() => {
              if (formType === "login") {
                changeFormStyle("register");
              } else {
                changeFormStyle("login");
              }
            }}
          >
            {formType === "login" ? "Sign Up" : "Sign In"}
          </p>
        </div>
        {/* <Button htmlType="submit" type="submit">
          {formType === "login" ? "Login" : "Sign Up"}
        </Button> */}
        <input type="submit"></input>
      </form>
    </div>
  );
};
export default Modal;
