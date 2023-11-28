import React from "react";
import Layout from "../components/Layout";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import { message } from "antd";
import axios from "axios";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";

const Notification = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteAll = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/deleteAllNotification",
        { userId: user._id },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.data));
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      message.error(err);
    }
  };

  const handleMarkeAllRead = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getAllNotification",
        { userId: user._id },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.data));
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      message.error(err);
    }
  };

  return (
    <Layout>
      <h5>Notification Page</h5>
      <Tabs>
        <Tabs.TabPane tab="UnRead" key="0">
          <h6 onClick={handleMarkeAllRead} className="NotificationValues">
            Mark All Read
          </h6>
          {user?.notification.map((notifyMag, index) => (
            <div
              key={index}
              className="m-3 p-2 card"
              onClick={notifyMag.onClickPath}
            >
              <div className="card-text">{notifyMag.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key="1">
          <h6 onClick={handleDeleteAll} className="NotificationValues">
            Delete All
          </h6>
          {user?.seeNotification.map((notifyMag, index) => (
            <div
              key={index}
              className="m-3 p-2 card"
              onClick={notifyMag.onClickPath}
            >
              <div className="card-text">{notifyMag.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notification;
