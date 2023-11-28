import React from "react";
import { Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useDispatch } from "react-redux";
import "../styles/Register.css";
import { setUser } from "../redux/features/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinishHandler = async (value) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", value);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        dispatch(setUser(res.data.user));
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      message.error("something went wrong");
    }
  };

  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="register-form"
        >
          <h4 className="text-center">Login Form</h4>
          <FormItem
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter a Email",
              },
              {
                type: "email",
                message: "Enter a Valid Email",
              },
            ]}
          >
            <Input type="email" />
          </FormItem>
          <FormItem
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter a Password",
              },
            ]}
          >
            <Input type="password" />
          </FormItem>
          <Link to="/forgetPassword" className="m-2">
            Forget Password
          </Link>
          <Link to="/register" className="m-2">
            Not have Account - Register
          </Link>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </Form>
      </div>
    </>
  );
}

export default Login;
