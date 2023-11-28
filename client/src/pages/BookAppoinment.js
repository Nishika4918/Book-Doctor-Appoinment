import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { message, DatePicker, TimePicker, Form } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const BookAppoinment = () => {
  const user = useSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();

  const getDoctorData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.id },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      message.error(err);
    }
  };

  const handleBookAppoinment = async () => {
    try {
      console.log("in js submit");
      const formattedDate = date
        ? date.format("YYYY-MM-DD")
        : "No date selected";
      const formattedTime = time ? time.format("HH:mm") : "No time selected";
      const res = await axios.post(
        "/api/v1/user/book-appoinment",
        {
          doctorInfo: doctor,
          date: formattedDate,
          startTime: formattedTime,
          doctorId: params.id,
          userId: user._id,
          userInfo: user,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res.data.success) {
        message.success("Appoinment Booked Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
        console.log("Error");
      }
    } catch (err) {
      message.error(err);
    }
  };

  const handleAvailability = async () => {
    try {
      const formattedDate = date
        ? date.format("YYYY-MM-DD")
        : "No date selected";
      const formattedTime = time ? time.format("HH:mm") : "No time selected";
      const res = await axios.post(
        "/api/v1/user/checkAvailability",
        { doctorId: params.id, date: formattedDate, time: formattedTime },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res.data.success) {
        setIsAvailable(true);
        message.success("Doctor is availabile");
      } else {
        setIsAvailable(false);
        message.error(res.data.message);
      }
    } catch (err) {
      message.error(err);
    }
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  return (
    <Layout>
      {doctor && (
        <div className="container">
          <Form onFinish={handleAvailability}>
            <div className="row appoinment card m-3">
              <div className="col card-body">
                <h5>
                  Name : {doctor.firstName} {doctor.lastName}
                </h5>
                <h5>Fees : {doctor.feesPerCunsaltation}</h5>
                <h5>
                  Timing : {doctor.timing && doctor.timing[0]} -{" "}
                  {doctor.timing && doctor.timing[1]}{" "}
                </h5>
                <div className="mt-3 w-50">
                  <Form.Item
                    label="Select Date"
                    name="date"
                    rules={[
                      {
                        required: true,
                        message: "Please select a date.",
                      },
                    ]}
                  >
                    <DatePicker
                      format="DD-MM-YYYY"
                      className="w-50"
                      disabledDate={disabledDate}
                      onChange={(value) => {
                        setIsAvailable(false);
                        setDate(value);
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="mt-3 w-50">
                  <Form.Item
                    label="Select Date"
                    name="startTime"
                    rules={[
                      {
                        required: true,
                        message: "Please select a Time.",
                      },
                    ]}
                  >
                    <TimePicker
                      format="HH:mm"
                      className="w-50"
                      onChange={(value) => {
                        setIsAvailable(false);
                        setTime(value);
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="col d-flex flex-column">
                <button className="mt-3 btn btn-success" type="submit">
                  Check Availability
                </button>
              </div>
            </div>
          </Form>

          {isAvailable && (
            <div className="col d-flex flex-column">
              <button
                className="mt-3 mx-4 btn btn-secondary"
                onClick={handleBookAppoinment}
              >
                Book Appoinment
              </button>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default BookAppoinment;

// {isAvailable && (
//   <button
//     className="mt-3 btn btn-secondary"
//     onClick={handleBookAppoinment}
//   >
//     Book Appoinment
//   </button>
// )}
