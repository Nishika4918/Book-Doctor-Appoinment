import React from "react";
import Layout from "../components/Layout";
import { Form, Row, Col, Input, message, TimePicker } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormItem from "antd/es/form/FormItem";
import "../styles/layoutStyle.css";
import axios from "axios";

function ApplyDoctor() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const onFinishHandler = async (values) => {
    try {
      const res = await axios.post(
        "/api/v1/user/applydoctor",
        {
          ...values,
          userId: user._id,
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
        message.success("Doctor data post Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      message.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <h3 className="text-center">Apply Doctor</h3>
      <Form layout="vertical" onFinish={onFinishHandler}>
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
                { min: 3, message: "FirstName must be minimum 3 characters." },
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
              <Input type="text" placeholder="Enter Your Website link"></Input>
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
              Submit
            </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
}

export default ApplyDoctor;
