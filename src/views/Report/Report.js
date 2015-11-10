import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';

import DocumentMeta from 'react-document-meta';

import LegislatorCards from '../../components/LegislatorCards/LegislatorCards.js';
import RecordStream from '../../components/RecordStream/RecordStream.js';

const breakWebVersion = 730; //跟 scss 同步
import $ from 'jquery';
@connect(
    state => ({
                  MaXiRecords: state.MaXiRecords
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class Report extends Component {
  static propTypes = {

  }
  constructor(props){ super(props)
      let array = Object.keys(props.MaXiRecords);//default 為第一位立委

      this.state = {
        activeLegislator: array[0],
        fixedStream: false,
        meetFilterValue: "all",
        procedureFilterValue: "all"
      }
  }
  _onScroll(){
      let node = this.refs.positionSection.getDOMNode();
      let rect = node.getBoundingClientRect();
      let {fixedStream} = this.state;

      let Fnode = this.refs.SPfooterSection.getDOMNode();
      let Frect = Fnode.getBoundingClientRect();

      let Rnode = this.refs.recordStream.getDOMNode();

      // console.log(rect.top)
      // console.log(rect.bottom)
      // console.log("*"+Frect.top)
      // console.log(">"+window.innerHeight)
      // console.log(document.body.scrollTop)

      if(rect.top <= 0){//set fixed
          //scroll to bottom, set back to default
          if(Frect.top<window.innerHeight){
              if(fixedStream === true){
                  this.setState({
                      fixedStream: false
                  })

                  Rnode.style.position = 'relative';
                  Rnode.style.top = `${-(rect.top)}px`;
                  Rnode.style.height = 'auto';


              }

          }else{
              if(fixedStream === false){
                  Rnode.style.position = '';
                  Rnode.style.top = '';
                  Rnode.style.height = '';

                  this.setState({
                     fixedStream: true
                  })
              }
          }
      }
      if(rect.top >= 0 && fixedStream === true){//set back to default
          this.setState({
             fixedStream: false
          })
      }


  }
  componentDidMount(){
      window.addEventListener("scroll", this._onScroll.bind(this));
  }
  componentWillUnmount(){
     window.removeEventListener("scroll", this._onScroll.bind(this));
  }
  _handleClickCard(name, event){
      this.setState({
          activeLegislator: name
      })
  }
  _onChangeMeetFilter(){
    let node = this.refs.meetFilter.getDOMNode();
    this.setState({
        meetFilterValue: node.value
    })

  }
  _onChangeProcedureFilter(){
    let node = this.refs.procedureFilter.getDOMNode();
    this.setState({
        procedureFilterValue: node.value
    })
  }

  render() {
    const styles = require('./Report.scss');
    const {MaXiRecords} = this.props;
    const {activeLegislator, fixedStream, meetFilterValue, procedureFilterValue} = this.state;

    let coverImg = require("./images/cover.jpg");

    let legislatorCardsClasses = classnames({
        [styles.legislatorCards] :true,
        [styles.fixed] : fixedStream
    })
    let legislatorControlClasses = classnames({
        [styles.legislatorControls] :true,
        [styles.fixed] : fixedStream
    })

    let recordStreamClasses = classnames({
        [styles.fixedStream] : fixedStream
    })

    const title = `你支持馬習會嗎？你認為馬習會程序公開透明嗎？-沃草2016立委出任務`;
    const description = `你知道針對馬習會，立委在立法院講了些甚麼嗎？你認為馬習會規劃程序有符合國家需要、人民支持、國會監督的原則嗎？一起來看看立委怎麼說。`;
    const metaData = {
      title: title,
      description: description,
      meta: {
          charSet: 'utf-8',
          property: {
            'og:title': title,
            'og:description': description,
            'og:type' : 'website',
            'og:image' : 'http://wevote.tw/MaXi.jpg'
          }
      }

    };

    return (
    <div className={styles.wrap}>
        <DocumentMeta {...metaData}/>
        <img src={coverImg} className={styles.coverImg}/>
        <Fig/>
        <div className={styles.posFigSection}><h2>你知道針對馬習會，立委在立法院講了些甚麼嗎？</h2></div>
        <div className={styles.positionSection} ref="positionSection">

            <div className={legislatorCardsClasses}>
              <div className={legislatorControlClasses}>

                  <div className={styles.selectBlocks}>
                      <div className={styles.selectBlock}>
                          支持會面
                          <select onChange={this._onChangeMeetFilter.bind(this)}
                                  ref="meetFilter">
                            <option value="all">所有</option>
                            <option value="aye">贊成</option>
                            <option value="nay">反對</option>
                            <option value="unknown">模糊</option>
                            <option value="none">？</option>
                          </select>
                      </div>
                      <div className={styles.selectBlock}>
                          本次程序
                          <select onChange={this._onChangeProcedureFilter.bind(this)}
                                  ref="procedureFilter">
                            <option value="all">所有</option>
                            <option value="transparent">公開透明</option>
                            <option value="blackbox">黑箱</option>
                            <option value="unknown">模糊</option>
                            <option value="none">？</option>
                          </select>
                      </div>
                  </div>
              </div>
              <LegislatorCards handleClickCard={this._handleClickCard.bind(this)}
                               activeLegislator={activeLegislator}
                               meetFilterValue={meetFilterValue}
                               procedureFilterValue={procedureFilterValue}/>
            </div>
            <div className={styles.recordStream}>
                <div className={recordStreamClasses} ref="recordStream">
                    <RecordStream activeLegislator={activeLegislator}/>
                </div>
            </div>
        </div>

        <div className={styles.footerSection} ref="SPfooterSection">

          <ul>
            <li>統計資料範圍：2015/11/03 - 2015/11/06</li>
            <li>澄清請 email 至 wevote@watchout.tw</li>
          </ul>

        </div>
    </div>

    );
  }
}
class Fig extends Component {
    
    _scrollTo(value, e){
        let target = $("#Section"+value);
  
        $("html,body").animate({
            scrollTop: target.offset().top
        }, 500);
  
    }

    render(){
        const styles = require('./Report.scss');
        let fig1 = require('./images/slides-01.png');
        let fig2 = require('./images/slides-02.png');
        let fig3 = require('./images/slides-03.png');

        let chapters = (
            <div>
                <div className={styles.chapterItem}><div className={styles.chapterItemText} onClick={this._scrollTo.bind(this, 1)}>***時間大事紀告訴你到底發生了什麼事？</div></div>
                <div className={styles.chapterItem}><div className={styles.chapterItemText} onClick={this._scrollTo.bind(this, 2)}>***勇者黨團又各有什麼立場？</div></div>
                <div className={styles.chapterItem}><div className={styles.chapterItemText} onClick={this._scrollTo.bind(this, 3)}>***立委勇者又各自說了什麼話？</div></div>
            </div>
        )
        let backToContents = (
            <div>
              <div className={styles.chapterItem}>
                <div className={styles.chapterItemText} onClick={this._scrollTo.bind(this, 0)}>《回到出發點》</div></div>
                {chapters}
            </div>
        )
        return (
            <div className={styles.figWrap}>

                <div className={styles.figSection}>
                    <h1 id="Section0">警鐘響起！【馬習會】特殊副本深夜來襲～</h1>
                    <p>即將卸任的島嶼總統，為了兩塊土地的和平和一個握手的心願，<br/>
                       在費盡千辛萬苦後，終於促成這次歷史性的會面──11/7決戰新加坡！</p>
    
                    <p>但因為沒有跟民主殿堂的立委勇者們進行事前溝通，當消息走漏時引發了軒然大波。<br/>
                       有些勇者認為是黑箱會議，有些勇者則認為這是為了兩岸和平。</p>
    
                    {chapters}
                    
                    <p>你不可錯過的世紀之戰，快往下進入副本！</p>

                </div>
                <img src={fig1} className={styles.figCover}
                     id="Section1" />
                <div className={styles.figSection}>
                    <h2>馬習會三天震撼，藍綠各出奇招</h2>

                    <h3>陸委會「偷渡」未事先向立院報告，點燃戰火</h3>
                    <p>11/3（二）晚上「馬習會」一記震撼彈，引起台灣政治熱烈討論。而陸委會主委夏立言自稱在10/14夏張會已有討論，引發在野黨立委不滿，質疑陸委會竟未在審查預算期間報告馬習會，根本是欺騙國會及黑箱作業。</p>
                    <h3>內政委員會：民進黨立委提出變更議程，國民黨立委消失戰術</h3>
                    <p>民進黨段宜康等立委因此在11/4（三）提出變更議程案，要求陸委會到內政委員會報告。但是國民黨的內政委員會立委，除鄭天財曾有發言表態過外，其他如吳育昇、張慶忠、盧嘉辰、陳超明、徐志榮等5位立委則使出消失戰術，未出現開會，僅留下擔任召委的邱文彥受到在場立委的強烈炮轟。邱文彥也坦下這些批評，連續兩天宣布休息協商，未開會也未處理變更議程的提案，形同內政委員會停擺。</p>
                    <p>另一方面，行政院長毛治國則在同一天到立法院院長室，向院長王金平及立院各黨團報告。但民進黨則認為應到內政委員會作正式報告，而拒絕出席會議，台聯則當場退席抗議。國民黨則以此認為「馬習會三天前有報告，程序已屬公開透明」。關於陸委會到底應在哪裡報告，這也是另一個爭議點。</p>
                    <h3>院會：國民黨團出招「總統國情報告」，民進黨拒絕為馬背書</h3>
                    <p>到了11/6（五）的院會，雙方砲火更加升級，國民黨率先出招，提出「馬習會後，總統到立院國情報告」。但民進黨仍強調陸委會應先到內政委員會報告，不願以「國情報告」方式為馬總統事後背書。國民黨則以此反批民進黨「假監督」。朝野協商破裂，王金平也宣布院會直接休息，連院會也停擺整日。</p>
                    <p>目前看來，民進黨沒有其他反制或出招，也受到社民黨批評未盡在野黨監督責任，認為民進黨既不採取體制內彈劾、罷免、釋憲等手段，也不採取體制外抗議。面對國民黨的出招，民進黨被動防禦，下週立院的攻防會如何進行？週六（7日）馬習會決戰新加坡，也將點燃立院的新戰場。</p>
                    {backToContents}
                </div>
                

                <img src={fig2} className={styles.figCover}
                     id="Section2" />
                <div className={styles.figSection}>
                    <h2>除國民黨以外，在野黨一致批評程序黑箱</h2>
                    <div className={styles.figAuguePoints}>
                      國民黨立場：全部都贊成馬習會或認為程序公開透明<br/>
                      民進黨立場：幾乎都批評程序黑箱，另外多數主張反對馬習會<br/>
                      台聯黨立場：幾乎都同時反對馬習會，也認為程序黑箱<br/>
                      親民黨立場：贊成馬習會，但認為程序黑箱<br/>
                    </div>
                    <p>註1：並非每個政黨所有立委都有表態，這裡僅呈現有表態的立委資訊。<br/>
                       註2：政黨圖的大小依照發言次數比例。</p>
                    {backToContents}
                </div>
                

                <img src={fig3} className={styles.figCover}
                     id="Section3" />
                <div className={styles.figSection}>
                    <h2>朝野對立吵什麼？爭議論點大PK！</h2>
                    <p>立院內戰場兩大爭論，朝野立委各自提出了具體的論點：</p>
                    <h3>爭議一：是黑箱還是透明？</h3>
                    <p>國民黨立委幾乎都主張馬習會程序透明，論點大概是：</p>
                        <div className={styles.figAuguePoints}>
                          「馬習會三天前來報告，算是公開透明。」<br/>
                          「行政院有向立法院長報告，就符合事前報告。」<br/>
                          「外交事務需要保密。」
                        </div>

                    <p>但在野黨立委普遍都認為這次又是黑箱作業，例如：</p>
                    <div className={styles.figAuguePoints}>
                      「連立法院長王金平都是看了報紙才知道！」<br/>
                      「審查預算時，陸委會都沒有報告馬習會，這是欺騙國會！」<br/>
                      「應該到內政委員會做正式報告，院長室的是私下的說明。」</div>

                    <p>雙方對於事前應該提早多久向國會報告，認知顯然有很大的差異。</p>

                    <h3>爭議二：贊成還是反對馬習會？</h3>
                    <p>國民黨一致抱持肯定態度，特別的是，親民黨也站在這一邊：</p>
                     <div className={styles.figAuguePoints}>
                      「馬習會帶來歷史性的一步，搭起兩岸溝通的橋樑。」<br/>
                      「兩岸和平發展經濟，才是硬道理！」</div>

                    <p>台聯黨則控訴國民黨及馬總統賣台，因此強烈反對。民進黨大部分意見雖然也是偏向反對，但似乎並不直接主張反對，而是認為馬總統的民意基礎不足，例如：</p>
                    <div className={styles.figAuguePoints}>
                      「馬習會發生在馬總統即將卸任的半年，也發生在台灣將產生新領導人的兩個月。這樣的歷史會面，毫無正當性跟必要性。」<br/>
                      「馬總統民調很低，過去常常無法信守他的承諾。」</div>
                    <p>在雙方領導人會面的問題上，民進黨意見似乎並不明確反對，而是著眼於應該交由大選後的新民意來決定。這可能間接證明：比起現在的在野監督角色，民進黨更看重將來執政的準備。</p>
                    <p>台灣政治的一個特點，就是立委都不只在立法院內處理問題，更經常在立法院外的媒體上交鋒。馬習會這次引起的爭議，也有類似現象。國民黨立委面對一開始民進黨立委在內政委員會挑起的「變更議程」之戰，選擇消極避戰不開會，而是在媒體上大動作開記者會，反批民進黨「鬼叫」。當國民黨出招「國情報告」而民進黨被動防禦後，更是在媒體上批判民進黨「假監督」。這些立法院外的口水砲，雖然增加了許多看頭，但是對於馬習會是否黑箱、國會如何監督等問題，其實沒有太大幫助。仍應回歸到立院內的表態，避免一再因爭議而延宕議事，才是立委的職責所在。</p>
                    {backToContents}
                </div>
                

            </div>
        )
    }
 }
