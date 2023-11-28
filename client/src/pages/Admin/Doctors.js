import React, { useEffect, useState } from "react";
import Layout from "C:/Users/pct172/source/MERN/DocAppoinment/client/src/components/Layout.js";
import axios from "axios";
import { Table, message } from "antd";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const getAllDoctors = async () => {
    const res = await axios.get("/api/v1/admin/getAllDoctors", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    if (res.data.success) {
      setDoctors(res.data.data);
    }
  };
  useEffect(() => {
    getAllDoctors();
  }, []);

  const changeStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeDoctorStatus",
        { record, status },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );

      if (res.data.success) {
        message.success("Application Status has been changed");
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      message.error("Something went wrong");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
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
        if (record.status == "Pending") {
          buttons = (
            <>
              <button
                className="mx-3 btn btn-success"
                onClick={() => changeStatus(record, "Approved")}
              >
                Approve
              </button>
              <button
                className="mx-3 btn btn-danger"
                onClick={() => changeStatus(record, "Rejected")}
              >
                Reject
              </button>
            </>
          );
        } else if (record.status == "Approved") {
          buttons = (
            <>
              <button
                className="mx-3 btn btn-success"
                disabled
                onClick={() => changeStatus(record, "Approved")}
              >
                Approve
              </button>
              <button
                className="mx-3 btn btn-danger"
                onClick={() => changeStatus(record, "Rejected")}
              >
                Reject
              </button>
            </>
          );
        } else {
          buttons = (
            <>
              <button
                className="mx-3 btn btn-success"
                onClick={() => changeStatus(record, "Approved")}
              >
                Approve
              </button>
              <button
                className="mx-3 btn btn-danger"
                disabled
                onClick={() => changeStatus(record, "Rejected")}
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

  return (
    <Layout>
      <h6>Doctor Page</h6>
      <Table
        dataSource={doctors}
        columns={columns}
        rowKey={(record) => record._id}
      />
      ;
    </Layout>
  );
};

export default Doctors;

// {record.status === "Pending" ? (
//     <div>
//   <button
//     className="mx-3 btn btn-success"
//     onClick={() => changeStatus(record, "Approved")}
//   >
//     Approve
//   </button>
//   <button
//     className="mx-3 btn btn-danger"
//     onClick={() => changeStatus(record, "Rejected")}
//   >
//     Reject
//   </button>
//     </div>
//   ) : (
//     <button
//       className="mx-3 btn btn-danger"
//       onClick={() => changeStatus(record, "Rejected")}
//     >
//       Reject
//     </button>
//   )}
