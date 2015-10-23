import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import d3 from 'd3';

import eng2cht from '../../utils/eng2cht';
import position2color from '../../utils/position2color';
import rectInCircleLayout from '../../utils/rectInCircleLayout';
import rectInCircleLayoutSVG from '../../utils/rectInCircleLayoutSVG';

class Record extends Component {
  static propTypes = {
    data : PropTypes.object.isRequired
  }
  constructor(props){super(props)
    this.state = {
      active: false
    }
  }
  _toggleActive(value, event){
    this.setState({
      active: value
    })
  }

  render() {
    const styles = require('./PartyPositionGroup.scss');
    const {data} = this.props;
    const {active} = this.state;

    let date = moment.unix(data.date);

    let cubeActiveStyle = (active) ? styles.positionCubeActive : "";

    //是否為黨團
    let isCaucus = (data.legislator.indexOf("黨團")!== -1);
    let caucusStyle = isCaucus ? styles.caucus : "";

    /* active record */
    let detailText;
    if(active){

          let preview = (data.content.length > 60) ? data.content.slice(0,60)+" ..." : data.content;
          detailText =  (
          <div className={styles.activeBlock}>
              <Link to={`/records/${data.id}`} className={styles.activeCube}>
                  <div className={styles.activeContent}>
                    <div>{date.format('YYYY-MM-DD')} / {data.legislator} / {data.meetingCategory}</div>
                    <div>{preview}</div>
                  </div>
              </Link>
          </div>);
    }


    return (
      <div className={styles.postionWrap}>
          {detailText}

          <Link to={`/records/${data.id}`}
                className={` ${styles.positionCube} ${cubeActiveStyle} ${styles[data.position]} ${caucusStyle }`}
                onMouseEnter={this._toggleActive.bind(this, true)}
                onMouseLeave={this._toggleActive.bind(this, false)}>
          </Link>

      </div>
    )
  }

  props = {
    className: ''
  }
}

export default class PartyPositionGroup extends Component {
  static propTypes = {
  }
  constructor(props){ super(props)
    this.state = {
       viewWidth: ""
    }
  }
  _updateViewWidth(){
    if(window){
        this.setState({
           viewWidth: window.innerWidth
        })
    }
  }
  _playD3(){
    console.log("we ♥ svg!");

    const { data, issueURL, parties } = this.props;
    const styles = require('./PartyPositionGroup.scss');
    
    const partyHasPositionPercentage = Math.round((this.props.data.hasPositionCount/this.props.parties[this.props.data.party].hasBeenCount) * 100, 0);
    const layoutStyles = rectInCircleLayoutSVG(
      window.innerWidth,
      20,
      data.records.length
    );

    let width = layoutStyles.width,
        height = layoutStyles.height,
        radius = Math.min(width, height) / 2;
    
    let arc = d3.svg.arc()
                .outerRadius(radius)
                .innerRadius(radius - layoutStyles.borderWidth);
    
    let pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.population; });
    
    let node = d3.select(`#svgContainer-${issueURL}-${data.party}`);
    
    node.selectAll("*")
        .remove();

    let svg = node
                .attr("width", width)
                .attr("height", height)
              .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    let dataset = data.positionPercentages.map((value,index)=>{
        return {
            position: value.position,
            population: value.percentage * (partyHasPositionPercentage / 100)
        }
    });
    dataset.push({
      position: 'none',
      population: 100-partyHasPositionPercentage
    });

    let g = svg.selectAll(".arc")
               .data(pie(dataset))
               .enter()
               .append("g")
               .attr("class", "arc")

        g.append("path")
         .attr("d", arc)
         .style("fill", function(d) { return position2color(d.data.position); });
      
      // g.append("text")
      //  .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      //  .attr("dy", ".35em")
      //  .style("text-anchor", "middle")
      //  .text(function(d) { return d.data.position; });
    

  }

  componentDidMount(){
    this._updateViewWidth();
    window.addEventListener('resize', this._updateViewWidth.bind(this));
    this._playD3();
  }
  componentDidUpdate(){
    this._playD3();
    
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this._updateViewWidth.bind(this));
  }
  render() {
    const styles = require('./PartyPositionGroup.scss');
    const {data, issueURL, userPosition, issueStatement} = this.props;
    const {parties} = this.props;

    let partyTitle = eng2cht(data.party);//KMT->中國國民黨

    let records = data.records.map((item,index)=>{
      return <Record data={item}
                     key={index} />
    });
    
    // 處理有多少人曾經表態，表態做主要的立場為何
    let partyPercentageItem;
    let partyHasPositionPercentage = Math.round((data.hasPositionCount/parties[data.party].hasBeenCount) * 100, 0);
    partyPercentageItem = (
      <div>
        <div className={styles.metaTitle}>{`${partyHasPositionPercentage}%的立委曾經表態`}</div>
        <div className={styles.metaTitle}>表態紀錄中{`${data.dominantPercentage}%${eng2cht(data.dominantPosition)}`}</div>
      </div>
    )

    if(data.hasPositionCount === 0){// 沒有任何表態紀錄
       partyHasPositionPercentage = 0;
       partyPercentageItem = (
          <div>
             <div className={styles.metaTitle}>{`${partyHasPositionPercentage}%的立委曾經表態`}</div>
          </div>
       )
    }

   
    
    const layoutStyles = rectInCircleLayout(
      this.state.viewWidth,
      20,
      this.props.data.records.length,
      data.dominantPosition,
      partyHasPositionPercentage,
      data.positionPercentages
    );

    let userPositionItem;
    if( data.dominantPosition === userPosition && 
        (data.dominantPosition === "aye" || data.dominantPosition === "nay")){
       
       userPositionItem = 
        <div className={styles.userPositionBlock}>
            <div className={styles.userPositionText}>與你立場相同</div>
        </div>
    }
   

    return (
      <div className={styles.wrap}>
        <div className={styles.header}>
          { userPositionItem }
          <Link to={`/parties/${data.party}/records/${issueURL}`} className={`${styles.partyTitle} ${styles.ia} ${styles.bright}`}>{partyTitle}</Link>
          
          { partyPercentageItem }
          
        </div>
        <div style={layoutStyles.wrap}>
            <svg id={`svgContainer-${issueURL}-${data.party}`}
                 className={styles.svgWrap} />
              <div style={layoutStyles.rect}>{records}</div>
        </div>
      </div>
    );
  }

  props = {
    className: ''
  }
}
