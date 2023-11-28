import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { message, Table } from "antd";
const DoctorAppoinment = () => {
  const [appoinments, setAppoinments] = useState();
  const [confirmAppoinments, setConfirmAppoinments] = useState();
  const getAllAppoinments = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/allDoctorAppoinments",
        {},
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res.data.success) {
        message.success("All Data Fetched");
        setAppoinments(res.data.data);
        setConfirmAppoinments(res.data.confirmAppoinments);
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      message.error(err);
    }
  };

  useEffect(() => {
    getAllAppoinments();
  }, []);

  const changeStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/changeAppoinmentStatus",
        { record, status },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res.data.success) {
        message.success("Status has been changed");
        setAppoinments(res.data.data);
        setConfirmAppoinments(res.data.confirmAppoinments);
      }
    } catch (err) {
      message.error("Something went wrong");
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "User Id",
      dataIndex: "userId",
    },
    {
      title: "Time",
      dataIndex: "startTime",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        let buttons;
        if (record.status === "pending") {
          buttons = (
            <>
              <button
                className="mx-3 btn btn-success"
                onClick={() => changeStatus(record, "approved")}
              >
                Approve
              </button>
              <button
                className="mx-3 btn btn-danger"
                onClick={() => changeStatus(record, "rejected")}
              >
                Reject
              </button>
            </>
          );
        }
        return <div>{buttons}</div>;
      },
    },
  ];

  const confirmList = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "User Id",
      dataIndex: "userId",
    },
    {
      title: "Time",
      dataIndex: "startTime",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Layout>
      <div>
        <h5>Pending Request</h5>
        {appoinments && (
          <Table
            dataSource={appoinments}
            columns={columns}
            rowKey={(record) => record._id}
          />
        )}
      </div>
      <div className="mt-4">
        <h5>Confirm Appoinments</h5>

        {confirmAppoinments && (
          <Table
            dataSource={confirmAppoinments}
            columns={confirmList}
            rowKey={(record) => record._id}
          />
        )}
      </div>
    </Layout>
  );
};

export default DoctorAppoinment;
