import React, { Component } from 'react';
import { Media ,MediaProps, Button, Card,CardHeader,CardBody} from 'reactstrap';
    import {Tabs,Tab} from 'react-bootstrap'
    import {Link, Redirect} from 'react-router-dom';
    import {FadeTransform} from 'react-animation-components';


    var imgStyle = {
        maxHeight: 200,
  maxWidth: 200,
  margin:"10px",
  border: "2px solid black"
      };

      function EmptyMessage(props){
        if(props.type=="completed" && props.empty==true)
        {
          return(
            <>
            <div>
            <FadeTransform in
            transformProps={{exitTransform:'scale(0.5) translateY(-50%)'}}>
            <Card color="danger">
            <CardHeader className="text-justify" style={{color:"yellow" }}>
           <h3> You Have Not Completed Any Course!</h3>
            </CardHeader>
            <CardBody className="text-justify" style={{color:"yellow" }}>
            <strong>Please Attempt before Due Date!</strong>
            </CardBody>
            </Card>
            </FadeTransform>
            </div>
            
            <br></br>
            </>
          );
        }
        else if(props.type=="attempted" && props.empty==true)
        {
          return(
            <>
            <div>
            <FadeTransform in
            transformProps={{exitTransform:'scale(0.5) translateY(-50%)'}}>
            <Card color="primary"  >
            <CardHeader className="text-justify" style={{color:"white" }}>
            <h3> No Partially Attempted Remaining Courses!</h3>
            </CardHeader>
            <CardBody className="text-justify" style={{color:"white"}}>
            <strong> Please visit To-do Section !</strong>
            </CardBody>
            </Card>
            </FadeTransform>
            </div>
            <br></br>
            </>
          );

        }
        else if(props.type=="todo" && props.empty==true)
        {
          return(
            <>
            <div>
            <FadeTransform in
            transformProps={{exitTransform:'scale(0.5) translateY(-50%)'}}>
            <Card color="warning">
            <CardHeader className="text-justify" style={{color:"black" }}>
           <h3>You Have No Remaining Courses todo!</h3>
            </CardHeader>
            <CardBody className="text-justify" style={{color:"black" }}>
           <strong>  Attempt Remaining Tests of Attempted section!</strong>
            </CardBody>
            </Card>
            </FadeTransform>
            </div>
            <br></br>
            </>
          );
        }
        else{
          return(<div>
            </div>);
        }
      }
      
   function TotalScore(props){
if(props.display)
{
  return(
    <div>
    Total points earned : {props.totalscore}
    </div>
  );
}
else{
  return(
    <div>
    </div>
  );
}
   }

    function DisplayDetail(props){
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        if(props.display==true && props.completed=="T")
        return(
            <FadeTransform in
            transformProps={{exitTransform:'scale(0.5) translateY(-50%)'}}>
            <div className=" col-12 border border-blue " style={{margin:"15px"}}>
            <Media>
      
            <Media body>
            <Media heading>
               <h3>Well Done!!</h3>
              </Media>
              <Media heading>
              <div style={{color:"red"}}>
              <strong>Grade: A+</strong>
              </div>
             
             </Media>
             
             <div style={{color:"green"}}>
             <strong>Total Points Recieved: 10/10</strong>
              </div>
              <div style={{color:"blue"}}>
             <strong> Completed On: {date}</strong>

              </div>
            </Media>
        
          </Media>
      
            </div>
            
            </FadeTransform>
            );
        else if( props.attempted=="T"){
            return(
                <div>
                Ongoing Course!
                Need to complete Soon!
                <div style={{color:"red"}}>
                <strong> Due Date: {date}</strong>
   
                 </div>
            </div>
            );
        }
            else if(props.todo=="T")
            {
                return(
                    <div>
                    
                    Need to Attempt Soon!
                    <div style={{color:"red"}}>
                    <strong> Due Date: {date}</strong>
       
                     </div>
                </div>


                );
            }
            else{
                return(<div>
                    </div>);
            }
            
           }
    
    
      function Activity(props){
        
          if(props.completed=="T")
          {
              return(
                  
                  <Button onClick={()=>{props.displayresult()}} color="success">
                  
                  Check Grade
                
                  </Button>
                 
                 
               
              );
          }
          else if(props.attempted=="T")
          {
              return(
                <>
                <div className="row">
                <div className="col-12">
                <Button onClick={()=>{props.ShiftToCompleted(props.courseid)}} color="primary">
                Let's Complete
                </Button>
                </div>
                <div  className="col-12" style={{color:"blue"}}>
                Total 10 Tests: (1 Point Each);
                </div>
                </div>
               
               
             
               </>
              );
          }
             else if(props.todo=="T")
        {
    return(
        <Button onClick={()=>{props.ShiftToAttempted(props.courseid)}} color="warning">
        Let's Attempt
        </Button>
    
      );
        }
      else{
          return(
              <div>
              </div>
          );
      }

        }
      
    function Rendercard(props){
        
        return(
            <>
            <FadeTransform in
            transformProps={{exitTransform:'scale(0.5) translateY(-50%)'}}>
            <div className=" col-12 border border-blue " style={{margin:"15px"}}>
          
            <Media>
           
            <Media left >
            <Media object style={imgStyle} src={props.item.image} alt={props.item.image} />
          </Media>
          <Media body>
            <Media heading>
              {props.item.name}
            </Media>
            It covers the common algorithms, algorithmic paradigms, and data structures used to solve these problems. The course emphasizes the relationship between algorithms and programming, and introduces basic performance measures and analysis techniques for these problems.          </Media>
          <Media>
         
      
          
          </Media>


          </Media>
      
            </div>
            <div className="col-12">
            <Media>
            <div className="row">
            <div className="col-12">
            <DisplayDetail
            display={props.display}
            coursename={props.item.name}
            completed={props.completed}
             attempted={props.attempted}
             todo={props.todo}
            />
            </div>
            <div className="col-12">
            <Activity
            completed="F"
            attempted={props.attempted} 
            todo={props.todo}
            displayresult={props.displayresult}
            display={props.display}
            courseid={props.courseid}
            ShiftToCompleted={props.ShiftToCompleted}
            ShiftToAttempted={props.ShiftToAttempted}
 
            />
            </div>
            </div>
            </Media>
            </div>
            
            
            </FadeTransform>
            </>
            
        );

    }
