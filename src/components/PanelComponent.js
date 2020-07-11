import React, { Component } from 'react';
import UserPanel from './UserPanelComponent';
import AdminPanel from './AdminPanelComponent';
import { Redirect } from 'react-router-dom';

function Panel(props){
   
//   alert(JSON.stringify(props.usercourses.filter((usercourse)=>usercourse.username=="hello")[0]));
        
    if(props.isloggedin && props.role=="User")
      
        return(
            <div className="container">
           <UserPanel
           username={props.username}
           time={props.time}
           date={props.date}
           allcourses={props.allcourses}
           />
            </div>
            
        );

        if(props.isloggedin && props.role=="Admin")
        return(
            <div className="container">
           <AdminPanel
           username={props.username}
           time={props.time}
           date={props.date}
           />
            </div>
            
        );
        else{
            return( <Redirect to ="/home"/>);
        }
    

}

export default Panel;