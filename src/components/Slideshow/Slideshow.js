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

    this._autoplay();
  }

  _setImageLoaded(value, event){
    //console.log("set loaded " + value);
    this.setState({
      imageLoaded: value
    })
  }

  _autoplay(){

    clearInterval(this.state.autoplayTimer);

    let timer = setInterval(()=>{
        let nextIndex = (this.state.currentIndex + 1)%(this.props.data.length);
        this._setCurrentIndex(nextIndex);
    }, 5000); 
    
    this.setState(
      { 
        autoplayTimer:  timer
      }
    )
  }

  componentDidMount() {
      //console.log("I'm mount!");
      this._autoplay();
  }

  componentWillUnmount(){
      //console.log("bye! i'm off work!");
      clearInterval(this.state.autoplayTimer);
  }

  componentWillReceiveProps(nextProps) {
      const {topic} = this.props;
      const nextTopic = nextProps.topic;
      if(topic !== nextTopic){
        this._setCurrentIndex(0)
      }
       
  }

  _imageOnHover(value, event){
    //console.log("* hover * "+value)
    if(value){
      clearInterval(this.state.autoplayTimer);
    }else{
      this._autoplay();
    }
  }

  render() {
    const styles = require('./Slideshow.scss');
    const {data, topic} = this.props;

    let {currentIndex, imageLoaded} = this.state;
    
    return (
      <div className={styles.wrap}>
          <div className={styles.prev}
               onClick={this._setCurrentIndex.bind(this, currentIndex-1)}>Prev</div>
          <div className={styles.next}
               onClick={this._setCurrentIndex.bind(this, currentIndex+1)}>Next</div>
          <img alt="to-be-add"
               className={imageLoaded===true ? styles.slideImg : styles.slideImgLoading}
               onLoad={this._setImageLoaded.bind(this,true)}
               onMouseEnter={this._imageOnHover.bind(this, true)}
               onMouseLeave={this._imageOnHover.bind(this, false)}
               src={require(`./images/${data[currentIndex]}.jpg`)} />
          
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
      </div>
    );
  }

  props = {
    className: 'Slideshow'
  }
     
}

