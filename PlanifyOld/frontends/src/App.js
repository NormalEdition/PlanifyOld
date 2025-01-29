// App.js
import React from "react";
import "./App.css";

function App() {
  return (
    <div className="master-container">
      <div className="top-container">
        <div className="top-bar">
          <button className="top-div">
            Planify
            <i className="fa fa-pagelines"></i>
          </button>
          <button className="top-div">
            Hi Sara
            <i className="fa fa-smile-o"></i>
          </button>
          <button className="top-div">
            Search
            <i className="fa fa-search"></i>
          </button>
          <button className="top-div">
            History
            <i className="fa fa-history"></i>
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
                  id="waveShape"
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
              Goal
            </text>
          </svg>
        </div>
        <div className="large-div graph">Graph</div>
        <div className="stacked-container">
          <div className="timer">
            <p>08:48AM</p>
            <p>98c</p>
          </div>
          <div className="widget">
            <button className="edit-btn">
              <i className="fa fa-pencil"></i>
            </button>
          </div>
        </div>
        <div className="large-div critical-box">
          <div className="grid-item">
            <p>hi fbhgfbdhsdbhj</p>
            <button className="trash-btn">
              <i className="fa fa-trash"></i>
            </button>
            <button className="edit-btn">
              <i className="fa fa-pencil"></i>
            </button>
            <button className="tick-btn">
              <i className="fa fa-check"></i>
            </button>
          </div>
          <div className="grid-item">
            <p>hi fbhgfbdhsdbhj</p>
            <button className="trash-btn">
              <i className="fa fa-trash"></i>
            </button>
            <button className="edit-btn">
              <i className="fa fa-pencil"></i>
            </button>
            <button className="tick-btn">
              <i className="fa fa-check"></i>
            </button>
          </div>
          <div className="grid-item">
            <p>hi fbhgfbdhsdbhj</p>
            <button className="trash-btn">
              <i className="fa fa-trash"></i>
            </button>
            <button className="edit-btn">
              <i className="fa fa-pencil"></i>
            </button>
            <button className="tick-btn">
              <i className="fa fa-check"></i>
            </button>
          </div>
          <div className="grid-item">
            <p>hi fbhgfbdhsdbhj</p>
            <button className="trash-btn">
              <i className="fa fa-trash"></i>
            </button>
            <button className="edit-btn">
              <i className="fa fa-pencil"></i>
            </button>
            <button className="tick-btn">
              <i className="fa fa-check"></i>
            </button>
          </div>
          <div className="grid-item">
            <p>hi fbhgfbdhsdbhj</p>
            <button className="trash-btn">
              <i className="fa fa-trash"></i>
            </button>
            <button className="edit-btn">
              <i className="fa fa-pencil"></i>
            </button>
            <button className="tick-btn">
              <i className="fa fa-check"></i>
            </button>
          </div>
          <div className="grid-item">
            <p>hi fbhgfbdhsdbhj</p>
            <button className="trash-btn">
              <i className="fa fa-trash"></i>
            </button>
            <button className="edit-btn">
              <i className="fa fa-pencil"></i>
            </button>
            <button className="tick-btn">
              <i className="fa fa-check"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="last-container">
        <div className="add-plan">
          {" "}
          <input type="text" placeholder="Title" />
          <input type="text" placeholder="Describe" />
          <select>
            <option value="Option 1">Critical</option>
            <option value="Option 2">Medium</option>
            <option value="Option 3">Low</option>
          </select>
          <input type="date" className="date-picker" />
          <button className="submit">Planify</button>
        </div>
        <div className="content-grid">
          <div className="grid-item">
            <button className="trash-btn">
              <i className="fa fa-trash"></i>
            </button>
            <button className="edit-btn">
              <i className="fa fa-pencil"></i>
            </button>
            <button className="tick-btn">
              <i className="fa fa-check"></i>
            </button>
          </div>
          <div className="grid-item">
            <button className="trash-btn">
              <i className="fa fa-trash"></i>
            </button>
            <button className="edit-btn">
              <i className="fa fa-pencil"></i>
            </button>
            <button className="tick-btn">
              <i className="fa fa-check"></i>
            </button>
          </div>
          <div className="grid-item">
            <button className="trash-btn">
              <i className="fa fa-trash"></i>
            </button>
            <button className="edit-btn">
              <i className="fa fa-pencil"></i>
            </button>
            <button className="tick-btn">
              <i className="fa fa-check"></i>
            </button>
          </div>
          <div className="grid-item">
            <button className="trash-btn">
              <i className="fa fa-trash"></i>
            </button>
            <button className="edit-btn">
              <i className="fa fa-pencil"></i>
            </button>
            <button className="tick-btn">
              <i className="fa fa-check"></i>
            </button>
          </div>
          <div className="grid-item">
            <button className="trash-btn">
              <i className="fa fa-trash"></i>
            </button>
            <button className="edit-btn">
              <i className="fa fa-pencil"></i>
            </button>
            <button className="tick-btn">
              <i className="fa fa-check"></i>
            </button>
          </div>
          <div className="grid-item">
            <button className="trash-btn">
              <i className="fa fa-trash"></i>
            </button>
            <button className="edit-btn">
              <i className="fa fa-pencil"></i>
            </button>
            <button className="tick-btn">
              <i className="fa fa-check"></i>
            </button>
          </div>
        </div>
        <div className="news">
          {" "}
          <div className="critical-box">
            <div className="grid-item">
              <p>hi fbhgfbdhsdbhj</p>
            </div>
            <div className="grid-item">
              <p>hi fbhgfbdhsdbhj</p>
            </div>
            <div className="grid-item">
              <p>hi fbhgfbdhsdbhj</p>
            </div>
            <div className="grid-item">
              <p>hi fbhgfbdhsdbhj</p>
            </div>
            <div className="grid-item">
              <p>hi fbhgfbdhsdbhj</p>
            </div>
            <div className="grid-item">
              <p>hi fbhgfbdhsdbhj</p>
            </div>
            <div className="grid-item">
              <p>hi fbhgfbdhsdbhj</p>
            </div>
            <div className="grid-item">
              <p>hi fbhgfbdhsdbhj</p>
            </div>
          </div>
        </div>
        <div className="footer">Footor</div>
      </div>
    </div>
  );
}

export default App;
