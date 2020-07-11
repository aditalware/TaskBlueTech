import React, { Component } from 'react';
import {Card,CardHeader,CardBody} from 'reactstrap';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';



function RenderRow(props){
  
        return(
            <TableRow>
             <div className="col-12">
             
              <TableCell style={{width:"12%"}} >{props.item.id} </TableCell>
              <TableCell style={{width:"12%"}} >{props.item.firstname} </TableCell>
              <TableCell style={{width:"12%"}}>{props.item.lastname} </TableCell>
              <TableCell style={{width:"12%"}}>{props.item.username} </TableCell>
              <TableCell style={{width:"12%"}}>{props.item.lastlogindate} </TableCell>
              <TableCell style={{width:"12%"}}>{props.item.lastlogintime} </TableCell>
              <TableCell style={{width:"12%"}}>{props.item.email} </TableCell>
              <TableCell style={{width:"12%"}}>{props.item.dob} </TableCell>
              </div>
              
            </TableRow>
        
            
        );
    }
    
function ShowUserDetail(props){

        const entry=props.users.map((item)=>{
           
                return(
                    <RenderRow item={item} />
         
                );
           
           
               });
               return(
                       
                             <>
                             {entry}
                             </>
                              
                               

                       
               )
       
}
class AdminPanel extends Component{


        constructor(props){
                super(props);
                this.state={
                   
                        users:[],
                        rowsPerPage: 5,
                        page: 0,
                        Offset: 0,
                        tempData: []
                }
              
              this.Updateuserdetails=this.Updateuserdetails.bind(this);
              this.handleChangePage=this.handleChangePage.bind(this);
              this.handleChangeRowsPerPage=this.handleChangeRowsPerPage.bind(this);
              this.getData=this.getData.bind(this);
            

            }
            handleChangePage = (event, page) => {
                let { rowsPerPage, page: currentPage } = this.state;
                if (currentPage < page) {
                  return this.setState(
                    prevState => {
                      return {
                        Offset: prevState.Offset + rowsPerPage,
                        page
                      };
                    },
                    () => this.getData()
                  );
                } else {
                  return this.setState(
                    prevState => {
                      return {
                        Offset: prevState.Offset - rowsPerPage,
                        page
                      };
                    },
                    () => this.getData()
                  );
                }
              };

            handleChangeRowsPerPage = event => {
                this.setState({ rowsPerPage: event.target.value });
              };

              

            getData = () => {
                let { Offset, rowsPerPage: Limit } = this.state;
                let tempArr = [];
                
                for (let i = Offset; i < Offset + Limit; i++) {
                        if(this.state.users[i])
                        {
                                
                  tempArr.push(this.state.users[i]);
                        }
                        else{
                                break;
                        }
                }
            
                return this.setState({ tempData: tempArr });
              };

            Updateuserdetails(arr)
            {
                    var i=0;
                    var  users=[];
                    while(arr[i])
                    {
                            var obj={
                            id:arr[i].cid,
                            firstname:arr[i].cfirstname,
                            lastname:arr[i].clastname,
                            username:arr[i].username,
                            lastlogintime:arr[i].logintime,
                            lastlogindate:arr[i].logindate,
                            email:arr[i].cEmail,
                            dob:arr[i].cDob
                            };
                            users=users.concat(obj);


                            i++;
                    }
                    this.setState({users:users});

            }

            componentDidMount(){
                async function getdetails (Updateuserdetails,getData)
                {
                  let response = await fetch(`http://localhost:4001/getusers`);
            
                  
                  let data = await response.json();
                  var arr=data.userdetails;
                  Updateuserdetails(arr);
                  
                 getData();
                  // alert(this.state.completedarray);
                  
           
            
                }
               
               getdetails(this.Updateuserdetails,this.getData);
               
              
            }
        
    render(){
        
     



        return(
            
                <>
                <div className="row">
                <div className="col-12 ">
                <Card style={{background:"#D627DC"}}>
                <CardHeader className="text-justify" style={{color:"white" }}>
                <h3> Welcome Admin {this.props.username} </h3>
                </CardHeader>
                <CardBody className="text-justify" style={{color:"white" }}>
               <strong> Last Loginned on date : {this.props.date} at time :{this.props.time} !</strong>

                </CardBody>
                </Card>
               
                </div>
                </div>
                <br></br>
                <TableContainer >
              
                <Table>
       
         
         <TableRow >
         <div className="col-12">
            <TableCell style={{width:"12%"}}>ID</TableCell>
            <TableCell style={{width:"12%"}}>First Name</TableCell>
            <TableCell style={{width:"12%"}}>Last Name</TableCell>
            <TableCell style={{width:"12%"}}>Username</TableCell>
            <TableCell style={{width:"12%"}}>Last Login Date</TableCell>
            <TableCell style={{width:"12%"}}>Last Login Time</TableCell>
            <TableCell style={{width:"12%"}}>Email</TableCell>
            <TableCell style={{width:"12%"}}>Date Of Birth</TableCell>
        
         </div>
            
            
         </TableRow>
            
    
         
         
         <ShowUserDetail
         users={this.state.tempData}
         
         />

   </Table>
  
     <TablePagination
     rowsPerPageOptions={[5, 10]}
     component="div"
     count={this.state.users.length}
     rowsPerPage={this.state.rowsPerPage}
     page={this.state.page}
     onChangePage={this.handleChangePage}
     onChangeRowsPerPage={this.handleChangeRowsPerPage}
   />



     

</TableContainer>
               

               </>
                   
            );
    }
        
}



export default AdminPanel;