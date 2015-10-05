import React, {Component, PropTypes} from 'react';
import Swipeable from 'react-swipeable';


export default class Slideshow extends Component {
  static propTypes = {
      data: PropTypes.object,
      topic: PropTypes.string,
      className: PropTypes.string
  }

  //initial state
  constructor(props) { super(props)
    this.state = {
        currentIndex: 0,
        data: props.currentIssue.slideshowsMobile
    }
  }

  _handleKeyDown(e){
    e.preventDefault();

    const LEFT = 37,
          TOP = 38,
          RIGHT = 39,
          DOWN = 40;
          
    const { currentIndex } = this.state;
    if( e.keyCode === RIGHT || e.keyCode === DOWN ) {
        this._setCurrentIndex(currentIndex + 1);
    }
    if( e.keyCode === LEFT || e.keyCode === TOP ) {
        this._setCurrentIndex(currentIndex - 1);
    }
    
  }
  componentDidMount(){
    window.addEventListener('keydown', this._handleKeyDown.bind(this));
    window.addEventListener('resize', this._handleResize.bind(this));
    // if(window.innerWidth >= 500){
    //    this.setState({
    //      data: this.props.currentIssue.slideshows
    //    })
    // }
  }
  _handleResize(e){
    console.log("resize event:"+e);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleKeyDown.bind(this));   
    window.addEventListener('resize', this._handleResize.bind(this));
  }
  _setCurrentIndex(value, event){
   
    var maxIndex =  this.state.data.length - 1;
    if(value > maxIndex){
      value = value % (maxIndex+1);
    }
    if(value < 0){
      value = maxIndex;
    }
    this.setState({
      currentIndex: value
    })

  }
  componentWillReceiveProps(nextProps) {
      const {topic} = this.props;
      const nextTopic = nextProps.topic;
      if(topic !== nextTopic){
        this._setCurrentIndex(0)
      } 
  }

  

  render() {
    const styles = require('./Slideshow.scss');
    const {currentIssue, topic} = this.props;

    let {currentIndex, data} = this.state;
    

    let pageItems =  data.map((value,index)=>{
        let activePageClass = (index===currentIndex) ? styles.activePage : "";
        return (
          <div className={`${styles.page} ${activePageClass}`}
               key={index}
               onClick={this._setCurrentIndex.bind(this, index)}>
          </div>
        )
    });

    let slideImages = data.map((value,index)=>{
      let imageClass = styles.inactiveSlideImg;

      if(index===currentIndex){
         imageClass = styles.activeSlideImg
      }
      let url = require(`./images/${value.filename}`)
      return (
        <img alt={value.alt}
             src={url}
             className={imageClass}
             key={index}/>
      )
    });

    let swipeableSlides = (
      <Swipeable onSwipingLeft={this._setCurrentIndex.bind(this, currentIndex-1)}
                 onSwipedRight={this._setCurrentIndex.bind(this, currentIndex+1)}>
        <div>
          {slideImages}
        </div>
      </Swipeable>
    )



    return (
      <div className={styles.wrap}>
        
          <div className={styles.slideBlock}>
              {swipeableSlides}

              <div className={styles.prev}
                   onClick={this._setCurrentIndex.bind(this, currentIndex-1)}>
                   <i className="fa fa-chevron-left"></i> 
              </div>
              <div className={styles.next}
                   onClick={this._setCurrentIndex.bind(this, currentIndex+1)}>
                   <i className="fa fa-chevron-right"></i> 
              </div>  
          </div>

          <div className={styles.pageWrap}>
              {pageItems}
          </div>
          
      </div>
    );
  }

  props = {
    className: 'Slideshow'
  }
     
}







