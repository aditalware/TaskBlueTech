import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Panel from './PanelComponent';
import {ALLITEMS} from '../data/allitems';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import {ITEMS} from '../data/items';
import {connect} from 'react-redux';
import { COURSES } from '../data/courses';

const mapStateToProps=(state)=>{
    return{
        allitems:state.allitems,
        items:state.items,
        courses:state.courses,
      
    }
}

class Main extends Component{


    constructor(props){
        super(props);

        this.state={
            // allitems:ALLITEMS,
            // courses:COURSES,
            // items:ITEMS,
            username:'',
            password:'',
            prevdate:'',
            prevtime:'',
            role:'',
            isloggedin:false

        };
        this.setidentity=this.setidentity.bind(this);
      
    }

    setidentity(username,password,date,time,role){

        this.setState({username:username});
        this.setState({password:password});
        this.setState({prevdate:date});
        this.setState({prevtime:time});
        this.setState({prevdate:date});
        this.setState({role:role});

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
                item={this.props.courses}
                carouselitems={this.props.items}
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
            itemLogined={this.props.allitems.filter((item)=>item.id===102)[0]}
            itemLogout={this.props.allitems.filter((item)=>item.id===103)[0]}
            itemLogo={this.props.allitems.filter((item)=>item.id===104)[0]}

            username={this.state.username}
            />
             <Panel
             isloggedin={this.state.isloggedin}
             role={this.state.role}
             username={this.state.username}
             date={this.state.prevdate}
             time={this.state.prevtime}
             allcourses={this.props.courses}
             
             />
            <Switch>
            
            <Route exact path="/home" component={Homepage}></Route>
            <Redirect to="/home" />

            </Switch>
            
            <Footer
            itemLogo={this.props.allitems.filter((item)=>item.id===104)[0]}

            />
            </>
            
        );
    }

}

export default withRouter(connect(mapStateToProps)(Main));