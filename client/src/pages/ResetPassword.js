import React, { useState, useEffect } from "react";
import "../styles/Register.css";
import { Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState();

  const getUserId = async () => {
    try {
      setUserId(params.userId);
    } catch (err) {
      message.error(err);
    }
  };

  const onFinishHandler = async (values) => {
    try {
      console.log(values);
      const res = await axios.post("/api/v1/user/resetPassword", {
        userId,
        values,
      });
      if (res.data.success) {
        message.success("Password has been changed");
        navigate("/login");
      } else {
        message.error("Something went wrong");
      }
    } catch (err) {
      message.error(err);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          className="register-form"
          onFinish={onFinishHandler}
        >
          <h4 className="text-center">Reset Password</h4>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <button className="btn btn-primary" type="submit">
            Reset Password
          </button>
        </Form>
      </div>
    </>
  );
};

export default ResetPassword;
