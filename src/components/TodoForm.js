import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/TodoForm.scss";

class TodoForm extends Component {
  state = {
    title: this.props.title || "",
    dueDate: this.props.dueDate || "",
    project: this.props.project || ""
  };

  addTodo = () => {
    this.props.addTodo(
      this.state.title.trim(),
      this.state.dueDate,
      this.state.project
    );
    this.clearTitle();
  };

  updateTodo = () => {
    this.props.updateTodo(
      this.state.title.trim(),
      this.state.dueDate,
      this.state.project
    );
  };

  handleSubmit = () => {
    if (this.props.view && this.props.view === "UPDATE") {
      this.updateTodo();
    } else {
      this.addTodo();
    }
  };

  clearTitle = () => this.setState({ title: "" });

  render() {
    const { view, disableEditMode } = this.props;
    return (
      <div className="todo-form-container">
        <div className="todo-form-input">
          <input
            type="text"
            autoFocus
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
          <input
            type="date"
            value={this.state.dueDate}
            onChange={e => this.setState({ dueDate: e.target.value })}
          />
        </div>
        <div className="todo-form-actions">
          <div onClick={this.handleSubmit} className="todo-form-save">
            {(view && view === "UPDATE" && "Save") || "Add Task"}
          </div>
          <div onClick={disableEditMode} className="todo-form-cancel">
            Cancel
          </div>
          <select
            className="todo-form-projects-button"
            value={this.state.project}
            onChange={e => this.setState({ project: e.target.value })}
          >
            <option value="">---</option>
            {this.props.projects.map(p => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

const mapFormState = state => {
  const projects = state.projects.reduce((list, p) => {
    return [...list, p.name, ...p.subProjects.map(s => s.name)];
  }, []);

  return {
    projects
  };
};

export default connect(mapFormState)(TodoForm);
