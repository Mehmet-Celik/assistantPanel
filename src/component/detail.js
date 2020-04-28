import React, { Component } from "react";
import style from "./css/detail.module.scss";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

class detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      key: "",
    };
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleEditChange() {
    this.props.onDetailChange(this.props.data);
  }

  handleChange() {
    this.props.onEditChange();
  }

  componentDidMount = async () => {
    this.props.onIssueChange === "dts"
      ? this.setState({
          title: "DTS ID",
          key: "dtsId",
        })
      : this.setState({
          title: "Requirement ID",
          key: "reqId",
        });
  };

  render() {
    return (
      <div>
        <div className={style.back}>
          <Button onClick={this.handleChange} type="primary">
            <ArrowLeftOutlined />
            Back
          </Button>
        </div>
        <div className={style.detail}>
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Explanation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.title}</td>
                <td>{this.props.onIssueChange === "dts" ? this.props.data[0].dtsId : this.props.data[0].reqId}</td>
              </tr>
              <tr>
                <td>Link</td>
                <td>{this.props.data[0].link}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{this.props.data[0].description}</td>
              </tr>
              <tr>
                <td>Labels</td>
                <td>{this.props.data[0].labels}</td>
              </tr>
              <tr>
                <td>Team</td>
                <td>{this.props.data[0].team}</td>
              </tr>
              <tr>
                <td>Merge Request</td>
                <td>{this.props.data[0].mergeRequest}</td>
              </tr>
              <tr>
                <td>Solution</td>
                <td>{this.props.data[0].solution}</td>
              </tr>
              <tr>
                <td>Solved Date</td>
                <td>{this.props.data[0].solvedDate}</td>
              </tr>
              <tr>
                <td>Developer</td>
                <td>{this.props.data[0].developer}</td>
              </tr>
              <tr>
                <td>Version</td>
                <td>{this.props.data[0].version}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <Button
            className={style.edit}
            onClick={this.handleEditChange}
            type="primary"
          >
            Edit
          </Button>
        </div>
      </div>
    );
  }
}

export default detail;
