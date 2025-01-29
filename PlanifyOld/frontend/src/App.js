import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"; // Import Router components
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import "./App.css";
import History from "./History.js"; // Import the History component

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
var percentage = "";

function App() {
  const navigate = useNavigate(); 
  // State to store fetched data
  const [tasks, setTasks] = useState([]);
  const [graphData, setGraphData] = useState({}); // Initialize graph data for the chart

  // States for form data and time/date
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    date: "",
    level: "C", // Default value for the select input
    delFlg: "N",
    compFlg: "N",
  });
  const [time, setTime] = useState("");
  const [temperature, setTemperature] = useState("");
  const [date, setDate] = useState("");

  const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

  // Fetch data from API on component mount
  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data); // Store the fetched data in the state
        console.log(data)
// Filter tasks for the current date and delFlg !== 'Y'
const currentDateTasks = data.filter(
  (task) => task.date === currentDate && task.delFlg !== "Y"
);

// Filter tasks for compFlg === 'Y' and delFlg !== 'Y'
const completedTasks = data.filter(
  (task) => task.date === currentDate && task.compFlg === "Y" && task.delFlg !== "Y"
);
percentage = (completedTasks.length/currentDateTasks.length)*100
console.log(percentage)
percentage = Math.ceil(percentage / 10) * 10;
console.log(percentage)

