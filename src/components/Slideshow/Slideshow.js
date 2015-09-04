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
        currentIndex: 0
    }
  }

  _setCurrentIndex(value, event){
    console.log("set index");
    this.setState({
      currentIndex: value
    })
  }

  componentDidMount() {
      //console.log("I'm mount!");
      setInterval(()=>{
          let nextIndex = (this.state.currentIndex + 1)%(this.props.data.length);
          this._setCurrentIndex(nextIndex);
      }, 5000); 
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
    let {currentIndex} = this.state;
    

    return (
      <div className={styles.wrap}>
          <img alt="to-be-add"
               className={styles.slideImg}
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

