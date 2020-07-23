import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HomeProfile from "./HomeProfile";
import Modal from "./Modal";
import NavBar from "../NavBar";
import axios from "axios";
import Feed from "./Feed";
import NewsFeedRightSidebar from "./NewsFeedRightSidebar";
import Leftsidebar from "./LeftSidebar";
import "../../styles/HomePage.css";
import { FiEdit, FiVideo } from "react-icons/fi";
import { GrCamera } from "react-icons/gr";
import { IconContext } from "react-icons";
import { AiOutlineFileText } from "react-icons/ai";
export default class Homepage extends Component {
  state = {
    showModal: false,
    user: [],
    posts: [],
    postsText: "",
    inputFile: null,
  };
  componentDidMount() {
    this.fetchData();
  }

  async postData() {
    let data1 = { text: this.state.postsText };
    let postData = {
      method: "POST",
      //url: `https://striveschool.herokuapp.com/api/posts/`,
      url: `https://be-linkedin.herokuapp.com/posts`,
      headers: {
        Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
        user: "user1",
      },
      data: data1,
    };
    let data = await axios(postData);
    let inputFile = {
      method: "POST",
      url: await `https://be-linkedin.herokuapp.com/posts/${data.data}`,
      headers: {
        Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
        // "Access-Control-Allow-Origin": "hhttps://be-linkedin.herokuapp.com",
        // "Content-Type": "formdata",
      },
      data: { image: this.state.inputFile },
    };
    let input = await axios(inputFile);

    alert("Post has been posted");
  }

  async fetchData() {
    console.log(this.props.match.params.id);
    /*
    let user = {
      method: "GET",
      url: `https://striveschool.herokuapp.com/api/profile/${this.props.match.params.id}`,
      headers: {
        Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
      },
    };
    */
    let posts = {
      method: "GET",
      // url: `https://striveschool.herokuapp.com/api/posts`,
      url: `https://be-linkedin.herokuapp.com/posts`,
      headers: {
        Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
      },
    };
    //let User = await axios(user);
    let Posts = await axios(posts);
    this.setState({ posts: Posts.data }, () =>
      console.log(this.state.posts.reverse())
    );
  }

  render() {
    return (
      <>
        <NavBar />
        <Container className="mt-5 mb-2 pt-3">
          <Row>
            <Col lg={3}>
              <HomeProfile />
              <Leftsidebar />
            </Col>
            <Col lg={6} style={{ paddingLeft: "0px" }}>
              <Row className="feedShadow">
                <Col id="writePost" className="px-0">
                  <div
                    onClick={() => this.setState({ showModal: true })}
                    className="col col-6 w-100 d-flex align-items-center"
                    style={{ margin: "0px" }}
                  >
                    <a>
                      <FiEdit style={{ fontSize: "1.1rem" }} />
                    </a>
                    <a style={{ fontSize: "1.1em" }}>Start a Post</a>
                  </div>
                  <div id="icons" className="col col-6 px-0">
                    <div className="col col-4 d-flex justify-content-center align-items-center">
                      <GrCamera style={{ fontSize: "1.1rem" }} />
                    </div>

                    <div className="col col-4 d-flex justify-content-center align-items-center">
                      <FiVideo style={{ fontSize: "1.1rem" }} />
                    </div>

                    <div className="col col-4 d-flex justify-content-center align-items-center">
                      <AiOutlineFileText style={{ fontSize: "1.1rem" }} />
                    </div>
                  </div>
                </Col>
                <div id="writePostFooter">
                  <p>
                    <a href="">Write an article</a> on LinkedIn
                  </p>
                </div>
              </Row>
              <Feed
                postButton={() => {
                  this.setState({ showModal: true });
                }}
              />
              <Modal
                onchange={(e) =>
                  this.setState(
                    { postsText: e.target.value },
                    console.log(this.state.postsText)
                  )
                }
                name={this.state.user.name}
                handleClose={() => {
                  this.setState({ showModal: false });
                  this.postData();
                }}
                show={this.state.showModal}
                file={(event) => {
                  console.log(event.target.files[0]);
                  const formData = new FormData();
                  formData.append("post", event.target.files[0]);
                  this.setState({ inputFile: formData });
                }}
              />
            </Col>
            <Col lg={3} style={{ paddingLeft: "0px" }}>
              <NewsFeedRightSidebar />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
