import React, { Component } from 'react';
import { Navbar, NavbarBrand, Jumbotron,Nav,NavbarToggler,
    Collapse,NavItem,Modal,ModalBody, ModalHeader,Button,FormGroup,Row,Col,Input,Label,Card ,CardImg} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import {useHistory} from 'react-router-dom';


import {LocalForm ,Control,Errors,actions} from 'react-redux-form';
import UserPanel from './UserPanelComponent';
//form validation
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

function  Logout(props){

    if(props.isloggedin) 
    {   
        return(
            <>
            <Button color="success">
            <span className="fa fa-user fa-lg" ></span>
            Welcome {props.username} !
            </Button>
            
            <Button color="primary" onClick={()=>{props.setidentity('','','','',''); props.toggleLogout()  }}>
            Logout
            </Button>
            </>
        );
    }else{
        return(
            <div></div>
        );
    }
  
    
  
    }
    function  Login(props){
        // alert(props.isloggedin);
        //islogged is false than only login option
            if(!props.isloggedin)
            {
                return(
                <>  
                

                <Button onClick={props.toggleModal} color="warning">
                <span className="fa fa-user fa-lg"></span>Login
                 </Button>
                

                 <Button onClick={props.toggleSignup} color="success" >
                 <span className="fa fa-sign-in fa-lg"></span>Signup
                 </Button>
               
                   
                   </>
        
                );
            }else{
                return(
                    <div></div>
                );
            }
          
            
          

            }

        

          

class Header extends Component {

    constructor(props){
        super(props);
    
        this.state={
       isNavOpen:false,
       isModalOpen:false,
       isSignupOpen:false,
       isIncorrect:false,
       isCorrect:false,
       isLoggedOut:false,
       username:'',
       password:''
        };
        this.toggleNav=this.toggleNav.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
        this.toggleSignup=this.toggleSignup.bind(this);
        this.handleSignup=this.handleSignup.bind(this);
        this.toggleIncorrect=this.toggleIncorrect.bind(this);
        this.toggleCorrect=this.toggleCorrect.bind(this);
        this.toggleLogout=this.toggleLogout.bind(this);
        
    }

    toggleNav()
  {
    this.setState({isNavOpen:!this.state.isNavOpen});
  }

  toggleModal()
  {
    this.setState({isModalOpen:!this.state.isModalOpen});
  }

  toggleSignup()
  {
    this.setState({isSignupOpen:!this.state.isSignupOpen});
  }
  toggleIncorrect()
  {
    this.setState({isIncorrect:!this.state.isIncorrect});
  }
  toggleCorrect()
  {
    this.setState({isCorrect:!this.state.isCorrect});
  }
  toggleLogout()
  {
      this.setState({isLoggedOut:!this.state.isLoggedOut});
  }



  

