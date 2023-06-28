import "./App.css";
import { React, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import Textarea from "@mui/joy/Textarea";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DataGrid } from "@mui/x-data-grid";

const Login = () => {
  const [value, setValue] = useState(dayjs("2023-06-28T15:30"));
  const [loginData, setloginData] = useState({
    Title: "",
    Description: "",
    DueDate: value,
  });
  const [taskList, settaskList] = useState([]);
  const columns = [
    { field: "Task", headerName: "Title", width: 130 },
    { field: "TaskName", headerName: "Description", width: 250 },
    {
      field: "Date",
      headerName: "Date & Time",
      width: 350,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        
        return (
          <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Due Date"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          return alert(JSON.stringify(currentRow, null, 4));
        };
        const handledelete = (e) => {
          const id = params.row._id;
          console.log(id)
            axios
              .delete("http://localhost:3072/tasks/tasks", {
                data: {
                  id: id,
                },
              })

              .then((res) => {
                console.log(res);
                alert("deleted");
              })
              .catch((err) => {
                console.log(err.response.data.message);
                alert(err.response.data.message);
              });
        };

        return (
          <>
            <Button
              variant="outlined"
              color="warning"
              size="small"
              onClick={onClick}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={handledelete}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

 
  const row = taskList;

  const handlechange = (e) => {
    const { name, value } = e.target;
    setloginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handletask = () => {
    //  console.log(1);
    axios({
      method: "post",
      url: "http://localhost:3072/tasks/tasks",
      data: loginData,
    })
      .then((res) => {
        console.log(res);
        settaskList(res.data.Task);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3072/tasks/tasks",
    })
      .then((res) => {
        console.log(res);
        settaskList(res.data.taskList);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      });
    console.log(taskList);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="get_list">
        <h4>Task List</h4>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={row}
            getRowId={(taskList) => taskList._id}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </div>
      <h5>Create Task</h5>
      <div className="div">
        <TextField
          value={loginData.Title}
          onChange={handlechange}
          name={"Title"}
          variant="outlined"
          label="Title"
          required
        />
        <Textarea
          value={loginData.Description}
          onChange={handlechange}
          name={"Description"}
          variant="outlined"
          required
          placeholder="Type in here..."
          label="Description"
          minRows={2}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              label="Due Date"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>

      <div className="button">
        <br />
        <Button onClick={handletask} variant="contained" endIcon={<SendIcon />}>
          add task
        </Button>
      </div>
    </div>
  );
};

export default Login;
