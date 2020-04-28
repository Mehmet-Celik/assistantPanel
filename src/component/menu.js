import React, { Component } from "react";
import { Layout, Menu } from "antd";
import {
  CloudServerOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import style from "./css/table.module.scss";

const { Sider } = Layout;

class menu extends Component {
  constructor(props) {
      super(props);
      this.state = {
        collapsed: false,
      };
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
      const client = "client";
      const server = "server";
      e.key === "1" ? this.props.onTeamChange(client) : this.props.onTeamChange(server);
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <Menu className={style.menu} theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" onClick={this.handleChange}>
              <DesktopOutlined />
              <span>Client</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={this.handleChange}>
              <CloudServerOutlined />
              <span>Server</span>
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    );
  }
}

export default menu;
