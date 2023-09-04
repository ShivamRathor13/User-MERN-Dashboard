import React, { useState, useEffect, useRef } from "react";
import "./App.css";
const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  const toggleSidebar = (e) => {
    e.stopPropagation();
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarRef = useRef(null);

  useEffect(() => {
    const checkWindowWidth = () => {
      if (window.innerWidth <= 769) {
        setShowToggle(true);
        setIsSidebarOpen(false);
      } else {
        setShowToggle(false);
        setIsSidebarOpen(true);
      }
    };

    checkWindowWidth();
    const handleResize = () => {
      checkWindowWidth();
      if (window.innerWidth > 769) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logoStyle = {
    marginLeft: showToggle ? "24px" : "20px",
    transition: "margin-left 0.3s ease-in-out",
  };

  const closeSidebar = () => {
    if (window.innerWidth >= 769) setIsSidebarOpen(true);
  };

  useEffect(() => {
    const closeSidebarOnBodyClick = (e) => {
      if (
        window.innerWidth <= 769 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        e.target.getAttribute("id") !== "sidebar-toggle"
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen && window.innerWidth <= 769) {
      document.body.addEventListener("click", closeSidebarOnBodyClick);
    }

    return () => {
      document.body.removeEventListener("click", closeSidebarOnBodyClick);
    };
  }, [isSidebarOpen]);

  return (
    <div>
      <div className="nav-style">
        <div>
          {showToggle && (
            <button onClick={toggleSidebar} className="toggleButtonStyle">
              <img src="/list-nested.svg" alt="T" />
            </button>
          )}
          <h3 style={logoStyle}>
            <img
              style={{ width: "120px" }}
              src="/blackcoffer-logo-new.png"
              alt="blackcoffer"
            />
          </h3>
        </div>
        <div className="Heading">User Dashboard</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* <input
            type="text"
            placeholder="Search..."
            // style={{ marginRight: "20px" }}
            className="search-input"
          /> */}
          <ul
            style={{
              listStyle: "none",
              margin: "0",
              padding: "0",
              display: "flex",
            }}
          >
            <li style={{ marginRight: "20px" }}>
              <button className="nav-content sidebar-buttons">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="14"
                    fill="currentColor"
                    class="bi bi-house"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                  </svg>
                </span>
                Home
              </button>
            </li>
            <li style={{ marginRight: "20px" }}>
              <button className="nav-content sidebar-buttons">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="13"
                    fill="currentColor"
                    class="bi bi-file-earmark-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z" />
                  </svg>
                </span>
                About
              </button>
            </li>
            <li style={{ marginRight: "20px" }}>
              <button className="nav-content sidebar-buttons">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="14"
                    fill="currentColor"
                    class="bi bi-inbox"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438L14.933 9zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z" />
                  </svg>
                </span>{" "}
                Contact
              </button>
            </li>
          </ul>
        </div>
      </div>

      <nav
        id="sidebar"
        ref={sidebarRef}
        style={{
          backgroundColor: "#F6F8FC",
          height: "100%",
          position: "fixed",
          top: "58px",
          left: isSidebarOpen ? "0" : "-300px",
          zIndex: 1000,
          width: "250px",
          // borderRight: "1px solid #ccc",
          borderBottom: "1px solid #ccc",
          boxShadow: "1px 1px 19px rgba(0, 0, 0, 0.1)",
          overflowY: "auto",
          transition: "left 0.3s ease-in-out",
        }}
        className="side-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sidebarAll">
          <div className="sidebarstyle">
            <div>
              <div className="dropdown">
                <button
                  href="#"
                  className="special sidebar-buttons"
                  onClick={closeSidebar}
                >
                  <div style={{ marginLeft: "33px" }}>
                    <span style={{ marginRight: "8px" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="29"
                        height="16"
                        fill="#000"
                        class="bi bi-house-dash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 1 1 0-1Z" />
                        <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.708L8 2.207l-5 5V13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 2 13.5V8.207l-.646.647a.5.5 0 1 1-.708-.708L7.293 1.5Z" />
                      </svg>{" "}
                    </span>{" "}
                    Dashboard
                  </div>
                </button>
                <div className="dropdown-content">
                  <p>
                    <span class="bullet"></span> Analytics
                  </p>
                  <p>
                    <span class="bullet"></span> CRM
                  </p>
                  <p>
                    <span class="bullet"></span> All
                  </p>
                </div>
              </div>
            </div>
            <span className="side-bar-head" style={{ opacity: "0.6" }}>
              APPS & PAGES
            </span>
            <div>
              <button className="sidebar-buttons" onClick={closeSidebar}>
                <div style={{ marginLeft: "33px" }}>
                  <span style={{ marginRight: "8px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="29"
                      height="16"
                      fill="currentColor"
                      class="bi bi-envelope"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                    </svg>
                  </span>{" "}
                  Email
                </div>
              </button>
            </div>
            <div>
              <button className="sidebar-buttons" onClick={closeSidebar}>
                <div style={{ marginLeft: "33px" }}>
                  <span style={{ marginRight: "8px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="29"
                      height="16"
                      fill="currentColor"
                      class="bi bi-chat"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.332a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                    </svg>
                  </span>
                  Chat
                </div>
              </button>
            </div>
            <div>
              <button
                className="sidebar-buttons"
                href="#"
                onClick={closeSidebar}
              >
                <div style={{ marginLeft: "33px" }}>
                  <span style={{ marginRight: "8px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="29"
                      height="16"
                      fill="currentColor"
                      class="bi bi-calendar"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                    </svg>
                  </span>
                  Calendar
                </div>
              </button>
            </div>
            <div>
              <button className="sidebar-buttons" onClick={closeSidebar}>
                <div style={{ marginLeft: "33px" }}>
                  <span style={{ marginRight: "8px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="29"
                      height="16"
                      fill="currentColor"
                      class="bi bi-receipt"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .337-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z" />
                      <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
                    </svg>
                  </span>
                  Invoice
                </div>
              </button>
            </div>
            <div>
              <button className="sidebar-buttons" onClick={closeSidebar}>
                <div style={{ marginLeft: "33px" }}>
                  <span style={{ marginRight: "8px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="29"
                      height="16"
                      fill="currentColor"
                      class="bi bi-person"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                    </svg>
                  </span>
                  User
                </div>
              </button>
            </div>
            <div>
              <button className="sidebar-buttons" onClick={closeSidebar}>
                <div style={{ marginLeft: "33px" }}>
                  <span style={{ marginRight: "8px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="29"
                      height="16"
                      fill="currentColor"
                      class="bi bi-gear"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                      <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                    </svg>
                  </span>
                  Roles & Permissions
                </div>
              </button>
            </div>
            <div>
              <button className="sidebar-buttons" onClick={closeSidebar}>
                <div style={{ marginLeft: "33px" }}>
                  <span style={{ marginRight: "8px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="29"
                      height="16"
                      fill="currentColor"
                      class="bi bi-file-earmark"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                    </svg>
                  </span>
                  Pages
                </div>
              </button>
            </div>
            <div>
              <button className="sidebar-buttons" onClick={closeSidebar}>
                <div style={{ marginLeft: "33px" }}>
                  <span style={{ marginRight: "8px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="29"
                      height="16"
                      fill="currentColor"
                      class="bi bi-file-lock"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 5a1 1 0 0 1 1 1v1H7V6a1 1 0 0 1 1-1zm2 2.076V6a2 2 0 1 0-4 0v1.076c-.54.166-1 .597-1 1.224v2.4c0 .816.781 1.3 1.5 1.3h3c.719 0 1.5-.484 1.5-1.3V8.3c0-.627-.46-1.058-1-1.224zM6.105 8.125A.637.637 0 0 1 6.5 8h3a.64.64 0 0 1 .395.125c.085.068.105.133.105.175v2.4c0 .042-.02.107-.105.175A.637.637 0 0 1 9.5 11h-3a.637.637 0 0 1-.395-.125C6.02 10.807 6 10.742 6 10.7V8.3c0-.042.02-.107.105-.175z" />
                      <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                    </svg>
                  </span>
                  Authentication
                </div>
              </button>
            </div>
            <div>
              <button className="sidebar-buttons" onClick={closeSidebar}>
                <div style={{ marginLeft: "33px" }}>
                  <span style={{ marginRight: "8px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="29"
                      height="16"
                      fill="currentColor"
                      class="bi bi-box-seam"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                    </svg>
                  </span>
                  Dialogue Examples
                </div>
              </button>
            </div>
            <span className="side-bar-head">UI ELEMENTS</span>
            <div>
              <button className="sidebar-buttons" onClick={closeSidebar}>
                <div style={{ marginLeft: "33px" }}>
                  <span style={{ marginRight: "8px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="29"
                      height="16"
                      fill="currentColor"
                      class="bi bi-fonts"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z" />
                    </svg>
                  </span>
                  Typography
                </div>
              </button>
            </div>
            <div>
              <button className="sidebar-buttons" onClick={closeSidebar}>
                <div style={{ marginLeft: "33px" }}>
                  <span style={{ marginRight: "8px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="29"
                      height="16"
                      fill="currentColor"
                      class="bi bi-bullseye"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10zm0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                      <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                      <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    </svg>
                  </span>
                  Icons
                </div>
              </button>
            </div>
            <div>
              <button className="sidebar-buttons" onClick={closeSidebar}>
                <div style={{ marginLeft: "33px" }}>
                  <span style={{ marginRight: "8px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="29"
                      height="16"
                      fill="currentColor"
                      class="bi bi-wallet2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.133.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.133.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
                    </svg>
                  </span>
                  Cards
                </div>
              </button>
            </div>
            <div>
              <button className="sidebar-buttons" onClick={closeSidebar}>
                <div style={{ marginLeft: "33px" }}>
                  <span style={{ marginRight: "8px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="16"
                      fill="currentColor"
                      class="bi bi-sliders"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"
                      />
                    </svg>
                  </span>
                  Components
                </div>
              </button>
            </div>
            <span className="side-bar-head">FORMS & TABLES</span>
            <div>
              <button className="sidebar-buttons" onClick={closeSidebar}>
                <div style={{ marginLeft: "33px" }}>
                  <span style={{ marginRight: "8px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="29"
                      height="16"
                      fill="currentColor"
                      class="bi bi-code-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                      <path d="M6.854 4.646a.5.5 0 0 1 0 .708L4.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0zm2.292 0a.5.5 0 0 0 0 .708L11.793 8l-2.647 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708 0z" />
                    </svg>
                  </span>
                  Form Elements
                </div>
              </button>
            </div>
            <div>
              <button className="sidebar-buttons" onClick={closeSidebar}>
                <div style={{ marginLeft: "33px" }}>
                  <span style={{ marginRight: "8px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="29"
                      height="16"
                      fill="currentColor"
                      class="bi bi-grid"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                    </svg>
                  </span>
                  Form Layouts
                </div>
              </button>
            </div>
            <div>
              <button className="sidebar-buttons" onClick={closeSidebar}>
                <div style={{ marginLeft: "33px" }}>
                  <span style={{ marginRight: "8px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="29"
                      height="16"
                      fill="currentColor"
                      class="bi bi-check2-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                      <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                    </svg>
                  </span>
                  Form Validation
                </div>
              </button>
            </div>
            <div>
              <button className="sidebar-buttons" onClick={closeSidebar}>
                <div style={{ marginLeft: "33px" }}>
                  <span style={{ marginRight: "8px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="29"
                      height="16"
                      fill="currentColor"
                      class="bi bi-table"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" />
                    </svg>
                  </span>
                  Tables
                </div>
              </button>
            </div>
            <span className="side-bar-head">CHARTS</span>
            <div>
              <button className="sidebar-buttons" onClick={closeSidebar}>
                <div style={{ marginLeft: "33px" }}>
                  <span style={{ marginRight: "8px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="29"
                      height="16"
                      fill="currentColor"
                      class="bi bi-bar-chart-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z" />
                    </svg>
                  </span>
                  Charts
                </div>
              </button>
            </div>
          </div>
          {/* <div className="myName">
            <h6>Shivam Rathor</h6>
          </div> */}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
