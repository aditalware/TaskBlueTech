import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import {ALLITEMS} from '../data/allitems';

// import {CLOTHES} from '../data/clothes';

import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { COURSES } from '../data/courses';


class Main extends Component{


    constructor(props){
        super(props);

        this.state={
            // clothes:CLOTHES,
            allitems:ALLITEMS,
            courses:COURSES,
            username:'',
            password:'',
            prevdate:'',
            prevtime:'',
            isloggedin:false

        };
        this.setidentity=this.setidentity.bind(this);
      
    }
     
    setidentity(username,password,date,time){

        this.setState({username:username});
        this.setState({password:password});
        this.setState({prevdate:date});
        this.setState({prevtime:time});

        if(username=='' || password=='')
        {
            this.setState({isloggedin:false});
         
        }
        else{
            this.setState({isloggedin:true});
        }
        
    }
   

   
    render(){

        const Homepage=()=>{
            return(
                <Home 
                item={this.state.courses}
                username={this.state.username}
                date={this.state.prevdate}
                time={this.state.prevtime}
                />
            );
        }


        
        
    
        return(
            <>
            <Header 
            setidentity={this.setidentity}
            isloggedin={this.state.isloggedin}
            itemLogined={this.state.allitems.filter((item)=>item.id===102)[0]}
            itemLogout={this.state.allitems.filter((item)=>item.id===103)[0]}


            />
            <Switch>
            
            <Route path="/home" component={Homepage}></Route>
            <Redirect to="/home"/>
            </Switch>
            
            <Footer/>
            </>
            
        );
    }

}

export default Main;