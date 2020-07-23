import React, { Component } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import Posts from "./Posts";
import "../../styles/HomePage.css";
import FetchPosts from "../HOC/FetchPosts";
// import UploadPic from '../UploadPic'

class Feed extends Component {
  state = {
    posts: [],
    username: [],
    loading: true,
  };
  componentDidMount = async () => {
    let user = await fetch(
      // 5f17f09fe0e59837acf4a554
      "https://be-linkedin.herokuapp.com/profile/5f17f09fe0e59837acf4a554",
      {
        method: "GET",
        headers: new Headers({
          Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
          "Content-type": "application/json",
        }),
      }
    );
    let userName = await user.json();
    console.log(this.props.posts);
    this.setState({
      username: userName.username,
      // posts: this.props.posts,
      // loading: false,
    });
  };
  componentDidUpdate() {
    if (this.props.posts.length > 1 && this.state.loading) {
      this.setState({ posts: this.props.posts }, () =>
        this.setState({ loading: false, fetch: this.state.fetch + 1 })
      );
    }
    console.log(this.props.posts);
  }
  handleShow = () => {
    this.setState({ show: true });
  };
  handleClose = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <Container id="feed" fluid>
        <Row>
          <hr></hr>
          {this.state.loading ? (
            <div
              className="col col-12 d-flex justify-content-center"
              id="loadingAnimation"
            >
              <img src="https://i.stack.imgur.com/h6viz.gif" alt="" />
            </div>
          ) : (
            this.state.posts.map((element, i) => {
              return (
                <Posts user={this.state.username} posts={element} key={i} />
              );
            })
          )}
        </Row>
      </Container>
    );
  }
}

export default FetchPosts(Feed);
