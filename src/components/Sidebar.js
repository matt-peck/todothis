import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import * as moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {
  faCalendar as todayCal,
  faCalendarAlt
} from "@fortawesome/free-regular-svg-icons";
import ProjectForm from "./ProjectForm";
import "../css/Sidebar.scss";

class Sidebar extends Component {
  state = {
    isOpen: false,
    isProjectFormOpen: false
  };

  toggleProjects = () => {
    this.setState(prev => ({ isOpen: !prev.isOpen }));
  };

  openProjectForm = () => {
    this.setState({ isProjectFormOpen: true });
  };

  render() {
    const { projects, todos, location } = this.props;
    const { isOpen, isProjectFormOpen } = this.state;

    const page = location.pathname;
    const today = moment().format("DD");
    return (
      <div className="sidebar">
        <Link
          className={`nav-link ${page === "/inbox" && "active"}`}
          to="/inbox"
        >
          <FontAwesomeIcon className="nav-link-icon" icon={faInbox} />
          Inbox
          <span className="counter">
            {todos.filter(t => !t.project).length || ""}
          </span>
        </Link>
        <Link
          className={`nav-link ${page === "/today" && "active"}`}
          to="/today"
        >
          <FontAwesomeIcon className="nav-link-icon today" icon={todayCal} />
          <span className="today-text">{today}</span>
          Today
          <span className="counter">
            {todos.filter(t => moment().isSame(t.dueDate, "day")).length || ""}
          </span>
        </Link>
        <Link className={`nav-link ${page === "/week" && "active"}`} to="/week">
          <FontAwesomeIcon className="nav-link-icon" icon={faCalendarAlt} />
          Next 7 Days
          <span className="counter">
            {todos.filter(t =>
              moment(t.dueDate).isBefore(moment().add(7, "days"), "day")
            ).length || ""}
          </span>
        </Link>
        <div onClick={this.toggleProjects} className="nav-link projects">
          <FontAwesomeIcon
            style={{
              transform: isOpen ? "rotate(90deg)" : "rotate(0deg)"
            }}
            className="nav-link-icon projects"
            icon={faAngleRight}
          />
          Projects
          {/* <span className="plus" onClick={this.openProjectForm}>+</span> */}
        </div>
        <div
          style={{
            height: isOpen ? `${projects.length * 40 + 80}px` : "0px"
          }}
          className="project-lists-container"
        >
          {projects.map(p => {
            return (
              <Link
                key={p.name}
                className={`nav-link  projects-list-item ${page ===
                  `/projects/${p.name}` && "active"}`}
                to={`/projects/${p.name}`}
              >
                {/* <FontAwesomeIcon className="nav-link-icon" icon={faAngleRight} /> */}
                {p.name}
                <span className="counter">
                  {todos.filter(t => t.project === p.name).length || ""}
                </span>
              </Link>
            );
          })}
          {(isProjectFormOpen && (
            <ProjectForm
              isOpen={isProjectFormOpen}
              cancel={() => this.setState({ isProjectFormOpen: false })}
            />
          )) || (
            <div
              onClick={() => this.setState({ isProjectFormOpen: true })}
              className="add-todo-button-container"
            >
              <div className="add-todo-button-plus">+</div>
              <div className="add-todo-button-text">Add Project</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapState = state => {
  return {
    projects: state.projects,
    todos: state.todos
  };
};

export default withRouter(connect(mapState)(Sidebar));
