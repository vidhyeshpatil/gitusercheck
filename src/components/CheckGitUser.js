import React, {Component, Suspense } from "react";
import GitUserDetails from "./GitUserDetails";

export default class CheckGitUser extends Component {

  state = {
    name: "",
    timer: 0,
    userObj: undefined
  }

  clearTimer = () => {

    // clears the timer on key down
    clearTimeout(this.state.timer);
  }

  checkUser = e => {
    this.setState({
      name: e.target.value,
      timer: setTimeout(this.findUser, 2000)
    });
  }

  findUser = () => {
    let { name } = this.state; 
    // first checks user in localstorage - if not (Call API to fetch details), if yes (Fetch details from localstorage)
    if (localStorage.getItem(name) === null) {
      
      // API call to fetch current user details 
      this.handleAPICall(name);
    } else {

      // fetch data from localstorage
      this.updateUserObj(name);
    }
  }

  handleAPICall = name => {
    const url = `https://api.github.com/users/${name}`;

    fetch(url)
      .then(res => res.json())
      .then(response => {
        // setting data to localstorage
        this.setDataToLocalStorage(name, response);

        // update user data obj
        this.updateUserObj(name);
      })
      .catch(error => alert("Please Enter valid user"));
  }

  updateUserObj = key => {
    this.setState({
      userObj: this.getDataFromLocalStorage(key)
    });
  }

  setDataToLocalStorage = (name, response) => {
    localStorage.setItem(name, JSON.stringify(response));
  }

  getDataFromLocalStorage = key => {
    return JSON.parse(localStorage.getItem(key));
  }

  render() {
    let { userObj } = this.state;
    return (
      <div className = "wrapper">
        <h1> GitHub User Details</h1>
        <div className = "input-parent">
          <label>Name: </label>
          <input className = "input-text" type = "text" placeholder = "Enter valid GitHub user name" onKeyDown = {this.clearTimer} onChange = {this.checkUser} />
        </div>
        {(userObj) ? 
          <Suspense fallback = {<div>Loading.....</div>}>
            <GitUserDetails user = {userObj} /> 
          </Suspense> 
        : ""}
      </div>
    )
  }
}
