import React, { Component } from "react";
import { Form, Input, Select, Button, DatePicker, message } from "antd";
import style from "./style.module.scss";
import Axios from "axios";


const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};

const validateMessages = {
  required: "${label} is required!",
};

const onFinish = (values) => {
  Axios.post('http://localhost:8080/save-issue', {values})
  .then(res => {
    if (res.statusText === "Created") {
      success();
    }
    //console.log(res);
    //console.log(res.data);
    //console.log(res.status); 201
    //console.log(res.statusText); Created
  })
};

const children = [];

const success = () => {
  message.success('Successfully Created...');
};

class addIssue extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div className={style.form}>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={"dtsId"}
              label="DTS ID"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"link"}
              label="Link"
              rules={[{ required: true }]}
            >
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
              <Select mode="tags" placeholder="Please enter a tag">
                {children}
              </Select>
            </Form.Item>
            <Form.Item
              name={"team"}
              label="Team"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Please select a team"
                allowClear
              >
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
              <DatePicker showTime />
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
