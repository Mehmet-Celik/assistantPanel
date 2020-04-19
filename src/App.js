import React, { Component } from "react";
import "./App.css";
import Navbar from "./component/navbar";
import Menu from "./component/menu";
import Table from "./component/table";
import { Layout } from "antd";

const { Header, Sider, Content } = Layout;
    
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      issue: "dts",
      team: "client",
      flag: true
    };
    this.handleIssueChange = this.handleIssueChange.bind(this);
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.handleFlagChange = this.handleFlagChange.bind(this);
  }

  handleIssueChange(issue) {
    this.setState({
      issue,
      flag: true
    })
  }

  handleTeamChange(team) {
    this.setState({
      team ,
      flag: true
    })
  }
  
  handleFlagChange(flag) {
    this.setState({
      flag
    })
  }

  render() {
    return (
      <div>
        <Layout>
          <Header>
            <Navbar onIssueChange={this.handleIssueChange}></Navbar>
          </Header>
          <Layout>
            <Sider>
              <Menu onTeamChange={this.handleTeamChange}></Menu>
            </Sider>
            <Content>
              <Table issue={this.state.issue} team={this.state.team} flag={this.state.flag} onFlagChange={this.handleFlagChange}></Table>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default App;
