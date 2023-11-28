import React, { useState, useEffect } from "react";
import Layout from "C:/Users/pct172/source/MERN/DocAppoinment/client/src/components/Layout.js";
import axios from "axios";
import { Table, message } from "antd";

const Users = () => {
  const [users, setUsers] = useState([]);
  const getAllUser = async () => {
    const res = await axios.get("/api/v1/admin/getAllUsers", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    if (res.data.success) {
      setUsers(res.data.data);
    }
  };

  const blockUser = async (record) => {
    try {
      const res = await axios.post("/api/v1/admin/blockuser", record, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      if (res.data.success) {
        message.success("User is blocked");
        setUsers(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      message.error(err);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",

      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",

      render: (text, record) => (
        <div>
          <button className="btn btn-danger" onClick={() => blockUser(record)}>
            Block
          </button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h6>Users Page</h6>
      <Table
        dataSource={users}
        columns={columns}
        rowKey={(record) => record._id}
      />
    </Layout>
  );
};

export default Users;