  handleLogin(values){
    const setidentity=this.props.setidentity;
    const toggleIncorrect=this.toggleIncorrect;
    const toggleCorrect=this.toggleCorrect;
   
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
     async function log (username,password,setidentity,toggleIncorrect,toggleCorrect,date,time)
    {
      let response = await fetch(`http://localhost:4001/logins`,{
        method:'POST',
        mode:'cors',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          username:username,
          password:password,
        })
      });

      
      let data = await response.json();
      if(data.success=='true')
      {
          var prevdate=data.previouslogindate;
          var prevtime=data.previouslogintime;
          var role=data.role;
          
       setidentity(username,password,prevdate,prevtime,role);

       toggleCorrect();

       fetch(`http://localhost:4001/updatelogins`,{
        method:'POST',
        mode:'cors',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
         date:date,
         time:time,
         username:username
        })

      });

       
      }
      else{
          setidentity('','','','','');
          toggleIncorrect();
      }


     
    }

    log(values.username,values.password,setidentity,toggleIncorrect,toggleCorrect,date,time);
    
        
    
    
    this.toggleModal();
  }
  handleSignup(values){
    var r = Math.floor(Math.random() * 100) + 1;

    

    this.toggleSignup();
    var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
   
    fetch(`http://localhost:4001/signupcustomer?cid=${r}&cfirstname=${values.cfirstname}&clastname=${values.clastname}&cDob=${values.cDob}&cEmail=${values.cEmail}&username=${values.username}&passwords=${values.password}&role=${values.role}&date=${date}&time=${time}`)
    .catch(err=>console.log("hy"+err));
    
   
  }

  render() {
      
    return(
    <>
      <Navbar dark expand="md">
        <div className="container">

        <NavbarToggler onClick={this.toggleNav}/>

        <NavbarBrand href="/home"> <img
        src={this.props.itemLogo.image}
        width="20"
        height="20"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
        class="rounded-circle"
        
      /> BlueTech </NavbarBrand>

            
      <Collapse isOpen={this.state.isNavOpen} navbar>
      <Nav navbar>
      <NavItem>
          <NavLink className="nav-link" to="/home">
             <span className="fa fa-home fa-lg"></span>
             Home
          </NavLink>
      </NavItem>
      <NavItem>
          <NavLink className="nav-link" to="#">
             <span className="fa fa-info fa-lg"></span>
             Aboutus
          </NavLink>
      </NavItem>
      <NavItem>
          <NavLink className="nav-link" to="#">
             <span className="fa fa-list fa-lg"></span>
              Syllabus
          </NavLink>
      </NavItem>
      <NavItem>
          <NavLink className="nav-link" to="#">
             <span className="fa fa-address-card fa-lg"></span>
             Contactus
          </NavLink>
      </NavItem>
 
   </Nav>
   <Nav className="ml-auto" navbar>
        <NavItem>
        
          <Login isloggedin={this.props.isloggedin} toggleModal={this.toggleModal} toggleSignup={this.toggleSignup}/>
          <Logout isloggedin={this.props.isloggedin} toggleLogout={this.toggleLogout}  setidentity={this.props.setidentity} username={this.props.username} />

         </NavItem>
   </Nav>
   
   
</Collapse>
      
        </div>
      </Navbar>


      <Jumbotron style={{background:"rgb(24, 160, 223)"}}>
           <div className="container">
               <div className="row row-header">
                   <div className="col-6 align-items-center">
                       <h3 >Welcome to BlueTech</h3>
                   </div>
                   <div className="col-6 ">
                    <div className="col offset-md-9">
                    <img
                    src={this.props.itemLogo.image}
                    width="100"
                    height="100"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                    class="rounded-circle"
                    
                  />
                   </div>
                   </div>
               </div>
           </div>
       </Jumbotron>

       <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader>LogIn</ModalHeader>
                <ModalBody>
                

                        <LocalForm onSubmit={this.handleLogin}>
                        <Row className="form-group">
                        <Label htmlFor="username" md={2}>UserName</Label>
                        <Col md={10}>
                            <Control.text model=".username" id="username" name="username"
                                placeholder="Username"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(5), maxLength: maxLength(20)
                                }}
   
                             />
                             <Errors
                             className="text-danger"
                             model=".username"
                             show="touched"
                             messages={{
                                 required: 'Required* ',
                                 minLength: 'Must be greater than 4 characters ',
                                 maxLength: 'Must be 20 characters or less '
                             }}
                              />
                             </Col>
                            </Row>

                            <Row className="form-group">
                        <Label htmlFor="password" md={2}>Password</Label>
                        <Col md={10}>
                            <Control type="password" model=".password" id="password" name="password"
                                placeholder="Password"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(5), maxLength: maxLength(20)
                                }}
   
                             />
                             <Errors
                             className="text-danger"
                             model=".password"
                             show="touched"
                             messages={{
                                 required: 'Required* ',
                                 minLength: 'Must be greater than 4 characters ',
                                 maxLength: 'Must be 20 characters or less '
                             }}
                              />
                             </Col>
                            </Row>
                            <Row className="form-group">
                            <Col md={{size: 10, offset: 2}}>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                          
                            
                            </Col>
                            </Row>
                        </LocalForm>
                        

                </ModalBody>
             
             </Modal>


             <Modal isOpen={this.state.isSignupOpen} toggle={this.toggleSignup}>
             <ModalHeader>Hello New User!</ModalHeader>
             <ModalBody>
             

                     <LocalForm onSubmit={this.handleSignup}>
                     <Row className="form-group">
                     <Label htmlFor="cfirstname" md={2}>First Name</Label>
                     <Col md={10}>
                         <Control.text model=".cfirstname" id="cfirstname" name="cfirstname"
                             placeholder="First Name"
                             className="form-control"
                             validators={{
                                 required, minLength: minLength(3), maxLength: maxLength(20)
                             }}

                          />
                          <Errors
                          className="text-danger"
                          model=".cfirstname"
                          show="touched"
                          messages={{
                              required: 'Required* ',
                              minLength: 'Must be greater than 2 characters ',
                              maxLength: 'Must be 20 characters or less '
                          }}
                           />
                          </Col>
                         </Row>

                         <Row className="form-group">
                         <Label htmlFor="clastname" md={2}>Last Name</Label>
                         <Col md={10}>
                             <Control.text model=".clastname" id="clastname" name="clastname"
                                 placeholder="Last Name"
                                 className="form-control"
                                 validators={{
                                     required, minLength: minLength(3), maxLength: maxLength(20)
                                 }}
    
                              />
                              <Errors
                              className="text-danger"
                              model=".clastname"
                              show="touched"
                              messages={{
                                  required: 'Required* ',
                                  minLength: 'Must be greater than 2 characters ',
                                  maxLength: 'Must be 20 characters or less '
                              }}
                               />
                              </Col>
                             </Row>

                             <Row className="form-group">
                             <Label htmlFor="cDob" md={2}>Dob</Label>
                             <Col md={10}>
                                 <Control type="date" model=".cDob" id="cDob" name="cDob"
                                     placeholder="2020-06-27"
                                     className="form-control"
                                     validators={{
                                         required
                                     }}
                                     
                                 />
                                 <Errors
                                             className="text-danger"
                                             model=".cDob"
                                             show="touched"
                                             messages={{
                                                 required: 'Required* ',
                                             }}
                                          />
     
                             </Col>
                         </Row>

                             <Row className="form-group">
                             <Label htmlFor="cEmail" md={2}>Email</Label>
                             <Col md={10}>
                                 <Control.text model=".cEmail" id="cEmail" name="cEmail"
                                     placeholder="Email"
                                     className="form-control"
                                     validators={{
                                         required, validEmail
                                     }}
                                     
                                 />
                                 <Errors
                                             className="text-danger"
                                             model=".cEmail"
                                             show="touched"
                                             messages={{
                                                 required: 'Required* ',
                                                 validEmail: 'Invalid Email Address'
                                             }}
                                          />
     
                             </Col>
                         </Row>

                         <Row className="form-group">
                         <Label htmlFor="username" md={2}>UserName</Label>
                         <Col md={10}>
                             <Control.text model=".username" id="username" name="username"
                                 placeholder="Username"
                                 className="form-control"
                                 validators={{
                                     required, minLength: minLength(5), maxLength: maxLength(20)
                                 }}
    
                              />
                              <Errors
                              className="text-danger"
                              model=".username"
                              show="touched"
                              messages={{
                                  required: 'Required* ',
                                  minLength: 'Must be greater than 4 characters ',
                                  maxLength: 'Must be 20 characters or less '
                              }}
                               />
                              </Col>
                             </Row>

                             <Row className="form-group">
                         <Label htmlFor="password" md={2}>Password</Label>
                         <Col md={10}>
                             <Control type="password" model=".password" id="password" name="password"
                                 placeholder="Password"
                                 className="form-control"
                                 validators={{
                                     required, minLength: minLength(5), maxLength: maxLength(20)
                                 }}
    
                              />
                              <Errors
                              className="text-danger"
                              model=".password"
                              show="touched"
                              messages={{
                                  required: 'Required* ',
                                  minLength: 'Must be greater than 4 characters ',
                                  maxLength: 'Must be 20 characters or less '
                              }}
                               />
                              </Col>
                             </Row>

                             <Row className="form-group">
                             <Label htmlFor="role" md={2}>Role</Label>
                             <Col md={10}>
                                 <Control.select model=".role" id="role" name="role"
                                  
                                     className="form-control"
                                     validators={{
                                         required
                                     }}
        
                                  >
                                  <option>User</option>
                                <option>Admin</option>
                                  </Control.select>
                                  <Errors
                                  className="text-danger"
                                  model=".role"
                                  show="touched"
                                  messages={{
                                      required: 'Required* ',
                                    
                                  }}
                                   />
                                  </Col>
                                 </Row>

                        <Row className="form-group">
                        <Col md={{size: 10, offset: 2}}>
                         <Button type="submit" value="submit" color="primary">Register</Button>
                         </Col>
                         </Row>
                         
                     </LocalForm>
                     

             </ModalBody>
          
          </Modal>

          <Modal isOpen={this.state.isIncorrect} toggle={this.toggleIncorrect}>
          <ModalHeader>Sorry!</ModalHeader>
          <ModalBody>
          Incorrect Username or Password!
          Please try Again!
          </ModalBody>
          <ModalBody>
           

          </ModalBody>
          </Modal>

          <Modal isOpen={this.state.isCorrect} toggle={this.toggleCorrect}>
          <ModalHeader>Welcome! </ModalHeader>
          <ModalBody>
         
          <Card>
          <CardImg src={this.props.itemLogined.image}
          />
          </Card>
          </ModalBody>
          <ModalBody>
          </ModalBody>
          </Modal>
          
          <Modal isOpen={this.state.isLoggedOut} toggle={this.toggleLogout}>
          <ModalHeader>Thankyou for Choosing us! </ModalHeader>
          <ModalBody>
          
          </ModalBody>
          <Card>
          <CardImg src={this.props.itemLogout.image}/>
          </Card>
          <ModalBody>
          </ModalBody>
          </Modal>

    </>
    );
  }
}

export default Header;