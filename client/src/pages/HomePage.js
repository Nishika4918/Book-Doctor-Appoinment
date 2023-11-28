import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { message } from "antd";
import DoctorList from "./DoctorList";
import { useSelector } from "react-redux";
import "../styles/layoutStyle.css";

function HomePage() {
  const { user } = useSelector((state) => state.user);
  const [doctors, setDoctor] = useState([]);
  const [imgsrc, setImgSrc] = useState(`/Images/${user?.profileImage}`);
  const getDoctorData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getAllDoctors",
        { user },
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
  useEffect(() => {
    getDoctorData();
  }, []);
  return (
    <Layout img={imgsrc}>
      <h6>Home page</h6>
      {doctors.length > 0 ? (
        <div className="doctorList">
          {doctors.map((doctor, index) => (
            <DoctorList doctor={doctor} key={index} />
          ))}
        </div>
      ) : (
        <div>
          <h5>No Doctor Available</h5>
        </div>
      )}
    </Layout>
  );
}

export default HomePage;
