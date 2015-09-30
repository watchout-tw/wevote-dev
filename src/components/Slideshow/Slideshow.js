import React, {Component, PropTypes} from 'react';

export default class Slideshow extends Component {
  static propTypes = {
      data: PropTypes.array,
      topic: PropTypes.string,
      className: PropTypes.string
  }

  //initial state
  constructor(props) { super(props)
    this.state = {
        autoplayTimer: "",
        currentIndex: 0,
        imageLoaded: true
    }
  }

  _handleKeyDown(e){
    e.preventDefault();

    const LEFT = 37,
          RIGHT = 39;
          
    const { currentIndex } = this.state;
    if( e.keyCode == RIGHT ) {
        this._setCurrentIndex(currentIndex + 1);
    }
    if( e.keyCode == LEFT ) {
        this._setCurrentIndex(currentIndex - 1);
    }
    
  }
  componentDidMount(){
    window.addEventListener('keydown', this._handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleKeyDown.bind(this));
      
  }

  _setCurrentIndex(value, event){
   
    var maxIndex =  this.props.data.length - 1;
    if(value > maxIndex){
      value = value % (maxIndex+1);
    }
    if(value < 0){
      value = maxIndex;
    }

    this._setImageLoaded(false);

    this.setState({
      currentIndex: value
    })

  }

  _setImageLoaded(value, event){
    //console.log("set loaded " + value);
    this.setState({
      imageLoaded: value
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
    const {data, topic} = this.props;

    let {currentIndex, imageLoaded} = this.state;
    let currentSlide = data[currentIndex];
    
    return (
      <div className={styles.wrap}>
          <div className={styles.pageWrap}>
          {
            data.map((value,index)=>{
              let activePageClass = (index===currentIndex) ? styles.activePage : "";
             
              return (
                <div className={`${styles.page} ${activePageClass}`}
                     key={index}
                     onClick={this._setCurrentIndex.bind(this, index)}>
                     {index+1}
                </div>
              )
            })
          }
              
          </div>

          <div className={styles.prev}
               onClick={this._setCurrentIndex.bind(this, currentIndex-1)}>
               <i className="fa fa-chevron-left"></i> 
          </div>
          <div className={styles.next}
               onClick={this._setCurrentIndex.bind(this, currentIndex+1)}>
               <i className="fa fa-chevron-right"></i> 
          </div>

          {
              data.map((value,index)=>{
                
                return (
                  <img alt={value.alt}
                       src={require(`./images/${value.filename}`)}
                       className={(index===currentIndex) ? styles.activeSlideImg : styles.inactiveSlideImg} />
                )
              })

          }
          
      </div>
    );
  }

  props = {
    className: 'Slideshow'
  }
     
}