function RenderCourses(props){

 const course= props.allcourses.map((item)=>{
   var i=0;
   while(props.courseids.length>i)
   { 
       if(props.courseids[i]==item.id)
       {   
           return (
            <>   
            <Rendercard 
            item={item} 
            completed={props.completed}
             attempted={props.attempted} 
             todo={props.todo}
            displayresult={props.displayresult}
            display={props.display}
            courseid={item.id}
            ShiftToCompleted={props.ShiftToCompleted}
            ShiftToAttempted={props.ShiftToAttempted}

            />
           
            </>
            );
       }
       i++;
      
   }
  
 
 });

    return(
        <div>
        {course}
        </div>
      
    );
    
}
class UserPanel extends Component{


    constructor(props){
        super(props);
        this.state={
            display:false,
            completedarray:[],
            attemptedarray:[],
            todoarray:[],
            emptycompletedarray:false,
            emptyattemptedarray:false,
            emptytodoarray:false,
            pendingtests:[{courseid:1,pend:3},{courseid:2,pend:3},{courseid:3,pend:3},{courseid:4,pend:3},{courseid:5,pend:3},{courseid:6,pend:3},{courseid:7,pend:3},{courseid:8,pend:3}],
            totalscore:0
        }
        this.displayresult=this.displayresult.bind(this);
      this.Updatecompletedarray=this.Updatecompletedarray.bind(this);
      this.Updateattemptedarray=this.Updateattemptedarray.bind(this);
      this.Updatetodoarray=this.Updatetodoarray.bind(this);
      this.ShiftToCompleted=this.ShiftToCompleted.bind(this);
      this.ShiftToAttempted=this.ShiftToAttempted.bind(this);


    }
    Updatecompletedarray(arr){
      this.setState({completedarray:arr});
      var len=arr.length;
       var points=len*10;
      this.setState({totalscore:points});

      if(arr.length==0)
      {
        this.setState({emptycompletedarray:true});
      }
      else{
        this.setState({emptycompletedarray:false});
      }
     


     }
     Updateattemptedarray(arr){
      this.setState({attemptedarray:arr});

      if(arr.length==0)
      {
        this.setState({emptyattemptedarray:true});
      }
      else{
        this.setState({emptyattemptedarray:false});
      }

     }
     Updatetodoarray(arr){
      this.setState({todoarray:arr});
      
    if(arr.length==0)
    {
      this.setState({emptytodoarray:true});
    }
    else{
      this.setState({emptytodoarray:false});
    }

     }
  
    
 
    ShiftToCompleted(courseid){
      
      var i=0;
      var newpend=0;
      var move=false;
    while(this.state.pendingtests[i])
    {
      if(this.state.pendingtests[i].courseid==courseid)
      {
        if(this.state.pendingtests[i].pend!=1)
        {
        newpend=this.state.pendingtests[i].pend -1;
        break;
        }
        else{
          move=true;
          break;
        }
      }
      i++;
    }
      if(move==false)
      {
    var newpendingtests=this.state.pendingtests.filter(e=>e.courseid!==courseid);
    newpendingtests=newpendingtests.concat({courseid:courseid,pend:newpend});
    this.setState({pendingtests:newpendingtests});
    alert( newpend+' more tests to complete');
      }
      else if (move==true)
      {

     var arr=this.state.completedarray.concat(courseid);
     this.setState({completedarray:arr});
     var arr1=this.state.attemptedarray.filter(e => e !== courseid);
     this.setState({attemptedarray:arr1});
     if(arr1.length==0)
     {
       this.setState({emptyattemptedarray:true});
     }
     else{
       this.setState({emptyattemptedarray:false});
     }
     if(arr.length==0)
     {
       this.setState({emptycompletedarray:true});
     }
     else{
       this.setState({emptycompletedarray:false});
     }

     var len=arr.length;
     alert(len);
     var points=len*10;
     this.setState({totalscore:points});
      }

     
    }

