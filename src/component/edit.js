import React, { Component } from "react";
import { Button, Form, Input, Select, DatePicker, message } from "antd";
import style from "./css/table.module.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Axios from "axios";
import moment from "moment";

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};

const validateMessages = {
  required: "${label} is required!",
};

const success = () => {
  message.success("Successfully Changed...");
};

class edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title : "",
      key : "",
    }
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
    this.form = React.createRef();
  }
 
  getInitialValues() {
    let initialValues = {};
    this.props.onIssueChange === "dts" ? 
    initialValues = {
      dtsId: this.props.data[0].dtsId,
      link: this.props.data[0].link,
      description: this.props.data[0].description,
      labels: this.props.data[0].labels,
      team: this.props.data[0].team,
      mergeRequest: this.props.data[0].mergeRequest,
      solution: this.props.data[0].solution,
      solvedDate: moment(this.props.data[0].solvedDate),
      developer: this.props.data[0].developer,
      version: this.props.data[0].version,
    } : initialValues = {
      reqId: this.props.data[0].reqId,
      link: this.props.data[0].link,
      description: this.props.data[0].description,
      labels: this.props.data[0].labels,
      team: this.props.data[0].team,
      mergeRequest: this.props.data[0].mergeRequest,
      solution: this.props.data[0].solution,
      solvedDate: moment(this.props.data[0].solvedDate),
      developer: this.props.data[0].developer,
      version: this.props.data[0].version,
    }
    return initialValues;  
  }

  onFinish = (values) => {
    Axios.put("http://localhost:8080/save-issue", { values })
      .then((res) => {
        if (res.statusText === "Created") {
          success();
          this.form.resetFields();
          this.props.onEditChange();
        }
        console.log(res.statusText);
        //console.log(res);
        //console.log(res.data);
        //console.log(res.status); 201
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
              ref={(ref) => {
                this.form = ref;
              }}
              name="nest-messages"
              onFinish={this.onFinish}
              initialValues={this.getInitialValues()}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={this.state.key}
                label={this.state.title}
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
                <Select mode="multiple">
                  {this.tags.map((tag, i) => (
                    <Option value={tag}>{tag}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name={"team"}
                label="Team"
                rules={[{ required: true }]}
              >
                <Select allowClear>
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
      </div>
    );
  }
}

export default edit;
