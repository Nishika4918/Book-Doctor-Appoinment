import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import axios from "axios";
import { message, Form, Row, Col, Input, TimePicker, Avatar } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/layoutStyle.css";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";

const DoctorProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const [imgsrc, setImgSrc] = useState(`/Images/${user?.profileImage}`);
  const params = useParams();
  const navigate = useNavigate();
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
  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorDetails",
        { userId: params.id },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
        message.success("All data is fetched");
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      message.error(err);
    }
  };
  useEffect(() => {
    getDoctorInfo();
  }, []);

  const onFinishUpdate = async (values) => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/updateDoctorDetails",
        {
          ...values,
          timing: [
            values.timing[0].format("HH:mm"),
            values.timing[1].format("HH:mm"),
          ],
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );

      if (res.data.success) {
        message.success("Details Updated");
        navigate("/");
      }
    } catch (err) {
      message.error(err);
    }
  };

  return (
    <Layout img={imgsrc}>
      <h6>Manage Profile</h6>
      <Row>
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
      </Row>
      {doctor && (
        <Form
          layout="vertical"
          initialValues={{
            ...doctor,
            timing: [
              moment(doctor.timing[0], "HH:mm"),
              moment(doctor.timing[1], "HH:mm"),
            ],
          }}
          onFinish={onFinishUpdate}
        >
          <h4>Personal Details</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <FormItem
                label="First Name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "The FirstName is required.",
                  },
                  {
                    pattern: /^[a-zA-Z]+$/,
                    message: "Enter a valid FirstName.",
                  },
                  {
                    min: 3,
                    message: "FirstName must be minimum 3 characters.",
                  },
                ]}
              >
                <Input type="text" placeholder="Enter Your First Name"></Input>
              </FormItem>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <FormItem
                label="Last Name"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "The LastName is required.",
                  },
                  {
                    pattern: /^[a-zA-Z]+$/,
                    message: "Enter a valid LastName.",
                  },
                  { min: 3, message: "LastName must be minimum 3 characters." },
                ]}
              >
                <Input type="text" placeholder="Enter Your Last Name"></Input>
              </FormItem>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <FormItem
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "The Email is required.",
                  },
                  {
                    type: "email",
                    message: "Enter a valid Email Id.",
                  },
                ]}
              >
                <Input type="text" placeholder="Enter Your Email"></Input>
              </FormItem>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <FormItem
                label="Number"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "The Phone Number is required.",
                  },
                  {
                    pattern: new RegExp(/^[0-9]+$/),
                    message: "Enter Valid Number",
                  },
                  { min: 10 },
                  { max: 10 },
                ]}
              >
                <Input type="text" placeholder="Enter Your Number"></Input>
              </FormItem>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <FormItem
                label="Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "The Address is required.",
                  },
                  {
                    type: "text",
                    message: "Enter a valid Address.",
                  },
                ]}
              >
                <Input type="text" placeholder="Enter Your Address"></Input>
              </FormItem>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <FormItem
                label="Website"
                name="website"
                rules={[
                  {
                    required: false,
                    message: "This Field is required.",
                  },
                  {
                    type: "url",
                    message: "Enter a valid Url.",
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Enter Your Website link"
                ></Input>
              </FormItem>
            </Col>
          </Row>
          <h4>Professional Details</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <FormItem
                label="Specialazation"
                name="specialazation"
                rules={[
                  {
                    required: true,
                    message: "This Field is required.",
                  },
                  {
                    pattern: /^[a-zA-Z]+$/,
                    message: "Enter a valid text..",
                  },
                  {
                    type: "text",
                    message: "Enter a valid text.",
                  },
                ]}
              >
                <Input type="text" placeholder="Enter Specialazation"></Input>
              </FormItem>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <FormItem
                label="Experience"
                name="experience"
                rules={[
                  {
                    required: true,
                    message: "This Field is required.",
                  },
                ]}
              >
                <Input type="number" placeholder="Enter Experience"></Input>
              </FormItem>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <FormItem label="Timing" name="timing">
                <TimePicker.RangePicker format="HH:mm" />
              </FormItem>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <FormItem
                label="Fees Per Cunsaltation"
                name="feesPerCunsaltation"
                rules={[
                  {
                    required: true,
                    message: "This Field is required.",
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Enter your Fees Per Cunsaltation"
                ></Input>
              </FormItem>
            </Col>
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}>
              <button type="submit" className="btn btn-primary form-button">
                Update
              </button>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
};

export default DoctorProfile;