    ShiftToAttempted(courseid){
      var arr=this.state.attemptedarray.concat(courseid);
      this.setState({attemptedarray:arr});
      var arr1=this.state.todoarray.filter(e => e !== courseid);
      this.setState({todoarray:arr1});

      if(arr1.length==0)
      {
        this.setState({emptytodoarray:true});
      }
      else{
        this.setState({emptytodoarray:false});
      }
      if(arr.length==0)
      {
        this.setState({emptyattemptedarray:true});
      }
      else{
        this.setState({emptyattemptedarray:false});
      }
     }
    displayresult(){
        this.setState({display:!this.state.display});
    }

    componentDidMount(){
      
      async function provoke (username,Updatecompletedarray)
      {
        let response = await fetch(`http://localhost:4001/getcomplete`,{
          method:'POST',
          mode:'cors',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            username:username,
          })
        });
  
        
        let data = await response.json();
        var arr=data.completedarray;
        Updatecompletedarray(arr);
        
        
     
        
 
  
      }
     
     provoke(this.props.username,this.Updatecompletedarray,this.UpdateScore);

     async function revoke (username,Updateattemptedarray)
     {
       let response = await fetch(`http://localhost:4001/getattempted`,{
         method:'POST',
         mode:'cors',
         headers:{
           'Accept':'application/json',
           'Content-Type':'application/json'
         },
         body:JSON.stringify({
           username:username,
         })
       });
 
       
       let data = await response.json();
       var arr=data.attemptedarray;
       Updateattemptedarray(arr);


 
     }
 
    revoke(this.props.username,this.Updateattemptedarray);



    async function tovoke (username,Updatetodoarray)
    { 
      let response = await fetch(`http://localhost:4001/gettodo`,{
        method:'POST',
        mode:'cors',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          username:username,
        })
      });

 
      let data = await response.json();
      var arr=data.todoarray;
      Updatetodoarray(arr);


    }

   tovoke(this.props.username,this.Updatetodoarray);
   
    
    
    }
   



    render(){

      
            
    
       
        return(
            <>
                <div className="row">
                <div className="col-12 ">
                <Card color="success">
                <CardHeader className="text-justify" style={{color:"white" }}>
               <h3> Welcome User {this.props.username}</h3>
                </CardHeader>
                <CardBody className="text-justify" style={{color:"white" }}>
                <strong>Last Loginned on date : {this.props.date} at time :{this.props.time} ! </strong>

                </CardBody>
                </Card>
               
                </div>
                </div>
                <br></br>
               
                <Tabs defaultActiveKey="1" id="uncontrolled-tab-example">
                <Tab eventKey="1" title="Completed Courses">
                <EmptyMessage empty={this.state.emptycompletedarray} type="completed"/>
                <Activity
                completed="T"
                attempted="F"
                todo="F"
                displayresult={this.displayresult}
                display={this.state.display}
                />
                <TotalScore
                display={this.state.display}
                totalscore={this.state.totalscore}
                />
                <RenderCourses
                courseids={this.state.completedarray}
                allcourses={this.props.allcourses}
                completed="T"
                attempted="F"
                todo="F"
                displayresult={this.displayresult}
                display={this.state.display}
                ShiftToCompleted={this.ShiftToCompleted}
                ShiftToAttempted={this.ShiftToAttempted}
                
                />
               
                </Tab>
    
                <Tab eventKey="2" title="Attempted Courses">
                <EmptyMessage empty={this.state.emptyattemptedarray} type="attempted"/>
                <RenderCourses
                courseids={this.state.attemptedarray}
                allcourses={this.props.allcourses}
                completed="F"
                attempted="T"
                todo="F"
                displayresult={this.displayresult}
                display={this.state.display}
                ShiftToCompleted={this.ShiftToCompleted}
                ShiftToAttempted={this.ShiftToAttempted}
                />
            
                </Tab>
    
                <Tab eventKey="3" title="To-Do" >
                <EmptyMessage empty={this.state.emptytodoarray} type="todo"/>
                <RenderCourses
                courseids={this.state.todoarray}
                allcourses={this.props.allcourses}
                completed="F"
                attempted="F"
                todo="T"
                displayresult={this.displayresult}
                display={this.state.display}
                ShiftToCompleted={this.ShiftToCompleted}
                ShiftToAttempted={this.ShiftToAttempted}
                />
               
                </Tab>
               
              </Tabs>
             
            </>
                
               
                        
            
                   
                
            );
    }
       
    }



export default UserPanel;