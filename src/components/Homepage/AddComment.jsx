import React, { Component } from 'react'
import {Container} from 'react-bootstrap'
import {MdSend} from 'react-icons/md'
import {IconContext} from 'react-icons'
export class AddComment extends Component {
    state = {
        user:[],
        comments :{
        comment :'',
        rate : 5,
        elementId : this.props.postId
        }
    }
    componentDidMount =async()=>{
        let response = await fetch(
            "https://striveschool.herokuapp.com/api/profile/me",
            {
              method: "GET",
              headers: new Headers({
                Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
                "Content-type": "application/json",
              }),
            }
          )
        let user = await response.json()
        this.setState({user})
    }
    updateComment =(e)=>{
        let comments = this.state.comments
        let id = e.currentTarget.id
        comments[id] = e.currentTarget.value
        this.setState({comments})
    }
    sendComment = async()=>{
        let response = await fetch(" https://striveschool.herokuapp.com/api/comments/",{
            method:'POST',
            body: JSON.stringify(this.state.comments),
            headers: new Headers({
                Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
                "Content-type": "application/json",
              })
        })
        if(response.ok){
            alert('comment added')
            this.setState({commentText :''})
        }
    }
    render() {
        return (
            <Container id='comment' className='mt-2'>
                <div id='commentImage'>
                    <img src={this.state.user.image} alt=""/>
                </div>
                <div id='content'>
                <input type="text" id='comment' onChange ={this.updateComment}/>
                <IconContext.Provider value={{className :'sendIcon'}}>
                    <p onClick={this.sendComment}><MdSend/></p>
                </IconContext.Provider>
                </div>
            </Container>
        )
    }
}

export default AddComment
