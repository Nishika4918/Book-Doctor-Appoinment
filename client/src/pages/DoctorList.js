import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="m-3 card">
        <div className="card-header">
          <p>
            {doctor.firstName} {doctor.lastName}
          </p>
        </div>
        <div className="card-body">
          <p>Email : {doctor.email}</p>
          <p>Phone Number : {doctor.phoneNumber}</p>
          <p>Specialazation : {doctor.specialazation}</p>
          <p>Fees Per Cunsaltation : {doctor.feesPerCunsaltation}</p>
          <button
            className="btn btn-outline-success"
            onClick={() => {
              navigate(`/doctor/book-appoinment/${doctor._id}`);
            }}
          >
            Book Appoinment
          </button>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
