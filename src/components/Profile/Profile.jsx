import React, { Component } from "react";
import Footer from "../Footer";
import MainJumbotron from "./MainJumbotron";
import SideBar from "./SideBar";
import { Container, Row, Col,Dropdown } from "react-bootstrap";
import NavBar from "../NavBar";
import Experiences from "./Experiences";
import axios from "axios";
import {Link} from 'react-router-dom';
import {FaPlus} from 'react-icons/fa';
import '../../styles/ProfilePage.css';

class Profile extends Component {
  state = {
    username: this.props.match.params.id,
    users :[],
    experiences: [],
    show :false,
    searchKey:'',
    loading : true,
    name :''
  };
  componentDidMount = async() => {
   
    let response = await fetch(
      "https://striveschool.herokuapp.com/api/profile/me",
      {
        method: "GET",
        headers: new Headers({  //btoa('user26:Q2h7j3FtxhdxMdab') Strahinja, btoa("user7:3UU5dYFvenRuRP7E") Detart
          Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"), 
          "Content-type": "application/json",
        }),
      }
    )
    let parsedJson = await response.json()
      this.setState({name : parsedJson.username})
      console.log(parsedJson)
      this.fetchExperience();
  }

  componentDidUpdate = () => {
    if(this.props.match.params.id !== this.state.username){
      console.log('updated');
      this.setState({username: this.props.match.params.id}, async () => {
        await this.fetchExperience()
        console.log(this.state)
      })
    }
  }

  async fetchExperience() {
    let experience = {
      method: "GET",
      url: `https://striveschool.herokuapp.com/api/profile/${this.state.username}/experiences`,
      headers: {
        Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
      },
    };
    let users = {
      method: "GET",
      url: `https://striveschool.herokuapp.com/api/profile/`,
      headers: {
        Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
      },
    };
    let experiences = await axios(experience);
    let usersData = await axios(users)
    this.setState({ experiences: experiences.data, users:usersData.data, loading:false });
    console.log(experiences,usersData.data);
  }
  render() {
    return (
      <>
        <NavBar/>
        {this.state.loading ? 
        <div id='loadingAnimation'><img src="https://i.stack.imgur.com/h6viz.gif" alt=""/></div> : 
        <Container className='mt-5 pt-3'>
          <Row>
            <Col className="col-8">
              <MainJumbotron username={this.props.match.params.id}/>
              <div id='experiences'>
                <div id='header'>
                  <p>Experience</p>
                  <Link to='/addExperience'><FaPlus/></Link>
                </div>
                {this.state.experiences.map((element) => {
                  console.log(element)
                  return (
                    <Experiences
                    user = {this.state.name}
                    id={element._id}
                    currentUser = {element.username}
                    image={element.image} 
                    role={element.role}
                    company={element.company}
                    startDate={element.startDate}
                    />
                    );
                  })}
              </div>
            </Col>
            <SideBar />
          </Row>
          <Footer />
        </Container>
  } 
      </>
    );
  }
}

export default Profile;
