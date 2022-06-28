import React from "react";
import "../CSS/Header.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";
import { IoIosNotifications, IoMdSearch } from "react-icons/io";
export default function Header() {
  return (
    <div className="header">
      <div className="logo">Manager</div>
      <div className="right-header">
        <div className="user-panel ">
          <div className="user">
            <img
              src={
                "https://xuconcept.com/wp-content/uploads/2021/11/tai-hinh-nen-mien-phi.jpg"
              }
              className="user-avatar"
              alt="user-avatar"
            />
            <div className="user-name" style={{ marginLeft: 20 }}>
              <div style={{ fontWeight: 500 }}>Tuong Hai</div>
              <div style={{ fontSize: 15 }}>Software Engineer Intern</div>
            </div>
          </div>
          <RiArrowDropDownLine
            style={{
              color: "rgb(97, 95, 95)",
              fontSize: 35,
              cursor: "pointer",
            }}
          />
        </div>
        <div className="options-panel">
          <div className="options-panel-item" style={{ marginRight: 12 }}>
            <AiOutlineMenuUnfold style={{ fontSize: 20 }}></AiOutlineMenuUnfold>
          </div>
          <div className="options-panel-item">
            <MdMarkEmailRead style={{ fontSize: 20 }}></MdMarkEmailRead>
          </div>
          <div className="options-panel-item" style={{ marginLeft: 12 }}>
            <IoIosNotifications style={{ fontSize: 20 }}></IoIosNotifications>
          </div>
        </div>
        <div className="search-panel">
          <div style={{ position: "relative" }}>
            <input
              className="search-header-input"
              type={"text"}
              placeholder="Search..."
            />
            <div
              style={{
                display: "flex",
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                float: "right",
                right: 0,
                bottom: 0,
                height: "100%",
                padding: "0 7px",
              }}
            >
              <IoMdSearch
                className="search-icon"
                style={{ fontSize: 20, cursor: "pointer" }}
              ></IoMdSearch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
