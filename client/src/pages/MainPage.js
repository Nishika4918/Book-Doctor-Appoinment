import React from "react";
import { Row, Col, Layout, Menu, theme } from "antd";
const { Header } = Layout;

const MainPage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>
      <Row>
        <Col>
          <img src="/Images/doc.jpg" />
        </Col>
        <Col>
          {" "}
          <Layout className="layout">
            <Header
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className="demo-logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                items={new Array(15).fill(null).map((_, index) => {
                  const key = index + 1;
                  return {
                    key,
                    label: `nav ${key}`,
                  };
                })}
              />
            </Header>
          </Layout>
        </Col>
      </Row>
    </div>
  );
};

export default MainPage;
