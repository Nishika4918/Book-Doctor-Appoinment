import React from "react";
import { Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const navigate = useNavigate();
  const onFinishHandler = async (value) => {
    try {
      const res = await axios.post("/api/v1/user/forgetPassord", value);
      if (res.data.success) {
        message.success("Link send Successfully");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      message.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="form-container">
        <Form
          className="register-form"
          layout="vertical"
          onFinish={onFinishHandler}
        >
          <h4 className="text-center">Forget Password</h4>
          <FormItem label="Email" name="email">
            <Input type="email" required></Input>
          </FormItem>
          <button type="submit" className="btn btn-primary">
            Send Reset Link
          </button>
        </Form>
      </div>
    </>
  );
}

export default ForgetPassword;
