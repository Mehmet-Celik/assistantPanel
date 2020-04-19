import React, { Component } from "react";
import { Button, Form, Input, Select, DatePicker, message } from "antd";
import style from "./style.module.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};

const validateMessages = {
  required: "${label} is required!",
};

const children = [];

const success = () => {
  message.success("Successfully Changed...");
};

class edit extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  onFinish = (values) => {
    this.props.onDetailChange();
    // Axios.put("http://localhost:8080/save-issue", { values })
    // .then((res) => {
    //   if (res.statusText === "Created") {
    //     success();
    //   }
      //console.log(res);
      //console.log(res.data);
      //console.log(res.status); 201
      //console.log(res.statusText); Created
    //});
  };
  

  handleChange() {
    this.props.onDetailChange();
  }

  render() {
    console.log(this.props.data[0].solution);
    return (
      <div>
        <div className={style.newIssue}>
          <Button onClick={this.handleChange} type="primary">
            <ArrowLeftOutlined />
            Back
          </Button>
        </div>
        <div>
          <div className={style.editForm}>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={this.onFinish}
              initialValues={{description: this.props.data[0].description, solution: this.props.data[0].solution }}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={"dtsId"}
                label="DTS ID"
                rules={[{ required: true }]}
              >
                <Input defaultValue={this.props.data[0].dtsId}/>
              </Form.Item>
              <Form.Item
                name={"link"}
                label="Link"
                rules={[{ required: true }]}
              >
                <Input defaultValue={this.props.data[0].link}/>
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
                <Select defaultValue={this.props.data[0].labels} mode="tags" placeholder="Please enter a tag">
                  {children}
                </Select>
              </Form.Item>
              <Form.Item
                name={"team"}
                label="Team"
                rules={[{ required: true }]}
              >
                <Select defaultValue={this.props.data[0].team} allowClear>
                  <Option value="client">Client</Option>
                  <Option value="server">Server</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name={"mergeRequest"}
                label="Merge Request"
                rules={[{ required: true }]}
              >
                <Input defaultValue={this.props.data[0].mergeRequest}/>
              </Form.Item>
              <Form.Item
                name={"solution"}
                label="Solution"
                rules={[{ required: true }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item name={"solvedDate"} label="Solved Date">
                <DatePicker showTime/>
              </Form.Item>
              <Form.Item name={"developer"} label="Developer">
                <Input defaultValue={this.props.data[0].developer}/>
              </Form.Item>
              <Form.Item name={"version"} label="Version">
                <Input defaultValue={this.props.data[0].version}/>
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default edit;
