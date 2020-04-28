import React, { Component } from "react";
import { Layout, Menu } from "antd";
import style from "./css/table.module.scss";
const { Header } = Layout;

class navbar extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const dts = "dts";
        const req = "req";
        e.key === "1" ? this.props.onIssueChange(dts) : this.props.onIssueChange(req)
    }

  render() {
    return (
      <Layout>
        <Header>
          <div className={style.logo}>
            <div className={style.logoText}></div>
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" onClick={this.handleChange}>DTS</Menu.Item>
            <Menu.Item key="2" onClick={this.handleChange}>Requirement</Menu.Item>
          </Menu>
        </Header>
      </Layout>
    );
  }
}

export default navbar;
