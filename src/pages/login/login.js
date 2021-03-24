import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      empId: "",
    }
    this.changeEmpID = this.changeEmpID.bind(this);
    this.empIdSubmit = this.empIdSubmit.bind(this);
  }
  changeEmpID = e => {
    this.setState({
      empId: e.target.value,
    })
  }
  empIdSubmit = (e) => {
    e.preventDefault();
    let empDet  = {
      empId : this.state.empId,
      upvoted: []
    }
    localStorage.setItem('empdet', JSON.stringify(empDet));
    this.props.history.push('/dashboard');
  }
  render() {
    return (
      <div className="main_wrap container">
        <div className="form_login">
          <h2>Login</h2>
          <form>
            <input type="text" placeholder="Employee ID" onChange={this.changeEmpID} pattern="[0-9]" maxLength="5" value={this.state.empId} /> <br /><br />
            <button onClick={this.empIdSubmit}>Login</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;