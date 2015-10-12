import React, {Component, PropTypes} from 'react';
import ReactSwipe from 'react-swipe';

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
        mobile: true //default
    }
    this.mobileDesktopBreak = 600;
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

    if(window.innerWidth >= this.mobileDesktopBreak){
       

       this.setState({
         data: this.props.currentIssue.slideshows,
         mobile: false
       })
    }
  }
  _handleResize(e){
    //console.log("resize event.");
    const {mobile} = this.state;
    if(window.innerWidth >= this.mobileDesktopBreak){
        if(mobile === true){
           this.setState({
              mobile: false,
              currentIndex: 0
           })
        }
    }else{
        if(mobile === false){
           this.setState({
              mobile: true
           })
        }
    }
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleKeyDown.bind(this));
    window.removeEventListener('resize', this._handleResize.bind(this));
  }
  _setCurrentIndex(value, event){
    const {currentIssue} = this.props;
    const {mobile} = this.state;

    let maxIndex = (mobile===true) ? currentIssue.slideshowsMobile.length - 1 : currentIssue.slideshows.length - 1;

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
  _next() {
    this.refs.ReactSwipe.swipe.next();
  }
  _prev() {
    this.refs.ReactSwipe.swipe.prev();
  }
  componentWillReceiveProps(nextProps) {
      const {topic} = this.props;
      const nextTopic = nextProps.topic;
      if(topic !== nextTopic){
        this._setCurrentIndex(0)
      }
  }

  _onSlideChange(index, elem){
      console.log(index);
      console.log(elem)
  }

  render() {
    const styles = require('./Slideshow.scss');
    const {currentIssue, topic} = this.props;
    const dataWeb = currentIssue.slideshows;
    const dataMobile = currentIssue.slideshowsMobile;

    let {currentIndex, mobile} = this.state;

    let pageItems =  (mobile === false) ? dataWeb.map((value,index)=>{
        let activePageClass = (index===currentIndex) ? styles.activePage : "";
        return (
          <div className={`${styles.page} ${activePageClass}`}
               key={index}
               onClick={this._setCurrentIndex.bind(this, index)}>
          </div>
        )
    }) : "" ;

    //web version
    let slideImages = dataWeb.map((value,index)=>{
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

    //mobile version
    let slideImagesMobile = dataMobile.map((value,index)=>{
        let url = require(`./images/${value.filename}`)
        return (
          <div key={index}><img alt={value.alt}
               src={url}
               className={styles.activeSlideImg}/></div>
        )
    });

    //decide show mobile version or web version
    let slides = (mobile === true) ? (
      <ReactSwipe continuous={true} callback={this._onSlideChange.bind(this)} ref='ReactSwipe'>
         {slideImagesMobile}
      </ReactSwipe>
    ) : slideImages;

    let prev_next = require('./images/prev-next.svg');
    let preNextButton = (mobile === true) ? (
      <div className={styles.prevNextWrap}>
        <div className={styles.prev}
             onClick={this._prev.bind(this)}><img src={prev_next} className={styles.prev_next}/></div>
        <div className={styles.next}
             onClick={this._next.bind(this)}><img src={prev_next} className={styles.prev_next}/></div>
      </div>
    ) : (
      <div className={styles.prevNextWrap}>
        <div className={styles.prev}
             onClick={this._setCurrentIndex.bind(this, currentIndex-1)}><img src={prev_next} className={styles.prev_next}/></div>
        <div className={styles.next}
             onClick={this._setCurrentIndex.bind(this, currentIndex+1)}><img src={prev_next} className={styles.prev_next}/></div>
      </div>
    );

    return (
      <div className={styles.wrap}>
          <div className={styles.slideBlock}>{slides}{preNextButton}</div>
          <div className={styles.pageWrap}>{pageItems}</div>
      </div>
    );
  }

  props = {
    className: 'Slideshow'
  }
}
