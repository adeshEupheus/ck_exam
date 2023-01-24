import React, { useState } from "react";

import {
  Monitor,
  Home,
  // Laptop,
  // Hail,
  Assessment,
  Devices,
  Settings,
  // Message,
  Circle,
  KeyboardArrowDown,
  Scoreboard,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import logoLight from "../assets/classklap_logo.png";
import { Collapse } from "@mui/material";
// import Loader from "./Material/Loader";

const Sidebar = ({ sidebarCollapsed, highLight, show }) => {
  const [marsksEntry, setMarksEntry] = useState(false);

  return (
    <div
      className={`fixed transition-all h-[100vh] ease-linear duration-300 ${
        window.innerWidth < 1024 ? "-left-[100%]" : "left-[0%]"
      } lg:py-2 md:py-4 py-8 z-[100] w-[85vw] lg:w-[18vw] md:w-[30vw] bg-gray-200 h-[100vh] overflow-auto`}
    >
      <div
        className={`flex flex-col gap-2 transition-all ease-linear duration-100`}
      >
        <div className="flex items-center mt-[1rem] gap-3 justify-center">
          <img
            src={logoLight}
            className=" w-[10vw] md:w-[12vw] h-auto object-cover"
            alt=""
          />
        </div>
        <Link>
          <aside
            className={`px-6 mt-[1rem] py-2 hover:bg-gray-500 flex ${
              highLight === "live_class" ? "bg-gray-500" : ""
            } rounded-md gap-4 cursor-pointer group`}
          >
            <div className="flex gap-4">
              <Home
                className={`${
                  highLight === "live_class"
                    ? "!text-gray-100"
                    : "!text-gray-400"
                } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
              />
              <span
                className={`${
                  highLight === "live_class" ? "text-gray-200" : "text-gray-600"
                } group-hover:!text-gray-100 transition-all duration-150 font-semibold ease-linear`}
              >
                Live Class
              </span>
            </div>
          </aside>
        </Link>
        <Link>
          <aside
            onClick={() => setMarksEntry(!marsksEntry)}
            className={`pl-6 pr-1 py-2 mt-[1rem] flex justify-between gap-4 ${
              highLight === "revision_and_exam" ? "bg-gray-500" : ""
            } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
          >
            <div className="flex gap-4">
              <Devices
                className={`${
                  highLight === "revision_and_exam"
                    ? "!text-gray-100"
                    : "!text-gray-400"
                } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
              />
              <span
                className={`${
                  highLight === "revision_and_exam"
                    ? "text-gray-200"
                    : "text-gray-600"
                } group-hover:!text-gray-100 font-semibold transition-all duration-150 ease-linear`}
              >
                Revision & Exam
              </span>
            </div>
            <div
              className={`transition-all duration-200  ease-linear ${
                marsksEntry ? null : "-rotate-90"
              }`}
            >
              <KeyboardArrowDown className={`text-gray-600 `} />
            </div>
          </aside>
          <Collapse in={marsksEntry}>
            {" "}
            <div
              className={`${
                marsksEntry ? "h-[10vh] opacity-100 visible" : null
              } transition-all ease-linear duration-200`}
            >
              <Link to="/revision_and_exam/online_exam">
                <div
                  className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
                >
                  <Circle
                    className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                      highLight === "schoolTagging"
                        ? "text-white"
                        : "text-gray-600"
                    } `}
                  />
                  <h1
                    className={`pl-9 ${
                      highLight === "schoolTagging"
                        ? "text-white"
                        : "text-gray-600 "
                    } transition-all ease-linear text-sm font-semibold duration-200  py-2 cursor-pointer`}
                  >
                    Online Exam
                  </h1>
                </div>
              </Link>
              <Link to="/revision_and_exam/prs">
                <div
                  className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
                >
                  <Circle
                    className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                      highLight === "schools" ? "text-white" : "text-gray-600"
                    } `}
                  />
                  <h1
                    className={`pl-9 ${
                      highLight === "schools" ? "text-white" : "text-gray-600"
                    } transition-all ease-linear text-sm font-semibold duration-200  py-2 cursor-pointer`}
                  >
                    Personal Revision Sheet
                  </h1>
                </div>
              </Link>
            </div>
          </Collapse>
        </Link>
        <Link>
          <aside
            className={`px-6 mt-[1rem] py-2 hover:bg-gray-500 flex ${
              highLight === "download" ? "bg-gray-500" : ""
            } rounded-md gap-4 cursor-pointer group`}
          >
            <div className="flex gap-4">
              <Settings
                className={`${
                  highLight === "download" ? "!text-gray-100" : "!text-gray-400"
                } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
              />
              <span
                className={`${
                  highLight === "download" ? "text-gray-200" : "text-gray-600"
                } group-hover:!text-gray-100 transition-all duration-150 font-semibold ease-linear`}
              >
                Download
              </span>
            </div>
          </aside>
        </Link>
        <Link>
          <aside
            className={`px-6 mt-[1rem] py-2 hover:bg-gray-500 flex ${
              highLight === "e_learning_content" ? "bg-gray-500" : ""
            } rounded-md gap-4 cursor-pointer group`}
          >
            <div className="flex gap-4">
              <Assessment
                className={`${
                  highLight === "e_learning_content"
                    ? "!text-gray-100"
                    : "!text-gray-400"
                } group-hover:!text-gray-100 !transition-all !duration-150 !ease-linear`}
              />
              <span
                className={`${
                  highLight === "e_learning_content"
                    ? "text-gray-200"
                    : "text-gray-600"
                } group-hover:!text-gray-100 transition-all duration-150 font-semibold ease-linear`}
              >
                E-Learning Content
              </span>
            </div>
          </aside>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
