import React, { Component } from "react";
import { Table, Tag, Input, Popconfirm, Button } from "antd";
import { DeleteFilled, SearchOutlined } from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import Axios from "axios";
import AddIssue from "./addIssue";
import style from "./css/table.module.scss";
import Detail from "./detail";
import Edit from "./edit";

class table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      team: "",
      issue: "",
      filteredData: [],
      title: "DTS ID",
      key: "dtsId",
      searchText: '',
      searchedColumn: '',
    };
    this.handleFlagChange = this.handleFlagChange.bind(this);
    this.handleDetailChange = this.handleDetailChange.bind(this);
    this.handleDeleteChange = this.handleDeleteChange.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
  }

  getColumSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
      <div style={{padding:8}}>
        <Input
        ref={node => {
          this.searchInput = node;  
        }}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
        style={{width: 188, marginBottom: 8, display: 'block'}}
        />
        <Button
        type="primary"
        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
        icon={<SearchOutlined />}
        size="small"
        style={{width: 90, marginRight: 8}}
        >
          Search
        </Button>
        <Button 
        onClick={() => this.hadleReset(clearFilters)}
        size="small"
        style={{width: 90}}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}} />,
    onFilter: (value, record) =>
    record[dataIndex]
    .toString()
    .toLowerCase()
    .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
    this.state.searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{backgroundColor: '#ffc069', padding:0}}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      /> 
    ) : (
      text
    ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    })
  };

  hadleReset = clearFilters => {
    clearFilters();
    this.setState({
      searchText: ''
    });
  }

  getColumns = () => {
    
    const columns = [
      {
        title: this.state.title,
        dataIndex: this.state.key,
        key: this.state.key,
        fixed: "left",
        ...this.getColumSearchProps(this.state.key),
        render: (text, record) => (
          <a href={record.link} target="_blan">
            {text}
          </a>
        ),
      },
      {
        title: "Description",
        dataIndex: "description",
        ...this.getColumSearchProps("description"),
      },
      {
        title: "Tags",
        dataIndex: "labels",
        filters : [
          {
            text : "Trace",
            value : "Trace"
          },
          {
            text : "Monitor",
            value : "Monitor"
          },
          {
            text : "Batch",
            value : "Batch"
          },
          {
            text : "MML",
            value : "MML"
          },
          {
            text : "Alarm/Event",
            value : "Alarm/Event"
          },
          {
            text : "Self Test",
            value : "Self Test"
          },
          {
            text : "Device Maintenance",
            value : "Device Maintenance"
          },
          {
            text : "Parse",
            value : "Parse"
          },
          {
            text : "Save",
            value : "Save"
          }
        ],
        onFilter : (value, record) => record.labels.includes(value) === true,
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
        title: "Detail",
        fixed: "right",
        render: (record) => (
          <span>
            <a onClick={() => this.showDetailPage(record.dtsId)}>
              <SearchOutlined />
            </a>
          </span>
        ),
      },
      {
        title: "Delete",
        fixed: "right",
        render: (record) => (
          <span>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDeleteChange(record.dtsId)}
            >
              <a>
                <DeleteFilled />
              </a>
            </Popconfirm>
          </span>
        ),
      },
    ];

    return columns
  }

  

  showDetailPage(dtsId) {
    this.props.onFlagChange("3");
    const filteredData = Array(...this.state.data).filter(
      (item) => item.dtsId === dtsId
    );
    this.setState({
      filteredData: filteredData,
    });
  }
  handleDetailChange(filteredData) {
    this.props.onFlagChange("4");
    this.setState({
      filteredData: filteredData,
    });
  }

  handleFlagChange() {
    this.props.onFlagChange("2");
  }

  handleEditChange = async () => {
    this.props.onFlagChange("1");
    try {
      const response = await Axios.get("http://localhost:8080/dts?v=2");
      const data = response.data.map((item) => {
        return { ...item, key: item.dtsId };
      });
      this.setState({ 
        searchText: '',
        data 
      });
    } catch (error) {
      this.setState({ data: [] });
    }
  }

  componentDidMount = async () => {
    this.setState(() => {
      this.state.team = this.props.team;
      this.state.issue = this.props.issue;
    });
    //this.props.flag === "1" ? this.title="Requirement ID" : this.title= "DTS ID";
    //console.log(this.state.issue);
    //console.log(this.state.team);
    //const response1 = await Axios.get(`http://localhost:8080/query-key-${this.state.issue}?team=${this.state.team}&currentPage=${number}&size=10&sortBy=solvedDate`);

    try {
      const response = await Axios.get("http://localhost:8080/dts?v=2");
      const data = response.data.map((item) => {
        return { ...item, key: item.dtsId };
      });
      this.setState({ data });
    } catch (error) {
      this.setState({ data: [] });
    }
  };

  componentDidUpdate = async () => {
    try {
      const response = await Axios.get("http://localhost:8080/dts?v=2");
      const data = response.data.map((item) => {
        return { ...item, key: item.dtsId };
      });
      if (
        this.state.issue === this.props.issue &&
        this.state.team === this.props.team
      ) {
        console.log("okayyy");
      } else {
        this.setState({
          team: this.props.team,
          issue: this.props.issue,
          data: data,
          searchText: '',
        });
        this.props.issue === "dts"
          ? this.setState({
              title: "DTS ID",
              key : "dtsId",
            })
          : this.setState({
              title: "Requirement ID",
              key : "reqId",
            });
      }
    } catch (error) {
      console.log("error" + error);
    }
  };

  handleDeleteChange(dtsId) {
    Axios.delete(`http://localhost:8080/dts/${dtsId}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        console.log(res.status);
        console.log(res.statusText);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {(() => {
          switch (this.props.flag) {
            case "1":
              return (
                <div>
                  <div className={style.newIssue}>
                    <Button onClick={this.handleFlagChange} type="primary">
                      Add New Issue
                    </Button>
                  </div>
                  <Table
                    columns={this.getColumns()}
                    dataSource={this.state.data}
                    bordered
                  />
                </div>
              );

            case "2":
              return (
                <AddIssue
                  onIssueChange={this.state.issue}
                  onEditChange={this.handleEditChange}
                  issue={this.state.issue}
                  team={this.state.team}
                ></AddIssue>
              );

            case "3":
              return (
                <Detail
                  onIssueChange={this.state.issue}
                  onEditChange={this.handleEditChange}
                  data={this.state.filteredData}
                  onDetailChange={this.handleDetailChange}
                />
              );

            case "4":
              return (
                <Edit
                  onIssueChange={this.state.issue}
                  data={this.state.filteredData}
                  onEditChange={this.handleEditChange}
                />
              );

            default:
              return <div>Hello World</div>;
          }
        })()}
      </div>
    );
  }
}

export default table;
