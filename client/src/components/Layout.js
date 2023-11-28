import React from "react";
import "../styles/layoutStyle.css";
import { UserMenu, AdminMenu, DoctorMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Layout = ({ children, img }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const nagivate = useNavigate();
  let imgsrc = `/Images/${user?.profileImage}`;
  const DoctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  if (img) {
    imgsrc = img;
  }

  const SideMenu = user?.isAdmin
    ? AdminMenu
    : user?.isDoctor
    ? DoctorMenu
    : UserMenu;

  const logoutFunction = () => {
    console.log("logout clicked");
    localStorage.clear();
    nagivate("/login");
  };
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>Doc-App</h6>
              <p className="username">Welcome - {user?.name}</p>
              <hr />
            </div>
            <div className="menu">
              {SideMenu.map((menu, index) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    key={index}
                    className={`menu-item ${isActive && "active"}`}
                  >
                    <i className={menu.icon}></i>

                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
              <div className="menu-item" onClick={logoutFunction}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link>Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content">
                <Badge
                  count={user && user.notification.length}
                  showZero
                  onClick={() => {
                    nagivate("/notification");
                  }}
                  className="NotificationValues"
                >
                  <i className="fa-solid fa-bell"></i>
                </Badge>
                {user?.profileImage != null ? (
                  <Avatar src={imgsrc} className="userFullName" size={60} />
                ) : (
                  <Avatar
                    style={{ backgroundColor: "#87d068" }}
                    icon={<UserOutlined />}
                    className="userFullName"
                    size={60}
                  />
                )}
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
