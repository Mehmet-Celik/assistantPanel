import React, { Component } from "react";
import { Form, Input, Select, Button, DatePicker, message } from "antd";
import style from "./css/table.module.scss";
import Axios from "axios";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};

const validateMessages = {
  required: "${label} is required!",
};

const success = () => {
  message.success("Successfully Created...");
};

class addIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title : "",
      key : "",
    };
    this.form = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.tags = [
      "Trace",
      "Monitor",
      "Batch",
      "MML",
      "Alarm/Event",
      "Self Test",
      "Device Maintenance",
      "Parse",
      "Save",
    ];
  }

  onFinish = (values) => {
    Axios.post("http://localhost:8080/save-issue", { values })
      .then((res) => {
        if (res.statusText === "Created") {
          success();
          this.form.resetFields();
          this.props.onEditChange();
        }
        //console.log(res);
        //console.log(res.data);
        //console.log(res.status); 201
        //console.log(res.statusText); Created
      })
      .catch((error) => {
        message.error("Error" + error);
        console.log("Error " + error);
      });
  };

  handleChange() {
    this.props.onEditChange();
  }

  componentDidMount = async () => {
    this.props.onIssueChange === "dts" ? this.setState({
      title : "DTS ID",
      key : "dtsId"
    }) : this.setState({
      title : "Requirement ID",
      key : "reqId"
    })
  }

  render() {
    return (
      <div>
        <div className={style.newIssue}>
          <Button onClick={this.handleChange} type="primary">
            <ArrowLeftOutlined />
            Back
          </Button>
        </div>
        <div className={style.form}>
          <Form
            {...layout}
            ref={(ref) => {
              this.form = ref;
            }}
            name="nest-messages"
            onFinish={this.onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={this.state.key}
              label={this.state.title}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name={"link"} label="Link" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name={"description"}
              label="Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name={"labels"}
              label="Labels"
              rules={[{ required: true }]}
            >
              <Select mode="multiple" placeholder="Please enter a tag">
                {this.tags.map((tag, i) => (
                  <Option value={tag}>{tag}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name={"team"} label="Team" rules={[{ required: true }]}>
              <Select placeholder="Please select a team" allowClear>
                <Option value="client">Client</Option>
                <Option value="server">Server</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={"mergeRequest"}
              label="Merge Request"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"solution"}
              label="Solution"
              rules={[{ required: true }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item name={"solvedDate"} label="Solved Date">
              <DatePicker />
            </Form.Item>
            <Form.Item name={"developer"} label="Developer">
              <Input />
            </Form.Item>
            <Form.Item name={"version"} label="Version">
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default addIssue;
