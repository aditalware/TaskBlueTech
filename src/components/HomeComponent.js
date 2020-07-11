import React ,{useState}from'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption} from 'reactstrap';
    import {Link} from 'react-router-dom';
    import {FadeTransform} from 'react-animation-components';
 
  

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
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
  
    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === props.carouselitems.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? props.carouselitems.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    }
  
    const slides = props.carouselitems.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.src}
        >
          <img  src={item.image} alt={item.name} />
          <CarouselCaption captionText={item.description}  />
        </CarouselItem>
      );
    });
   

 
        return(
            
            <div className="container">
            <div className="row ">
         
            <div className="col-12 col-md-6 offset-md-3">
         
            </div>
            <div className="container">
            <div className="row ">
            <div className="col-12 col-md-10 offset-md-2">
            <Carousel
            activeIndex={activeIndex}
             next={next}
             previous={previous}
            >
           <CarouselIndicators items={props.carouselitems} activeIndex={activeIndex} onClickHandler={goToIndex} />
           {slides}
           <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
           <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
          </Carousel>
            </div>
            </div>
            
            </div>
           

           
            <div className="col-12 col-md-6 offset-md-4">
              <h1> All Courses List </h1>
              </div>
              
            </div>

            <div className="row align-items-start">
               {courses}
               
            </div>

        </div>
        
        );

}

export default Home;