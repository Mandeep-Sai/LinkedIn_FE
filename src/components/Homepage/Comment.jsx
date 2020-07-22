import React, { Component } from 'react'
import {Container} from 'react-bootstrap'

export class Comment extends Component {
    constructor(props){
        super(props)
        this.state = {
            userInfo :[]
        }
    }
    componentDidMount = async()=>{
        let response = await fetch(`https://striveschool.herokuapp.com/api/profile/${this.props.info.author}`,{
            method:"GET",
            headers : new Headers({
                'Authorization' :'Basic ' + btoa("user7:3UU5dYFvenRuRP7E"),
            })
        })
        let userInfo = await response.json()
        // console.log(userInfo)
        this.setState({userInfo})
    }
    render() {
        return (
            <Container id='comment' className='mt-2'>
                <div id='commentImage'>
                    <img src={this.state.userInfo.image} alt=""/>
                </div>
                <div>
                    <div id='commentHeader'>
                        <p>{this.state.userInfo.name}</p>
                        <p>{this.state.userInfo.title}</p>
                    </div>
                    <div id='commentBody'>
                        {this.props.info.comment}
                    </div>
                </div>
            </Container>
        )
    }
}

export default Comment
