import React, { Component } from "react";
import { Table, Tag, Popconfirm } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import Axios from "axios";
import AddIssue from "./addIssue";
import { Button } from "antd";
import style from "./style.module.scss";
import Edit from './edit';


class table extends Component {

    constructor(props) {
        super(props);
        this.state = {
          data: [],
          team: "",
          issue: "",
          edit: false,
          filteredData:[],
        };
        this.handleFlagChange = this.handleFlagChange.bind(this);
        this.handleDetailChange = this.handleDetailChange.bind(this);
        this.handleDeleteChange = this.handleDeleteChange.bind(this);
        this.expandedRowRender = this.expandedRowRender.bind(this);
      }

      expandedRowRender(e) {
        const {dtsId} = e;

        const filteredData = Array(...this.state.data).filter((item) => item.dtsId === dtsId);
        const subColumns = [
          { 
            title: 'Team', 
            dataIndex: 'team', 
          },
          { 
            title: 'Merge Request', 
            dataIndex: 'mergeRequest',
            render: (text) => (
              <a href={text} target="_blan">{text}</a>
            )
          },
          {
            title: 'Solution',
            dataIndex: 'solution',
          },
          { 
            title: 'Solved Date', 
            dataIndex: 'solvedDate', 
          },
          { 
            title: 'Developer', 
            dataIndex: 'developer', 
          },
          { 
            title: 'Version', 
            dataIndex: 'version', 
          },
          { 
            title: 'Edit', 
            render: (record) => (
              <span>
                <a onClick={() => this.handleDetailChange(filteredData)}>
                  <EditFilled />
                </a>
              </span>
            ),
          },
        ];
        return <Table columns={subColumns} dataSource={filteredData} pagination={false} />;
      }

    columns = [
        {
          title: "DTS ID",
          dataIndex: "dtsId",
          key: "dtsId",
          render: (text,record) => <a href={record.link} target="_blan">{text}</a>,
        },
        {
          title: "Description",
          dataIndex: "description",
        },
        {
          title: "Tags",
          dataIndex: "labels",
          render: (tags) => (
            <span>
              {tags.map((tag) => {
                let color = tag.length > 5 ? "geekblue" : "green";
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </span>
          ),
        },
        {
          title: "Delete",
          render: (record) => (
            <span>
              <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDeleteChange(record.dtsId)}>
              <a>
              <DeleteFilled />
              </a>
            </Popconfirm>
            </span>
          ),
        },
    ];

  handleDetailChange(filteredData) {
      this.setState({
          edit : !this.state.edit,
          filteredData: filteredData
      })
  }

  handleFlagChange() {
    this.props.onFlagChange(!this.props.flag);
  }

  handleDeleteChange(dtsId) {
    Axios.delete(`http://localhost:8080/dts/${dtsId}`)
    .then(res => {
      console.log(res);
      console.log(res.data);
      console.log(res.status);
      console.log(res.statusText);
    })
    .catch(error => {
      console.log(error);
    })
  }

  componentDidMount = async () => {
    this.setState((state, props) => {
      this.state.team = this.props.team;
      this.state.issue = this.props.issue;
    });
    //console.log(this.state.issue);
    //console.log(this.state.team);
    //const response1 = await Axios.get(`http://localhost:8080/query-key-${this.state.issue}?team=${this.state.team}&currentPage=${number}&size=10&sortBy=solvedDate`);
    const response = await Axios.get("http://localhost:8080/dts");
    this.setState({
      data: response.data.map((item) => {
        return {...item, key: item.dtsId};
      }),
    });
  };

  componentDidUpdate = async () => {
      
  }

  render() {
    return (
      <div>
        {!this.state.edit ? 
        <div>
            {this.props.flag ? (
          <div>
            <div className={style.newIssue}>
              <Button onClick={this.handleFlagChange} type="primary">
                Add New Issue
              </Button>
            </div>
            <Table columns={this.columns} expandable={{expandedRowRender: this.expandedRowRender}} dataSource={this.state.data} bordered />
          </div>
        ) : (
          <AddIssue
            onFlagChange={this.handleFlagChange}
            issue={this.state.issue}
            team={this.state.team}
          ></AddIssue>
        )}</div>
    :
         <Edit data={this.state.filteredData} onDetailChange={this.handleDetailChange}></Edit>   
    }
        
      </div>
    );
  }
}

export default table;
