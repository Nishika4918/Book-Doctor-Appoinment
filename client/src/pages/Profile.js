import React, { useState } from "react";
import Layout from "../components/Layout";
import { Form, Row, Col, message, Avatar, Button, Modal, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/layoutStyle.css";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [imgsrc, setImgSrc] = useState(`/Images/${user?.profileImage}`);

  const [modal2Open, setModal2Open] = useState(false);

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        "/api/v1/user/uploadUserImage",
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        message.success(response.data.message);
        const i = `/Images/${response.data.data}`;
        setImgSrc(i);
        window.location.reload();
      } else {
        message.error("Failed to upload profile image.");
      }
    } catch (error) {
      message.error("Error uploading profile image.");
    }
  };

  const onFinishHandler = async (values) => {
    try {
      console.log(values);
      console.log(user._id);
      const res = await axios.post("/api/v1/user/resetPassword", {
        userId: user._id,
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

  return (
    <Layout img={imgsrc}>
      <div className="container">
        <Row gutter={20}>
          <Col className="imgdiv">
            <div className="userimg">
              {user?.profileImage != null ? (
                <Avatar src={imgsrc} size={150} />
              ) : (
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                  className="userFullName"
                  size={100}
                />
              )}
            </div>
            <Form>
              <Form.Item label="Upload Profile Image" className="mt-4">
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                />
              </Form.Item>
            </Form>
          </Col>
          <Col>
            {/* <Button onClick={showConfirm}>Click here to change password</Button> */}
            <Button type="primary" onClick={() => setModal2Open(true)}>
              Vertically centered modal dialog
            </Button>
            <Modal
              title="Vertically centered modal dialog"
              centered
              open={modal2Open}
              footer={null}
              onCancel={() => setModal2Open(false)}
            >
              <Form onFinish={onFinishHandler}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters long",
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
                          new Error(
                            "The new password that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password className="mt-3" />
                </Form.Item>
                <button className="btn btn-primary mt-4" type="submit">
                  Reset Password
                </button>
              </Form>
            </Modal>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default Profile;
