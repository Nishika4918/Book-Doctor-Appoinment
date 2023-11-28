import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { message, Table } from "antd";

function Appoinment() {
  const [appoinments, setAppoinments] = useState();

  const getAllAppoinments = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserAppoinments",
        {},
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res.data.success) {
        message.success("All Appoinments are fetched");
        setAppoinments(res.data.data);
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

  const columns = [
    {
      title: "Doctor Id",
      dataIndex: "doctorId",
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
        <h6>All Appoinments</h6>
        {appoinments && (
          <Table
            dataSource={appoinments}
            columns={columns}
            rowKey={(record) => record._id}
          />
        )}
      </div>
    </Layout>
  );
}

export default Appoinment;
