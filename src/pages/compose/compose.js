import React, { Component } from "react";

class Compose extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      title: "",
      desc: "",
      tagsSelected: "",
      currentDateTime: new Date().toLocaleString(),
      empid: "",
      upvoted: false,
      upvotes: 0,
      tagsArr: [],
      predefinedTags: ["tech", "feature"],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addTag = this.addTag.bind(this);
    this.addPredefinedTag = this.addPredefinedTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
  }
  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
      empid: JSON.parse(localStorage.getItem("empdet")).empId,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    const localLength = localStorage.length;
    this.setState({
      id: "idea_" + localLength,
    });
    setTimeout(() => {
      localStorage.setItem("idea_" + localLength, JSON.stringify(this.state));
      this.setState({
        title: "",
        desc: "",
        tagsArr: [],
        tagsSelected: "",
      });
    }, 100);
  };
  addTag() {
    if (this.state.tagsSelected) {
      let arr = this.state.tagsArr;
      let preArr = this.state.predefinedTags;
      if (arr.indexOf(this.state.tagsSelected) === -1) {
        arr.push(this.state.tagsSelected);
      }
      if (preArr.indexOf(this.state.tagsSelected) !== -1) {
        let index = preArr.indexOf(this.state.tagsSelected);
        preArr.splice(index, 1);
      }
      this.setState({
        tagsArr: arr,
        tagsSelected: "",
      });
    }
  }
  addPredefinedTag(e) {
    let arr = this.state.tagsArr;
    let preArr = this.state.predefinedTags;
    if (arr.indexOf(e.target.textContent) === -1) {
      arr.push(e.target.textContent);
    }
    if (preArr.indexOf(e.target.textContent) !== -1) {
      let index = preArr.indexOf(e.target.textContent);
      preArr.splice(index, 1);
    }
    this.setState({
      tagsArr: arr,
      tagsSelected: "",
    });
  }
  removeTag(e) {
    let arr = this.state.tagsArr;
    if (arr.indexOf(e.target.textContent) !== -1) {
      let index = arr.indexOf(e.target.textContent);
      arr.splice(index, 1);
    }
    this.setState({
      tagsArr: arr,
    });
  }
  render() {
    return (
      <div className="main_wrap container">
        <div className="compose_form">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Enter Title"
              name="title"
              onChange={this.handleChange}
              value={this.state.title}
              required
            />{" "}
            <br />
            <br />
            <div className="tags_wrap">
              <div className="selected_tags">
                {this.state.tagsArr.map((e, key) => {
                  return (
                    <span key={key} onClick={this.removeTag}>
                      {e}
                    </span>
                  );
                })}
              </div>
              <input
                type="text"
                placeholder="Enter Tag"
                name="tagsSelected"
                onChange={this.handleChange}
                value={this.state.tagsSelected}
              />
              <button onClick={this.addTag}>ADD</button>
              <div className="option_tags">
                {this.state.predefinedTags.map((e, key) => {
                  return (
                    <span key={key} onClick={this.addPredefinedTag}>
                      {e}
                    </span>
                  );
                })}
              </div>
            </div>
            <br /> <br />
            <textarea
              name="desc"
              placeholder="Enter Description in Detail"
              rows="6"
              onChange={this.handleChange}
              value={this.state.desc}
              required
            ></textarea>{" "}
            <br /> <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Compose;
