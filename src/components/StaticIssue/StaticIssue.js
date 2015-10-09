import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import Slideshow from '../../components/Slideshow/Slideshow.js';
import IssueFigure from '../../components/IssueFigure/IssueFigure.js';
import IssueArticle from '../../components/IssueArticle/IssueArticle.js';


@connect(
    state => ({
                issues: state.issues
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class StaticIssue extends Component {
  static propTypes = {
     issues: PropTypes.object.isRequired
  }

  constructor(props) { super(props)   
     this.state = {
        currentIssueName: props.currentIssueName, //URL
        currentView: props.currentView
     }
  }
  componentDidMount(){
      console.log("mount - static issue")
      if(window){
        let pathname = window.location.pathname;
        console.log(pathname) 
        if(pathname.indexOf(".html")!==-1){
           pathname = pathname.split(".html")[0]
        }
        pathname = pathname.split("/");
        console.log(pathname)
        this.setState({
          currentIssueName: pathname[2],
          currentView: pathname[3] || "parties"

        })
        console.log("*")
        console.log(this.state)
      }
  }
  componentWillReceiveProps(nextProps){
      this.setState({
          currentIssueName: nextProps.currentIssueName,
          currentView: nextProps.currentView
      })
  }
  
  render(){
    
      const styles = require('./StaticIssue.scss');
      const {issues, setCurrentView} = this.props;
      const {currentView, currentIssueName} = this.state;
      const currentIssue = issues[currentIssueName];
      console.log("static issues render")

      if(!currentIssue) return <div></div>;

       // 協力 NGO
      const { collaborators } = currentIssue;
      let collaboratorItems = collaborators.map((ngo, index)=>{
          return <a className={styles.link}
                    href={ngo.link}
                    target="_blank"
                    key={index}>{ngo.name}</a>
      });

      return (
        <div className={styles.wrap}>
            <div className={styles.innerWrap}>
                <Slideshow currentIssue={currentIssue} 
                           topic={currentIssue.title}/>
                           
                <IssueFigure currentView={currentView}
                             currentIssue={currentIssue}
                             currentIssueName={currentIssueName}
                             setCurrentView={setCurrentView} /> 

                <IssueArticle issue={currentIssue.titleEng} />
                <div className={styles.collaboratorInfo}>
                    特別感謝{collaboratorItems}協助議題資料
                </div>

             </div>
        </div>
      )
  }
}

