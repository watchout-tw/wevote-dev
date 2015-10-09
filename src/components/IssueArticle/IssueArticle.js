import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import people_name2id from '../../utils/people_name2id';

export default class IssueArticle extends Component {
  static propTypes = {
  }
  constructor(props) { super(props)  
    this.state = {
        active : false
    } 
  }
  _toggleActive(){
    this.setState({
      active: !this.state.active
    })
  }

  render(){
    const styles = require('./IssueArticle.scss');
    const {issue} = this.props;//e.g. MarriageEquality
    const {active} = this.state;

    let mainArticle;
    switch(issue){
        case 'marriageEquality':
          mainArticle = <MarriageEquality />
          break;
        default:
          mainArticle = <MarriageEquality />
          break;
          //no op
    }
    
    let imgURL = require("./images/flying.png");
    let activeArticle = (active === true) ? styles.active : "";
    let buttonText = (active === true) ? "隱藏文章" : "繼續閱讀";

    return (
       <div className={styles.articleWrap}>
          <div className={styles.article}>

              <div className={styles.articleHeader}>
                  <img src={imgURL}
                       className={styles.img}/>
                  <div className={styles.articleTitle}>阿草放大鏡</div>
                  <div className={styles.articleSubtitle}>數據背後，你可能不知道的事</div>
                  <ul className={styles.hintList}>
                    <li className={styles.hint}>迷思一：民進黨就是支持婚姻平權，國民黨就是反對？</li>
                    <li className={styles.hint}>迷思二：國民黨立委席次比較多，那在立法院裡他們的聲音應該比較大吧？</li>
                    <li className={styles.hint}>迷思三：看起來支持方的表態次數比反對方多，那法案應該很容易通過吧？</li>
                  </ul>
              </div>

              <div className={styles.section}>
                <p className={styles.paragraph}>你可能聽過婚姻平權，也可能聽過每年盛大的同志遊行，甚至看過新聞大篇幅報導今年6月美國邁向同性婚姻合法化的消息。那麼，在台灣立法院內又是怎麼討論這個議題呢？看完上面圖表之後，你真的看懂了嗎？</p>
                <p className={styles.paragraph}>讓阿草用數據破解你對於立法院的迷思！</p>
              </div>
              
              <div className={` ${styles.mainArticle} ${activeArticle}`}>{mainArticle}</div>
              <div className={styles.button}
                   onClick={this._toggleActive.bind(this)}>{buttonText}</div>
           </div>
       </div>
    )
  }        
}
class MarriageEquality extends Component {
  render(){
    const styles = require('./IssueArticle.scss');
    return (
      <div>
          <div className={styles.section}>
            <h1 className={styles.sectionTitle}>迷思一：民進黨就是支持婚姻平權，國民黨就是反對？</h1>
            <p className={styles.paragraph}>圖表中可以看到民進黨共有37筆表態紀錄，全都是支持，而國民黨則有9筆表態紀錄，以反對居多。這樣看起來標題的說法似乎沒錯？</p>
            <p className={styles.paragraph}>不過，民進黨共有40席立委，其中只有12位表態。更重要的是，婚姻平權法案交由司法法制委員會審查，照理說這個委員會的委員應該會對這個法案有比較多的表態，但我們卻驚訝地發現：其中<Link className={styles.peopleLink} to={`/people/${people_name2id("柯建銘")}/marriage-equality`}>柯建銘</Link>(8)、<Link className={styles.peopleLink} to={`/people/${people_name2id("潘孟安")}/marriage-equality`}>潘孟安</Link>(4)、<Link className={styles.peopleLink} to={`/people/${people_name2id("高志鵬")}/marriage-equality`}>高志鵬</Link>(2)、<Link className={styles.peopleLink} to={`/people/${people_name2id("蔡其昌")}/marriage-equality`}>蔡其昌</Link>(2)等曾經擔任這個委員會的民進黨立委（括號內代表曾任會期次數），竟然對這個議題沒有過任何表態！既然沒有表態過，也就不能肯定他們都是支持或反對。因此，比較正確的說法應該是：<blockquote>「民進黨中有表態紀錄的立委都是支持，但不代表民進黨所有立委都是支持。」</blockquote></p>
            <p className={styles.paragraph}>而國民黨雖然有65席立委，但表態過的只有8位，其中<Link className={styles.peopleLink} to={`/people/${people_name2id("黃昭順")}/marriage-equality`}>黃昭順</Link>立委則曾經表態偏向支持。同時，在拒絕表態這件事上，國民黨立委也不落人後，其中<Link className={styles.peopleLink} to={`/people/${people_name2id("謝國樑")}/marriage-equality`}>謝國樑</Link>(8)、<Link className={styles.peopleLink} to={`/people/${people_name2id("顏寬恆")}/marriage-equality`}>顏寬恆</Link>(6)、<Link className={styles.peopleLink} to={`/people/${people_name2id("王廷升")}/marriage-equality`}>王廷升</Link>(6)、<Link className={styles.peopleLink} to={`/people/${people_name2id("王惠美")}/marriage-equality`}>王惠美</Link>(6)這幾位立委（括號內代表曾任會期次數）更堪稱大戶。</p>
            <p className={styles.paragraph}>正因各黨合計共有16位應表態卻沒有表態紀錄的立委，因此不應該只從表面結果就斷定民進黨支持、國民黨反對。關心這個議題的選民也許更應該關心，到底為什麼有這麼多立委沒有表態？這麼多「特別不關心」這個議題的立委，是否也對這個議題正反雙方凝聚共識上，造成什麼影響呢？</p>
          </div>
          <div className={styles.section}>
            <h1 className={styles.sectionTitle}>迷思二：國民黨立委席次比較多，那在立法院裡他們的聲音應該比較大吧？</h1>
            <p className={styles.paragraph}>在立法院中，立委總席次是國民黨65席：民進黨40席，就算只看司法法制委員會內的席次，長期以來都是國民黨9席，民進黨4席。可見國民黨有人數的絕對優勢，但是直接比較兩方發言討論這個議題的次數卻是國民黨9次：民進黨17次，顯然不成比例。也就是說，國民黨立委有著惜字如金的美德，或許他們不是想打混，只是想扮演好「沉默的多數」這個角色，但這樣的角色可能不太符合立委「為民喉舌」的形象。</p>
            <p className={styles.paragraph}>說到這裡，你可能會反駁：不對吧！明明新聞中常看到<Link className={styles.peopleLink} to={`/people/${people_name2id("賴士葆")}/marriage-equality`}>賴士葆</Link>、<Link className={styles.peopleLink} to={`/people/${people_name2id("費鴻泰")}/marriage-equality`}>費鴻泰</Link>、<Link className={styles.peopleLink} to={`/people/${people_name2id("吳育昇")}/marriage-equality`}>吳育昇</Link>這些立委接受護家盟的陳情，堅定捍衛家庭價值。難道他們都沒有在立法院裡為這個議題發言嗎？</p>
            <p className={styles.paragraph}>殘酷的事實是，許多在媒體上公開表態支持護家盟理念的立委（其實不只上述三位立委，還包含了民進黨的<Link className={styles.peopleLink} to={`/people/${people_name2id("劉櫂豪")}/marriage-equality`}>劉櫂豪</Link>立委），卻幾乎不曾在立法院內針對這個議題進行正反意見的交流和辯論，實在很可惜。我們強烈建議護家盟的朋友，應該去詢問這些立委，為什麼沒有在國會裡代表民意發聲？</p>
            <p className={styles.paragraph}>另一方面，由相關新聞或同志團體公布的訊息中，發現如<Link className={styles.peopleLink} to={`/people/${people_name2id("羅淑蕾")}/marriage-equality`}>羅淑蕾</Link>、<Link className={styles.peopleLink} to={`/people/${people_name2id("丁守中")}/marriage-equality`}>丁守中</Link>立委已轉變立場為支持同婚，或許也有其他國民黨立委是支持的態度，但是這些立場也沒有直接反映在他們的問政表現上。</p>
            
          </div>
          <div className={styles.section}>
            <h1 className={styles.sectionTitle}>迷思三：看起來支持方的表態次數比反對方多，那法案應該很容易通過吧？</h1>
            <p className={styles.paragraph}>由圖表來看，<Link className={styles.peopleLink} to={`/people/${people_name2id("尤美女")}/marriage-equality`}>尤美女</Link>立委可說是最關心這個議題的立委，總計提過兩次法案，主辦過兩次公聽會，四次發言紀錄，在這些方面的次數都是名列第一。此外，<Link className={styles.peopleLink} to={`/people/${people_name2id("蕭美琴")}/marriage-equality`}>蕭美琴</Link>(6)、<Link className={styles.peopleLink} to={`/people/${people_name2id("陳其邁")}/marriage-equality`}>陳其邁</Link>(4)、<Link className={styles.peopleLink} to={`/people/${people_name2id("段宜康")}/marriage-equality`}>段宜康</Link>(4)、<Link className={styles.peopleLink} to={`/people/${people_name2id("鄭麗君")}/marriage-equality`}>鄭麗君</Link>(3)、<Link className={styles.peopleLink} to={`/people/${people_name2id("林淑芬")}/marriage-equality`}>林淑芬</Link>(3)這些立委，雖然不是司法法制委員會的立委，但卻頻繁對這個議題表態(括號內為表態次數)，其中<Link className={styles.peopleLink} to={`/people/${people_name2id("陳其邁")}/marriage-equality`}>陳其邁</Link>、<Link className={styles.peopleLink} to={`/people/${people_name2id("段宜康")}/marriage-equality`}>段宜康</Link>更是兩度以審查預算方式來要求行政機關促成修法。上述這六位立委，占了將近四分之三的支持表態次數，可見他們的關心程度。而反對方的立委，則總共只有7位立委，且幾乎每個人都只有一次表態紀錄。</p>
            <p className={styles.paragraph}>即使支持方和反對方的表態次數如此懸殊，但是這個法案在立法院內的審查進度卻不是十分順利。這或許可以說明兩個現象：
                <ul className={styles.list}>
                  <li>(一) 任何法案要修法通過，其實並不容易。支持方必須花好幾倍的時間心力去論述，但反對方阻擋修法卻不一定需要太多理由。</li>
                  <li>(二) 比起發言說明理由，反對方更傾向採用議事規則的方式阻擋修法。比如程序委員會擋下法案，各委員會的召委如果不關心這個議題就不排審，或者用其他議事程序的理由阻止開會等等。</li>
                </ul>
            </p>
          </div>
          <div className={styles.section}>
            <h1 className={styles.sectionTitle}>結論</h1>
            <p className={styles.paragraph}>整體來說，雖然民進黨看起來是偏向支持婚姻平權，但表態紀錄高度集中在少數幾個立委身上（有趣的是，幾乎都是不分區立委），且也有許多不表態的立委，因此很難肯定下一屆民進黨立委的態度就是全面支持。國民黨雖然整體偏向反對，但其實表態的人數和次數都更少。其他小黨的立委，則幾乎未曾對這個議題發聲。</p>
            <p className={styles.paragraph}>儘管這個議題近年來在社會上引起大規模討論，但各黨立委不表態的現象卻十分嚴重，這也導致在立法院中欠缺足夠的溝通對話。站在民主的角度，無論是支持或反對同性婚姻合法化的選民，都應該要求代表你意見的立委多在立法院裡明確表態，才能促進討論、真正解決問題。</p>
          </div>
      </div>
    )
  }
}

