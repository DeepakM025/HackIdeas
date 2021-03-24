import React, { Component } from "react";
import { Link } from "react-router-dom";

const sortByUpvotes = (a, b) => {
  if (a.upvotes < b.upvotes) {
    return 1;
  }
  if (a.upvotes > b.upvotes) {
    return -1;
  }
  return 0;
};

const sortByDates = (a, b) => {
  if (a.currentDateTime < b.currentDateTime) {
    return 1;
  }
  if (a.currentDateTime > b.currentDateTime) {
    return -1;
  }
  return 0;
};
let empdet = JSON.parse(localStorage.getItem("empdet"));

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      ideaArr: [],
      sortSelect: false,
      empdet: "",
    };
    this.upvote_click = this.upvote_click.bind(this);
    this.sortSelect = this.sortSelect.bind(this);
  }

  componentDidMount() {
    let arr = [];
    for (var i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).substring(0, 5) === "idea_") {
        let elem = JSON.parse(localStorage.getItem(localStorage.key(i)));
        arr.push(elem);
      }
    }

    this.setState({
      ideaArr: arr,
      empdet: empdet,
    });
  }

  sortSelect(e) {
    let arr = this.state.ideaArr;
    if (e.target.value === "byUpvotes") {
      if (arr.length > 0) {
        arr = arr.sort(sortByUpvotes);
        this.setState({
          ideaArr: arr,
        });
      }
    } else {
      if (arr.length > 0) {
        arr = arr.sort(sortByDates);
        this.setState({
          ideaArr: arr,
        });
      }
    }
  }

  upvote_click(e) {
    const items = this.state.ideaArr;

    if (empdet.upvoted.length) {
      if (empdet.upvoted.indexOf(e.target.dataset.idea) === -1) {
        empdet.upvoted.push(e.target.dataset.idea);
        items[e.target.dataset.id].upvotes =
          this.state.ideaArr[e.target.dataset.id].upvotes + 1;
      } else {
        empdet.upvoted.splice(e.target.dataset.idea);
        items[e.target.dataset.id].upvotes =
          this.state.ideaArr[e.target.dataset.id].upvotes - 1;
      }
    } else {
      empdet.upvoted.push(e.target.dataset.idea);
      items[e.target.dataset.id].upvotes =
        this.state.ideaArr[e.target.dataset.id].upvotes + 1;
    }
    this.setState({
      empdet: empdet,
      ideaArr: items,
    });
    localStorage.setItem("empdet", JSON.stringify(empdet));
    localStorage.setItem(
      e.target.dataset.idea,
      JSON.stringify(this.state.ideaArr[e.target.dataset.id])
    );
  }

  render() {
    return (
      <div className="dashboard__wrap container">
        <div className="row align-items-center m-0">
          <h2>Dashboard</h2>
          <Link to="/compose">Create your HackIdea</Link>
        </div>

        <select onChange={this.sortSelect}>
          <option>--Sort by--</option>
          <option value="byDate">Sort by Date</option>
          <option value="byUpvotes">Sort by Upvotes</option>
        </select>
        <div className="list_ideas">
          {this.state.ideaArr.length ? (
            this.state.ideaArr.map((elem, key) => {
              return (
                <div className="idea_wrap" key={key}>
                  <h4>{elem.title}</h4>
                  <span>
                    {elem.currentDateTime} from employee code "{elem.empid}"
                  </span>
                  <h6>{elem.desc}</h6>
                  <div className="tags__container pt-3">
                    {elem.tagsArr.map((e, key) => {
                      return <span key={key}>#{e}</span>;
                    })}
                  </div>
                  <div className="upvote_wrap row m-0 align-items-center pt-3">
                    <button
                      className={
                        this.state.empdet.upvoted &&
                        this.state.empdet.upvoted.includes(elem.id)
                          ? "upvote_btn active"
                          : "upvote_btn"
                      }
                      onClick={this.upvote_click}
                      data-id={key}
                      data-idea={elem.id}
                    >
                      { 
                      this.state.empdet.upvoted &&
                      this.state.empdet.upvoted.includes(elem.id)
                        ? "UPVOTED"
                        : "UPVOTE"}
                    </button>
                    <p className="ml-auto mb-0">
                      Total upvotes : <b>{this.state.ideaArr[key].upvotes}</b>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <h4>
              Oops, No HackIdea for now <br /> But you can create one <br />{" "}
              <b>Click on Create your HackIdea</b>
            </h4>
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
