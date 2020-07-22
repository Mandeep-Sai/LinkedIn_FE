import React, { Component } from 'react'
import {FaPlus} from 'react-icons/fa'
import {RiPencilLine} from 'react-icons/ri'
import {IconContext} from 'react-icons'
import { Link } from 'react-router-dom'
import {Modal,Form,Button} from 'react-bootstrap'
import axios from 'axios'
import { MdExpandMore } from 'react-icons/md'

class Experiences extends Component {
  state ={
    show : false,
    file :null,
    role :'',
    company:'',
    startDate:'',
  }
  async postExp(){
    let expe ={
      role:this.state.role,
      company:this.state.company,
      startDate:this.state.startDate
    }
    let postPic={
      method: "POST",
      url :`https://striveschool.herokuapp.com/api/profile/${this.props.user}/experiences/${this.props.id}/picture`,
      headers: {Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E")},
        data:this.state.file
      }
      let postExp={
        method: "PUT",
        url :`https://striveschool.herokuapp.com/api/profile/${this.props.user}/experiences/${this.props.id}`,
        headers: {Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E")},
          data:expe
        }
        let pic = await axios(postPic)
        let exp = await axios(postExp)
  }
  render() {
    return (
      <>
       {/* <div id='experiences'> */}
        {/* <div id='header'>
          <p>Experience</p>
          <Link to='/addExperience'><FaPlus/></Link>
        </div> */}
        <div id='content'>
          <div id='experience'>
            <div >
              <img src={this.props.image} alt=""/>
            </div>
            <div>
              <p>{this.props.role}</p>
              <p>{this.props.company}</p>
              <p>{this.props.startDate}</p>
            </div>
          </div>
          {(this.props.user === this.props.currentUser) ? 
        <IconContext.Provider value={{color : "#0073B1",marginTop:'5px'}}>
        <div style={{cursor:'pointer'}}        
        onClick={() => {this.setState({ show: !this.state.show } );}}
        ><RiPencilLine/></div>

                <Modal
                  show={this.state.show}
                  onHide={() => this.setState({ show: false })}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Edit picture</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                    <Form.Control className="mt-2" onChange={(e)=> this.setState({role:e.target.value})} type="text" placeholder={this.props.role} />
                    <Form.Control className="mt-2" onChange={(e)=> this.setState({company:e.target.value})}  type="text" placeholder={this.props.company} />
                    <Form.Control className="mt-2" onChange={(e)=> this.setState({startDate:e.target.value})}  type="date" placeholder={this.props.startDate} />
                      <Form.Group>
                        <Form.File
                          label="Example file input"
                          onChange={
                            (event) => {
                                const formData = new FormData();
                                formData.append("experience", event.target.files[0]);
                                this.setState({file:formData})
                              }}                         
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="primary"
                          onClick={(e) => {
                            this.postExp()
                            this.setState({ show: false })}}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                </Modal>
        </IconContext.Provider>  
       : null }
        </div>
        <hr style={{margin:'0'}}></hr>
     {/* </div> */}
      </>
    )
  }
}

export default Experiences
