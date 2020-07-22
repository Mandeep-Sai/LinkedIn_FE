import React from 'react';
import {Container , Row , Col} from 'react-bootstrap';
import MyNetworkProfiles from './MyNetworkProfiles';
import '../../styles/MyNetwork.css';
import NavBar from '../NavBar';

class MyNetwork extends React.Component {

    state={
        data :[]
      }
      componentDidMount =async()=>{
        let response = await fetch(`https://striveschool.herokuapp.com/api/profile/`,{
          method :'GET',
          headers : new Headers({
            'Authorization': 'Basic dXNlcjE4OlEyejVWN2hFRlU2SktSckU=',
            'Content-type': "application/json"
          })
        })
        let parsedJson = await response.json()
        this.setState({data : parsedJson})
      }

    render(){
        return(
            <Container className='networkContainer'>
              <Row >
                <NavBar />
                <Col className='col-12 myNetworkUsersCol'>
                  <Row className="row-cols-6">
                        {this.state.data.map(function(data , i){
                            return <MyNetworkProfiles data={data} key={i}/>
                        })}
                  </Row>
                </Col>
              </Row>
            </Container>
        )
    }
}

export default MyNetwork;