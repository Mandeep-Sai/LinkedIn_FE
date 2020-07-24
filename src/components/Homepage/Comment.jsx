import React, { Component } from "react";
import { Container } from "react-bootstrap";

export class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
    };
  }
  bufferToBase64(buf) {
    var binstr = Array.prototype.map
      .call(buf, function (ch) {
        return String.fromCharCode(ch);
      })
      .join("");
    return btoa(binstr);
  }
  componentDidMount = async () => {
    let response = await fetch(
      `https://be-linkedin.herokuapp.com/profile/${this.props.info.username}`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
        }),
      }
    );
    let parsedJson = await response.json();
    let userInfo = parsedJson[0];
    const base64 = this.bufferToBase64(userInfo.image.data);
    userInfo.image = base64;
    // console.log(userInfo)
    this.setState({ userInfo });
  };
  render() {
    return (
      <Container id="comment" className="mt-2">
        <div id="commentImage">
          <img
            src={`data:image/jpeg;base64,${this.state.userInfo.image}`}
            alt=""
          />
        </div>
        <div>
          <div id="commentHeader">
            <p>{this.state.userInfo.name}</p>
            <p>{this.state.userInfo.bio}</p>
          </div>
          <div id="commentBody">{this.props.info.comment}</div>
        </div>
      </Container>
    );
  }
}

export default Comment;
