import React, { Component } from 'react';
import Select from 'react-select';
import './App.css';
import { loadDept, loadEmp } from './Actions/selectAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class App extends Component {
  URL_CHUNK = "https://reqres.in/api/users";
  selectedDeptValue;
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    }
    this.handleChange = this.handleChange.bind();
  }
  handleChange = (selectedOption) => {
    this.props.dispatch(loadEmp(selectedOption.value));
  }
  handleSelect = (selectedDept) => {
    this.selectedDeptValue = selectedDept.value;
  }

  handleClear = () => {
    this.setState({
      empId: null,
      empFirstName: null,
      empLastName: null,
      empImg: null,

    });
  }
  handleClick() {
    let id = this.selectedDeptValue;
    let retrieveURL = `${this.URL_CHUNK}/${id}`;
    fetch(retrieveURL)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            empId: result.data.id,
            empFirstName: result.data.first_name,
            empLastName: result.data.last_name,
            empImg: result.data.avatar,

          });
        })
  }
  componentDidMount() {
    this.props.dispatch(loadDept());
  }
  render() {
    return (
      <div className="App">
        <div>
          <label className="department-name">Departments</label>

          <Select className="select-option-department"
            value={this.props.dept.value}
            onChange={this.handleChange}
            options={this.props.dept}
          />

          <label className="employee-id">EmployeeId:</label>
          <Select className="select-option-employeeId"
            value={this.props.emp.value}
            onChange={this.handleSelect}
            options={this.props.emp}
          />
        </div>
        <div>
          <button className="get-details-button" onClick={this.handleClick.bind(this)}>
            Get Details
          </button>
          <button className="clear-button" onClick={this.handleClear.bind(this)}>
            clear
          </button>
        </div>
        <div className="details">
          <img src={this.state.empImg} className="emp-image" />
          <div className="id-name">
            <label className="empId">ID: {this.state.empId}</label>
            <label className="empNme">Name: {this.state.empFirstName} {this.state.empLastName}</label>
          </div>
        </div>

      </div>
    );
  }
}
App.propTypes = {
  loadDept: PropTypes.func,
  dispatch: PropTypes.func,
  emp: PropTypes.array,
  dept: PropTypes.array,
}
function mapStateToProps(state) {
  return {
    emp: state.selectReducer.emp,
    dept: state.selectReducer.dept
  }
}
const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
});
export default connect(mapStateToProps, mapDispatchToProps)(
  App
);