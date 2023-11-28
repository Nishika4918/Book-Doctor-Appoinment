import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useDispatch } from "react-redux";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form Handler
  const onFinishHandler = async (value) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", value);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("User registered successfully");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      message.error("Something went wrong");
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
          <h4 className="text-center">Registration Form</h4>
          <Form.Item
            label="UserName"
            name="name"
            rules={[
              {
                required: true,
                message: "The name is required.",
              },
              {
                pattern: /^[a-zA-Z ]+$/,
                message: "Enter a valid UserName.",
              },
              { min: 4, message: "Username must be minimum 4 characters." },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              {
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter a password",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters long",
              },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Link to="/login" className="m-2">
            Already have an account - Login
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </>
  );
}

export default Register;

//  // Custom validation function for the name field
//  const validateName = (rule, value) => {
//   // Regular expression to allow only alphabetic characters and spaces
//   const regex = /^[A-Za-z\s]+$/;
//   if (!regex.test(value)) {
//     throw new Error("Name can only contain alphabetic characters and spaces");
//   }
// };
