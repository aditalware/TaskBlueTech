import React from'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,Breadcrumb,BreadcrumbItem} from 'reactstrap';
    import {Link} from 'react-router-dom';
    import {FadeTransform} from 'react-animation-components';


    function LoginDetail(props){
        if(props.username!='')
        return(
           <>
           <div className="row">
           <div className="col-12 col-md-6">
           Welcome {props.username}
           </div>
           <div>
           Last Loginned on : {props.date} at :{props.time}
           </div>
           </div>
                   
          </>
              
        );
        else
        {
            return(
                <div>
                </div>
            );
        }
    }

function RenderCard({item}){

    return(
        <FadeTransform in
        transformProps={{exitTransform:'scale(0.5) translateY(-50%)'}}>
        <Card>
       
        <CardImg src={item.image} alt={item.name} />
        <CardBody>
        <CardTitle>{item.name}</CardTitle>
        <CardText>{item.description}</CardText>
        </CardBody>
     
           
        </Card>
        </FadeTransform>
        
    );
}

function Home(props){

    const courses=props.item.map((category)=>{

        return(
           <div className="col-12 col-md-3 ">
            <RenderCard item={category}/>
            </div>
   
        );
    });

   

 
        return(
            
            <div className="container">
            <div className="row ">
            <Breadcrumb>
                        <BreadcrumbItem active>Home</BreadcrumbItem>
            </Breadcrumb>
            <LoginDetail
              username={props.username}
              date={props.date}
              time={props.time}
              />
            <div className="col-12 col-md-6 offset-md-3">
              <h1> Courses</h1>
              </div>
              
            </div>
            <div className="row align-items-start">
               {courses}
               
            </div>

        </div>
        
        );

}

export default Home;