// Log the total tasks on current date and completed tasks (compFlg = 'Y')
console.log("Total tasks on current date (excluding delFlg = 'Y'):", currentDateTasks.length);
console.log("Total completed tasks (compFlg = 'Y', excluding delFlg = 'Y'):", completedTasks.length);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to get filtered tasks for the current date, 2 days before, and 2 days after
  const getFilteredTasks = (data) => {
    const current = new Date();
    const startDate = new Date(current);
    startDate.setDate(current.getDate() - 2); // 2 days before
    const endDate = new Date(current);
    endDate.setDate(current.getDate() + 2); // 2 days after

    const start = startDate.toISOString().split("T")[0];
    const end = endDate.toISOString().split("T")[0];

    return data.filter((task) => task.date >= start && task.date <= end);
  };

  // Function to count the number of completed tasks per date
  const countCompletedTasks = (tasks) => {
    const taskCount = {};

    tasks.forEach((task) => {
      if (task.compFlg === "Y") {
        const date = task.date; // Use the task's date to group by
        taskCount[date] = taskCount[date] ? taskCount[date] + 1 : 1;
      }
    });

    return taskCount;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const apiEndpoint = "http://127.0.0.1:8000/";
    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Plan successfully added!");
          return response
            .json()
            .then((newTask) => setTasks([...tasks, newTask]));
        } else {
          throw new Error("Failed to add the plan");
        }
      })
      .catch((error) => {
        console.error("Error adding the plan:", error);
        alert("Failed to add the plan. Please try again.");
      });
  };

  // Fetch Tamil Nadu temperature
  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=11.1271&longitude=78.6569&current_weather=true"
        );
        const data = await response.json();
        const temp = data.current_weather.temperature; // Get the temperature in Celsius
        setTemperature(`${temp}°C`);
      } catch (error) {
        console.error("Error fetching temperature:", error);
        setTemperature("N/A");
      }
    };

    fetchTemperature();
    const tempInterval = setInterval(fetchTemperature, 10 * 60 * 1000); // Update temperature every 10 minutes

    return () => clearInterval(tempInterval); // Cleanup interval
  }, []);

  // Update live time every second and current date
  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const currentDate = new Date().toISOString().split("T")[0];

      setTime(currentTime);
      setDate(currentDate);
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval
  }, []);

  // Get filtered tasks and prepare graph data
  useEffect(() => {
    const filteredTasks = getFilteredTasks(tasks); // Filter tasks based on the date range
    const completedTasks = countCompletedTasks(filteredTasks); // Count completed tasks by date

    const labels = [];
    const completed = [];

    const current = new Date();
    for (let i = -2; i <= 2; i++) {
      const date = new Date(current);
      date.setDate(current.getDate() + i);
      const dateString = date.toISOString().split("T")[0]; // Get date in YYYY-MM-DD format

      // Format the date for display as "Jan 27"
      const formattedDate = new Date(dateString).toLocaleDateString("en-US", {
        month: "short", // Abbreviated month
        day: "numeric", // Day of the month
      });

      labels.push(formattedDate);
      completed.push(completedTasks[dateString] || 0); // If no tasks on that date, use 0
    }

    setGraphData({
      labels: labels,
      datasets: [
        {
          label: "Completed Tasks",
          data: completed,
          backgroundColor: "#875bae",
          borderColor: "#875bae",
          borderWidth: 1,
        },
      ],
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: {
              color: "#ffffff", // Change X-axis tick color (red in this case)
            },
            grid: {
              color: "#ffffff", // Change the grid lines color
            },
          },
          y: {
            ticks: {
              color: "#ffffff", // Change Y-axis tick color (red in this case)
            },
            grid: {
              color: "#ffffff", // Change the grid lines color
            },
          },
        },
      },
    });
  }, [tasks]);

  // Handle input changes for form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle task completion and deletion
  const handleComplete = (taskId) => {
    const dataToSend = { compFlg: "Y" };

    fetch(`http://127.0.0.1:8000/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (response.ok) {
          alert("Task marked as completed!");
        } else {
          throw new Error("Failed to mark the task as completed");
        }
      })
      .catch((error) => {
        console.error("Error updating the task:", error);
        alert("Failed to mark the task as completed. Please try again.");
      });
  };

  const handleDelete = (taskId) => {
    const dataToSend = { delFlg: "Y" };

    fetch(`http://127.0.0.1:8000/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (response.ok) {
          alert("Task deleted successfully!");
        } else {
          throw new Error("Failed to delete the task");
        }
      })
      .catch((error) => {
        console.error("Error deleting the task:", error);
        alert("Failed to delete the task. Please try again.");
      });
  };

  return (
    <div className="master-container">
      <div className="top-container">
        <div className="top-bar">
          <button className="top-div">
            Planify <i className="fa fa-pagelines"></i>
          </button>
          <button className="top-div">
            Hi Sara <i className="fa fa-smile-o"></i>
          </button>
          <button className="top-div">
            Under Dev <i className="fa fa-cogs"></i>
          </button>
          <button
            className="top-div history"
            onClick={() => navigate("/history")} // Navigate to /history
          >
            Consolidated <i className="fa fa-history"></i>
          </button>
        </div>
      </div>

      <div className="mid-container">
        <div className="circles">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="211"
            height="211"
            viewBox="0 0 211 211"
          >
            <defs>
              <clipPath id="clip-path">
                <circle
                  id="mask"
                  cx="105.5"
                  cy="105.5"
                  r="105.5"
                  transform="translate(312 -1822)"
                  fill="#fff"
                  stroke="#707070"
                  strokeWidth="1"
                />
              </clipPath>
            </defs>
            <g id="circle" transform="translate(-312 1822)">
              <g
                id="bg"
                transform="translate(312 -1822)"
                fill="#fff"
                stroke="#707070"
                strokeWidth="1"
              >
                <circle cx="105.5" cy="105.5" r="105.5" stroke="none" />
                <circle cx="105.5" cy="105.5" r="105" fill="none" />
              </g>
              <g id="water" clipPath="url(#clip-path)">
                <path
                id="waveShape" className={`p${percentage}`}
                  d="M500,118.244v223.11H4V106.464c43.35,1.17,46.02,11.89,94.4,11.89,51.2,0,51.2-12,102.39-12s51.2,12,102.4,12,51.2-12,102.41-12C453.98,106.354,456.65,117.074,500,118.244Z"
                  transform="translate(308 -1830.354)"
                  fill="#875BAE"
                />
              </g>
            </g>
            <text
              x="105.5"
              y="105.5"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="24"
              fill="#000"
            >
              {percentage}% Goal Completed
            </text>
          </svg>
        </div>
        <div className="large-div graph">
          <div className="graph-outer">
            <h6>Task Completion Status</h6>

            {/* Graph inside the div with the class 'graph' */}
            <div className="large-div graph">
              {graphData.labels && graphData.datasets ? (
                <Bar
                  data={graphData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                    },
                  }}
                />
              ) : (
                <p>Loading data...</p>
              )}
            </div>
          </div>
        </div>
        <div className="stacked-container">
          <div className="timer">
            <p>{date}</p> {/* Display the current date */}
            <p>{time}</p> {/* Display the current time */}
            <p>{temperature}</p> {/* Display the temperature */}
          </div>

          <div className="widget">
          <p>Custom widget</p>
            <button className="edit-btn">
              <i className="fa fa-pencil"></i>
            </button>
          </div>
        </div>
        <div className="large-div critical-box">
          <div className="grid-item critical-title">
            <p>Critical task</p>
          </div>
          {tasks
            .filter((task) => task.level === "C" && task.delFlg === "N") // Filter tasks where delFlg is 'N'
            .slice(0, 50)
            .map((task, index) => (
              <div className="grid-item" key={index}>
                <span>{task.title}  -  {task.date}                 <div className="icon-container">
                    <i className={`fa fa-star ${task.compFlg}`}></i>
                    <span className="tooltip">Completed &#128578;</span>
                  </div></span>{" "}

                {/* Display the title from the fetched data */}
                <button className="trash-btn" onClick={() => handleDelete(task.ids)}>
                  <i className="fa fa-trash"></i>
                </button>
                <button className="tick-btn" onClick={() => handleComplete(task.ids)}>
                  <i className="fa fa-check"></i>
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className="last-container">
        <div className="add-plan">
          <form className="add-plan" onSubmit={handleSubmit}>
            <input
              className="tite"
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <input
              className="dsc"
              type="text"
              name="desc"
              placeholder="Describe"
              value={formData.desc}
              onChange={handleChange}
              required
            />
            <select
              className="leel"
              name="level"
              value={formData.level}
              onChange={handleChange}
            >
              <option value="C">Critical</option>
              <option value="M">Medium</option>
              <option value="L">Low</option>
            </select>
            <input
              className="dae date-picer"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <input
              className="delFlg"
              type="text"
              name="delFlg"
              value={formData.delFlg}
              readOnly
              style={{ display: "none" }}
            />
            <input
              className="compFlg"
              type="text"
              name="compFlg"
              value={formData.compFlg}
              readOnly
              style={{ display: "none" }}
            />
            <button className="submit" type="submit">
              Planify
            </button>
          </form>
        </div>
        <div className="content-grid">
          <script>console.log(currentDate)</script>
          {tasks
            .filter((task) => task.delFlg === "N" && task.date === currentDate)
            .map((task, index) => (
              <div className="grid-item" key={task.ids}>
                <h6>
                  {task.title}
                  <div className="icon-container">
                    <i className={`fa fa-star ${task.compFlg}`}></i>
                    <span className="tooltip">Completed &#128578;</span>
                  </div>
                </h6>
                <br></br>
                <p>{task.desc}</p>
                <p>{task.date}</p>
                <br></br>
                <div className={task.level}></div>
                <button
                  className="trash-btn"
                  onClick={() => handleDelete(task.ids)}
                >
                  <i className="fa fa-trash"></i>
                </button>
                <button
                  className="tick-btn"
                  onClick={() => handleComplete(task.ids)}
                >
                  <i className="fa fa-check"></i>
                </button>
              </div>
            ))}
        </div>
        <div className="news">
          <div className="large-div critical-box news-box">
            <div className="grid-item critical-title">
              <p>Non Critical task</p>
            </div>
            {tasks
              .filter((task) => task.level !== "C" && task.delFlg === "N") // Filter tasks where delFlg is 'N'
              .slice(0, 50)
              .map((task, index) => (
                <div className="grid-item" key={index}>
                  <span>{task.title}  -  {task.date}                 <div className="icon-container">
                    <i className={`fa fa-star ${task.compFlg}`}></i>
                    <span className="tooltip">Completed &#128578;</span>
                  </div></span>{" "}
                  {/* Display the title from the fetched data */}
                  <button className="trash-btn" onClick={() => handleDelete(task.ids)}>
                  <i className="fa fa-trash"></i>
                </button>
                <button className="tick-btn" onClick={() => handleComplete(task.ids)}>
                  <i className="fa fa-check"></i>
                </button>
                </div>
              ))}
          </div>
        </div>
        <div className="footer">Made with &#10084;
        </div>
      </div>
      </div>
  );
}

// Wrap the app in Router and define routes
function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
