import React, { Component } from "react";
import { Container, Modal, Button, Form, Dropdown } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { AiTwotoneLike } from "react-icons/ai";
import { IconContext } from "react-icons";
import { MdComment } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import "../../styles/HomePage.css";
import { Link } from "react-router-dom";
import FetchPosts from "../HOC/FetchPosts";
import axios from "axios";
import Comments from "./Comments";

class Posts extends Component {
  state = {
    show: false,
    showDelete: false,
    showComments: true,
    image:
      "https://static.toiimg.com/thumb/msid-44945488,width-748,height-499,resizemode=4,imgsize-291921/Nice-in-pictures.jpg",
    file: null,
    text: "",
    count: 0,
  };

  async editPost() {
    const postText = {
      method: "PUT",
      url: `http://localhost:3333/posts/${this.props.posts._id}`,
      //url:`https://striveschool.herokuapp.com/api/posts/${this.props.posts._id}`,
      headers: {
        Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
      },
      data: { text: this.state.text },
    };

    const postFile = {
      method: "POST",
      url: `https://striveschool.herokuapp.com/api/posts/${this.props.posts._id}`,
      headers: {
        Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
        user: "user2",
      },
      data: this.state.file,
    };
    let text = await axios(postText);
    let file = await axios(postFile);
  }
  deletePost = async () => {
    let response = await fetch(
      // `https://striveschool.herokuapp.com/api/posts/${this.props.posts._id}`,
      `http://localhost:3333/posts/${this.props.posts._id}`,
      {
        method: "DELETE",
        headers: new Headers({
          Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
        }),
      }
    );
    if (response.ok) {
      alert("Post deleted Sucessfully");
    }
  };
  handleLikes = () => {
    let prevCount = this.state.count;
    this.setState({ count: prevCount + 1 });
  };
  // commentHandler =()=>{
  //   let value = this.state.showComments
  //   this.setState({showComments : !value })
  // }
  render() {
    return (
      <Container className="mt-2 home px-0 forPostsShadow">
        <div className="p-1" id="postHeader">
          <div>
            <img
              src={`data:image/jpeg;base64,${this.props.posts.user.image}`}
              alt=""
            />
            <div>
              <p>
                <Link
                  className="postUsernames"
                  to={"/profile/" + this.props.posts.user.username}
                >
                  {this.props.posts.user.name}
                </Link>
              </p>
              <p style={{ fontSize: "10px", color: "grey" }}>
                {this.props.posts.updatedAt.slice(0, 10)}
              </p>
              <p style={{ fontSize: "10px", color: "grey" }}>
                {this.props.posts.user.bio}
              </p>
            </div>
          </div>
          <div>
            {this.props.user.name !== this.props.posts.user.name ? (
              <>
                <Dropdown>
                  <Dropdown.Toggle className="d-flex">
                    <BsThreeDots style={{ marginLeft: "5px" }} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        this.setState({ show: !this.state.show });
                      }}
                    >
                      Edit Post
                    </Dropdown.Item>

                    <Dropdown.Item
                      onClick={() => {
                        this.setState({ showDelete: !this.state.showDelete });
                      }}
                    >
                      Delete Post
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Modal
                  show={this.state.show}
                  onHide={() => this.setState({ show: false })}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="d-flex mb-2">
                      <img
                        className="img-fluid"
                        src={this.props.posts.user.image}
                        alt=""
                      />
                      <div>
                        <p className="m-0 p-0">
                          <Link to={"/profile/" + this.props.user.username}>
                            {this.props.posts.user.name}
                          </Link>
                        </p>
                        <p
                          className="m-0 p-0"
                          style={{ fontSize: "12px", color: "grey" }}
                        >
                          {this.props.posts.updatedAt.slice(0, 10)}
                        </p>
                      </div>
                    </div>
                    <Form>
                      <Form.Group>
                        <Form.Control
                          as="textarea"
                          rows="4"
                          onChange={(e) =>
                            this.setState({ text: e.target.value })
                          }
                          placeHolder={this.props.posts.text}
                        />
                        <Form.File
                          onChange={(event) => {
                            const formData = new FormData();
                            formData.append("post", event.target.files[0]);
                            this.setState({ file: formData });
                          }}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
                      onClick={() =>
                        this.setState({ show: false }, () => this.editPost())
                      }
                    >
                      Update
                    </Button>
                  </Modal.Footer>
                </Modal>
                {/* Delete Modal */}

                <Modal
                  show={this.state.showDelete}
                  onHide={() => this.setState({ showDelete: false })}
                >
                  <Modal.Body>
                    Are you sure you want to delete the post?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
                      onClick={() =>
                        this.setState({ showDelete: false }, () =>
                          this.deletePost()
                        )
                      }
                    >
                      Confirm
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            ) : null}
          </div>
        </div>
        <div id="postBody">
          <p className="px-3 py-1">{this.props.posts.text}</p>
          {this.props.posts.image === undefined ? null : (
            <img
              className="img-fluid w-100"
              src={this.props.posts.image}
              alt=""
            />
          )}
        </div>
        <div id="postFooter">
          <div style={{ display: "flex", padding: "10px", fontSize: "12px" }}>
            <IconContext.Provider value={{ padding: "10px", color: "#007EC2" }}>
              <p>
                <AiTwotoneLike />
              </p>
            </IconContext.Provider>
            <p style={{ padding: "2px 10px 0 5px" }}>{this.state.count} .</p>
            <p style={{ padding: "2px 0" }}>1 Comment</p>
          </div>
          <hr style={{ padding: "0", margin: "0" }}></hr>
          <div>
            <div
              onClick={this.handleLikes}
              style={{ display: "flex", cursor: "pointer" }}
              className="postsButtons"
            >
              <IconContext.Provider value={{}}>
                <p>
                  <AiTwotoneLike />
                </p>
              </IconContext.Provider>
              <p>Like</p>
            </div>
            <div style={{ display: "flex" }} className="postsButtons">
              <IconContext.Provider value={{}}>
                <p onClick={this.commentHandler}>
                  <MdComment />
                </p>
              </IconContext.Provider>
              <p>Comment</p>
            </div>
            <div style={{ display: "flex" }} className="postsButtons">
              <IconContext.Provider value={{}}>
                <p>
                  <FaShare />
                </p>
              </IconContext.Provider>
              <p>Share</p>
            </div>
          </div>
          {this.state.showComments ? (
            <Comments id={this.props.posts._id} />
          ) : null}
        </div>
      </Container>
    );
  }
}

export default Posts;
