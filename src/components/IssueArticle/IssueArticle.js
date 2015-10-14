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
    const {issue} = this.props;//e.g. marriageEquality
    const {active} = this.state;
    
    let articlePreview;
    let mainArticle;

    switch(issue){
        case 'marriageEquality':
          articlePreview = <MarriageEqualityPreview />
          mainArticle = <MarriageEqualityContent />
          break;
        
        case 'referendum':
          articlePreview = <ReferendumPreview />
          mainArticle = <ReferendumContent />
          break;

        case 'recall':
          articlePreview = <RecallPreview />
          mainArticle = <RecallContent />
          break;

        case 'nuclearPower':
          articlePreview = <NuclearPowerPreview />
          mainArticle = <NuclearPowerContent />
          break;

        default:
          break;
         
    }

    let imgURL = require("./images/flying.png");
    let activeArticle = (active === true) ? styles.active : "";
    let buttonText = (active === true) ? "隱藏文章" : "繼續閱讀";

    return (
       <div className={styles.articleWrap}>
          <div className={styles.article}>
              <img src={imgURL}
                   className={styles.img}/>
              <div className={styles.articleTitle}>阿草放大鏡</div>
              <div className={styles.articleSubtitle}>數據背後，你可能不知道的事</div>
              {articlePreview}
              
              <div className={` ${styles.mainArticle} ${activeArticle}`}>{mainArticle}</div>
              
              <div className={styles.button}
                   onClick={this._toggleActive.bind(this)}>{buttonText}</div>

           </div>
       </div>
    )
  }
}
class MarriageEqualityPreview extends Component {
    render(){
      const styles = require('./IssueArticle.scss');
      return (
        <div className={styles.articleHeader}>
            <ul className={styles.hintList}>
              <li className={styles.hint}>民進黨就是支持婚姻平權，國民黨就是反對？</li>
              <li className={styles.hint}>國民黨立委席次比較多，那在立法院裡他們的聲音應該比較大吧？</li>
              <li className={styles.hint}>看起來支持方的表態次數比反對方多，那法案應該很容易通過吧？</li>
            </ul>
            <div>
                <p className={styles.paragraph}>你可能聽過婚姻平權，也可能聽過每年盛大的同志遊行，甚至看過新聞大篇幅報導今年6月美國邁向同性婚姻合法化的消息。那麼，在立法院內又是怎麼討論這個議題呢？</p>
                <p className={styles.paragraph}>讓阿草用數據破解你對於立法院的迷思！</p>
            </div>
        </div>
      )
    }
}
class MarriageEqualityContent extends Component {
  render(){
    const styles = require('./IssueArticle.scss');
    return (
      <div>
          <div className={styles.section}>
            <h1 className={styles.sectionTitle}>迷思一：民進黨就是支持婚姻平權，國民黨就是反對？</h1>
            <p className={styles.paragraph}>圖表中可以看到民進黨共有37筆表態紀錄，全都是支持，而國民黨則有9筆表態紀錄，以反對居多。這樣看起來標題的說法似乎沒錯？</p>
            <p className={styles.paragraph}>
              不過，民進黨其實只有28%的立委（即12位）曾經表態。更重要的是，婚姻平權法案交由司法法制委員會審查，屬於這個委員會的立委應該都有責任表態，但實際上
              <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("柯建銘")}/records/marriage-equality`}>柯建銘</Link>、
              <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("潘孟安")}/records/marriage-equality`}>潘孟安</Link>、
              <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("高志鵬")}/records/marriage-equality`}>高志鵬</Link>、
              <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("蔡其昌")}/records/marriage-equality`}>蔡其昌</Link>
              等這些曾經長期屬於司法委員會的資深立委，竟然對這個議題沒有過任何表態！既然沒有表態過，也就不能肯定他們都是支持或反對。因此，比較正確的說法應該是：
              <blockquote>「民進黨中有表態紀錄的立委都是支持，但不代表民進黨所有立委都是支持。」</blockquote>
            </p>

            <p className={styles.paragraph}>
              而國民黨立委的表態率也只有12%，8位立委，其中<Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("黃昭順")}/records/marriage-equality`}>黃昭順</Link>則曾經表態偏向支持。同時，在拒絕表態這件事上，國民黨立委也不落人後，其中
              <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("謝國樑")}/records/marriage-equality`}>謝國樑</Link>、
              <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("顏寬恆")}/records/marriage-equality`}>顏寬恆</Link>、
              <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("王廷升")}/records/marriage-equality`}>王廷升</Link>、
              <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("王惠美")}/records/marriage-equality`}>王惠美</Link>
              這幾位同樣是司法委員會中不表態的資深立委。
            </p>
            <p className={styles.paragraph}>正因各黨合計共有16位應表態卻沒有表態紀錄的立委，因此不應該只從表面結果就斷定民進黨支持、國民黨反對。關心這個議題的選民也許更應該關心，到底為什麼有這麼多立委沒有表態？這麼多「特別不關心」這個議題的立委，是否也對這個議題正反雙方凝聚共識上，造成什麼影響呢？</p>
          </div>

          <div className={styles.section}>
            <h1 className={styles.sectionTitle}>迷思二：國民黨立委席次比較多，那在立法院裡他們的聲音應該比較大吧？</h1>
            <p className={styles.paragraph}>在立法院中，立委總席次是國民黨65席：民進黨40席，就算只看司法法制委員會內的席次，長期以來都是國民黨9席，民進黨4席。可見國民黨有人數的絕對優勢，但是直接比較兩方發言討論這個議題的次數卻是國民黨9次：民進黨17次，顯然不成比例。也就是說，國民黨立委有著惜字如金的美德，或許他們不是想打混，只是想扮演好「沉默的多數」這個角色，但這樣的角色可能不太符合立委「為民喉舌」的形象</p>
            <p className={styles.paragraph}>
              說到這裡，你可能會反駁：不對吧！明明新聞中常看到
              <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("賴士葆")}/records/marriage-equality`}>賴士葆</Link>、
              <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("費鴻泰")}/records/marriage-equality`}>費鴻泰</Link>、
              <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("吳育昇")}/records/marriage-equality`}>吳育昇</Link>
              這些立委接受護家盟的陳情，堅定捍衛家庭價值。難道他們都沒有在立法院裡為這個議題發言嗎？
            </p>
            
            <p className={styles.paragraph}>
              殘酷的事實是，許多在媒體上公開表態支持護家盟理念的立委（其實不只上述三位立委，還包含了民進黨的<Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("劉櫂豪")}/records/marriage-equality`}>劉櫂豪</Link>立委），卻幾乎不曾在立法院內針對這個議題進行正反意見的交流和辯論，實在很可惜。我們強烈建議護家盟的朋友，應該去詢問這些立委，為什麼沒有在國會裡代表民意發聲？
            </p>


            <p className={styles.paragraph}>
                另一方面，由相關新聞或同志團體公布的訊息中，發現如
                <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("羅淑蕾")}/records/marriage-equality`}>羅淑蕾</Link>、
                <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("丁守中")}/records/marriage-equality`}>丁守中</Link>
                立委已轉變立場為支持同婚，或許也有其他國民黨立委是支持的態度，但是這些立場也沒有直接反映在他們的問政表現上。
            </p>

          </div>
          <div className={styles.section}>
            <h1 className={styles.sectionTitle}>迷思三：看起來支持方的表態次數比反對方多，那法案應該很容易通過吧？</h1>
            <p className={styles.paragraph}>
              由圖表來看，
              <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("尤美女")}/records/marriage-equality`}>尤美女</Link>
              可說是最關心這個議題的立委，總計提過兩次法案，主辦過兩次公聽會，四次發言紀錄，在這些方面的次數都是名列第一。此外，
              <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("蕭美琴")}/records/marriage-equality`}>蕭美琴(6)</Link>、
              <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("陳其邁")}/records/marriage-equality`}>陳其邁(4)</Link>、
              <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("段宜康")}/records/marriage-equality`}>段宜康(4)</Link>、
              <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("鄭麗君")}/records/marriage-equality`}>鄭麗君(3)</Link>、
              <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("林淑芬")}/records/marriage-equality`}>林淑芬(3)</Link>
              這些立委，雖然不是司法法制委員會的立委，但卻頻繁對這個議題表態(括號內為表態次數)，其中
              <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("陳其邁")}/records/marriage-equality`}>陳其邁</Link>、
              <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("段宜康")}/records/marriage-equality`}>段宜康</Link>
              更是兩度以審查預算方式來要求行政機關促成修法。上述這六位立委，占了將近四分之三的支持表態次數，可見他們的關心程度。而反對方的立委，則總共只有7位立委，且幾乎每個人都只有一次表態紀錄。
            </p>
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

class ReferendumPreview extends Component {
    render(){
      const styles = require('./IssueArticle.scss');
      return (
        <div className={styles.articleHeader}>
            <div className={styles.section}>
                <p className={styles.paragraph}>公民投票是人民直接行使權利的方式，向來被認為是民主國家的重要制度。台灣在2004年立法通過後，成為東亞第一個採行公投制度的國家。</p>
                <p className={styles.paragraph}>每當有社會重大爭議時，不管朝野藍綠，都曾經提出以公投解決問題的想法，如軍購案公投、入聯公投、ECFA公投、核四公投等等，但全國公投從來沒有一次真正成功進行。</p>
                <p className={styles.paragraph}>那麼，在台灣立法院內又是怎麼討論這個議題呢？讓阿草用數據告訴你立法院中公投法修法三大真相，誰說真相永遠只有一個？</p>
            </div>
        </div>
      )
    }
}
class ReferendumContent extends Component {
  render(){
    const styles = require('./IssueArticle.scss');
    return (
      <div>
          <div className={styles.section}>
              <h1 className={styles.sectionTitle}>真相一：不只是藍綠對決，其實是朝野政黨大亂鬥</h1>
              <p className={styles.paragraph}>大家常常會以為立法院是藍綠對決，但在公投法的討論上，實際上是朝野政黨的大亂鬥。圖表顯示有表態紀錄的立委總共51人，包含：</p>
              <blockquote>朝：國民黨13人<br/>
                          野：民進黨30人+台聯6人+親民黨2人</blockquote>
              <p className={styles.paragraph}>
                我們發現，在野黨非常關心這個議題，民進黨表態立委超過四分之三，其他兩個小黨台聯和親民黨的立委則全部參戰。更特別的是，這些在野黨立委全部都偏向贊成公投門檻下修的立場，國民黨立委則是落在模糊和反對的立場，朝野雙方壁壘分明。（編註：台聯慣例為「一席立委兩人輪替」，每人各擔任兩年，故台聯共3席立委有6人擔任過立委）
              </p>
              <p className={styles.paragraph}>
                另外統計發言次數，各黨分別是國民黨32次、民進黨43次、親民黨7次、台聯7次，雖然以席次的比例來看，國民黨的次數仍然偏少，但是差異並非十分懸殊，不過在野黨則都非常踴躍發言。
              </p>
              <blockquote>
                為什麼在野黨特別關心公投法這個議題？這可能是因為公投制度具有彌補代議政治不足的目的。
                <br/><br/>
                在代議制度下，立法院有時可能會制定出違反部分人民意志的法律或政策，而這時少數黨立委因為人數劣勢而不一定能在立法院中阻止通過，這時如果有完善的公投制度，就能透過全民作最終決定來避免這樣的問題。
              </blockquote> 
          </div>

          <div className={styles.section}>
              <h1 className={styles.sectionTitle}>真相二：國民黨模糊反對分不清，在野黨修法內容很分歧</h1>
              
              <p className={`${styles.paragraph} ${styles.paragraphIndent}`}>
                  <b>贊成方（民進黨）：</b>
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("陳其邁")}/records/referendum`}>陳其邁(7)</Link>、
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("段宜康")}/records/referendum`}>段宜康(7)</Link>、
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("姚文智")}/records/referendum`}>姚文智(7)</Link>、
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("尤美女")}/records/referendum`}>尤美女(7)</Link>、
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("李俊俋")}/records/referendum`}>李俊俋(6)</Link>、
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("鄭麗君")}/records/referendum`}>鄭麗君(5)</Link>
              </p>
              <p className={`${styles.paragraph} ${styles.paragraphIndent}`}>
                  <b>贊成方（親民黨）：</b>
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("李桐豪")}/records/referendum`}>李桐豪(5)</Link>
              </p>

              <p className={`${styles.paragraph} ${styles.paragraphIndent}`}>
                  <b>模糊方（國民黨）：</b>
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("吳育昇")}/records/referendum`}>吳育昇(6)</Link>、
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("邱文彥")}/records/referendum`}>邱文彥(5)</Link>
              </p>     
              
              <p className={`${styles.paragraph} ${styles.paragraphIndent}`}>
                  <b>反對方（國民黨）：</b>
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("張慶忠")}/records/referendum`}>張慶忠(5)</Link>
                  <br/>（括號內代表表態次數） 
              </p>
              
              <p className={styles.paragraph}>
                  以上這些可說是特別關心這個議題的立委，他們的表態次數合計60次，幾乎佔全部139次的一半。進一步分析他們各自的表態內容，我們發現兩個特點：
              </p>


              <h2 className={styles.sectionSubtitle}>(一)國民黨的發言偏向模糊，僅有少數明確的反對表態</h2>
              <p className={styles.paragraph}>
                  國民黨大多數立委並不會直接表明反對公投門檻下修，而是提出「我贊成調降，但是要再多討論...」、「門檻還是有他的意義...」、「要有嚴謹配套措施...」等等曖昧不明的用詞。
              </p>
              <p className={styles.paragraph}>
                  這種特有的說話技巧，讓人捉摸不清真實態度，這種類型的立委以
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("吳育昇")}/records/referendum`}>吳育昇</Link>為代表人物。少數像
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("張慶忠")}/records/referendum`}>張慶忠</Link>這類的立委則是完全不同，非常直率的表達出他對「高門檻」的堅持。
              </p>
              <p className={styles.paragraph}>
                  由於國民黨立委模糊和反對的意見交雜，很難具體看出國民黨的「黨意」到底是什麼。由於立法院開會時間有限，每個法案能被排案討論的機會都十分寶貴，模糊的發言常常導致會議時間延宕無結論、行政機關藉此得以「再討論研議」為由拖延進度，因此阻礙了修法實質上的討論，也無助於凝聚社會共識。
              </p>

              <h2 className={styles.sectionSubtitle}>(二)在野黨雖都偏向贊成，但是關注角度並不同</h2>
              <p className={styles.paragraph}>
                偏向贊成的在野黨，彼此也有很大的分歧。民進黨和台聯修法意見比較接近，但是台聯要求更低的門檻。
              </p>
              <p className={styles.paragraph}>
                另一方面，親民黨則特別著重在「年齡下降到18歲」，對於「降低提案、連署、投票門檻」的問題，則是在民進黨和國民黨之間擺盪，這點似乎也和社會大眾普遍對親民黨的理解相同。整體來說，在野黨修法內容和程度的分歧，是導致修法過程需要較多時間討論的可能原因。
              </p>  
          </div>

          <div className={styles.section}>
              <h1 className={styles.sectionTitle}>真相三：修法的關鍵在於席次分布</h1>

              <p className={styles.paragraph}>
                從2012年，第八屆立委剛上任時開始，就有許多公投法的修法草案陸續提出，但在內政委員會的審查過程並不順利，一直到2015年4月（立法院第八屆立委第七會期）才順利初審通過，送入二讀協商討論中。
              </p>

              <p className={styles.paragraph}>
                延宕兩年多，其中的原因是什麼？我們分析了這七個會期中內政委員會的席次分布，發現以下狀況：
              </p>


              <p className={styles.paragraph}>第一到四會期(2012~2013)：
                 <ul>
                    <li>執政黨 7 人</li>
                    <li>在野黨 6 人：民進黨4、台聯1、親民黨1</li>
                    <li>無黨籍 1 人</li>
                 </ul>
              </p>

              <p className={styles.paragraph}>第五到六會期(2014)：
                 <ul>
                    <li>執政黨 8 人</li>
                    <li>在野黨 6 人：民進黨5、台聯1</li>
                 </ul>
              </p>

              <p className={styles.paragraph}>第七會期(2015)：
                 <ul>
                    <li>執政黨 7 人</li>
                    <li>在野黨 7 人：民進黨5、台聯1、親民黨1</li>
                 </ul>
                 （編註：第五到六會期立法院爆發服貿爭議）
              </p>

              <p className={styles.paragraph}>
                可以發現第七會期最大的不同，是民進黨、台聯、親民黨合計7席，是歷來最多。（編註：第一到四會期的無黨籍立委為高金素梅）
              </p>
              <p className={styles.paragraph}>
                在野黨立委按照分工，一人擔任召委排案當主席，還有6席可以進行表決；這時，只要在野黨全部團結，除非國民黨立委全部出席，否則表決的控制權就掌握在在野黨陣營這邊。（編註：贊成反對數相同時，召委主席就可參與投票）
              </p>  
              <p className={styles.paragraph}>
                在這樣的背景下，國民黨對法案及議事的控制力最弱。2015年4月22日，公投法在內政委員會的審查，正是因為當天國民黨立委<Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("鄭天財Sra·Kacaw")}/records/referendum`}>鄭天財Sra·Kacaw</Link>請假未出席，形成國民黨：在野黨席次比為6：7的局勢，最後國民黨立委集體退席，終於初審通過。
              </p>
              <p className={styles.paragraph}>
                雖然還未正式修法通過，但這個例子說明法案在立法院委員會審查中，最關鍵的因素是委員會的席次分布。各黨立委如何運用席次的變化，進行結盟和合作，就是成功推動修法的關鍵。
              </p>    
          </div>


          <div className={styles.section}>
              <h1 className={styles.sectionTitle}>結論</h1>
              <p className={styles.paragraph}>
                  在野黨立委普遍非常關心公投法，修法過程也出現了在野黨團結對抗國民黨的現象。但在野黨立委的修法內容和程度也有分歧，民進黨和台聯接近，親民黨雖然偏向贊成，但在民進黨和國民黨之間擺盪。另一方面，國民黨立委大多數也不願明確表態，立場偏向模糊。這些表態紀錄正說明「公投門檻下修幾乎是共識，但修法進度卻十分緩慢」的結果。
              </p>
              <p className={styles.paragraph}>
                  公投法初審通過的關鍵，在於在野黨立委團結起來，利用委員會席次分布的變化，國民黨立委控制力最弱的時刻出擊。這是政黨及立委的策略，但對選民來說，這個例子說明的是：
              </p>
              <blockquote>
                  「如果你有關心的議題，請選出真正關心這些議題的立委，才能推動改革。」<br/><br/>
                  「怎麼判斷哪些立委真正關心這些議題？答案是關注他們的表態紀錄。」
              </blockquote>
          </div>



      </div>
    )
  }
}

class RecallPreview extends Component {
    render(){
      const styles = require('./IssueArticle.scss');
      return (
        <div className={styles.articleHeader}>
            <div className={styles.section}>
                <p className={styles.paragraph}>罷免權是人民收回當選官員權力的制度，美國光是2011年這一年當中，就舉行了150次罷免選舉，其中75位官員被罷免成功，9位官員自行辭職。但反觀台灣，針對立委提出的罷免，主要有三次，卻從來沒有成功過。</p>
                <ul>
                  <li>1994年，反核團體提出罷免擁核立委林志嘉、<Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("洪秀柱")}/records/recall`}>洪秀柱</Link>、詹裕仁、韓國瑜、魏鏞等5人，最後未達投票門檻而失敗。</li>
                  <li>2013年，憲法133實踐聯盟提出罷免吳育昇，最後未達連署門檻而失敗。</li>
                  <li>2015年，割闌尾計畫提出罷免蔡正元，最後未達投票門檻而失敗。</li>
                </ul>
                <p className={styles.paragraph}>
                  在立法院第八屆任期期間（2012年~2015年），就發生了兩次對立委的罷免行動，罷免可說是攸關立委個人去留的議題。那麼，在立法院內是怎麼討論罷免呢？
                  <br/>讓阿草用數據告訴你立法院裡的修法真相！
                </p>
            </div>
        </div>
      )
    }
}
class RecallContent extends Component {
  render(){
    const styles = require('./IssueArticle.scss');
    return (
      <div>
          <div className={styles.section}>
            <h1 className={styles.sectionTitle}>真相一、藍綠正反對決，親民黨游移不表態</h1>
            <p className={styles.paragraph}>憲法明定人民有選舉、罷免、創制、複決的權利，後兩者屬於公投議題，且公投和罷免的修法都分配到內政委員會中審查，因此近年來兩者經常被一起討論。</p>
            <p className={styles.paragraph}>但比較兩者在立法院內的紀錄，卻發現罷免的表態人數和次數顯然都較少，立委很明顯比較不願意討論罷免。即使有門檻下修的提案，大部分都卡在程序委員會，甚至連討論機會都沒有。這些現象可能說明的是：</p>
            <blockquote>「因為罷免門檻下修將使罷免更容易成功，直接影響立委個人權利。」</blockquote>

            <p className={styles.paragraph}>另外，公投門檻下修幾乎是在野黨共識，連大多數國民黨立委都只有抱持模糊態度而未明確反對。相比之下，對於罷免門檻下修的問題，各黨意見則有很大的歧異。</p>
            <p className={styles.paragraph}>民進黨及台聯當中有表態的紀錄都是高度贊成（但民進黨立委也有將近一半沒有表態），許多國民黨立委則勇於表達反對立場，親民黨立委則繼續游移在國民黨和民進黨之間，幾乎完全不表態，只有一則立場模糊的發言。</p>
            <p className={styles.paragraph}>因為這些強烈反對和不表態的立委，導致雖然贊成門檻下修的表態比反對多，卻距離修法通過仍然非常遙遠。</p>
             
            <p className={styles.paragraph}>值得關注的是，我們發現三位身為內政委員會的立委，卻都沒有對公投和罷免這兩個議題有任何表態，他們分別是：
               <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("林滄敏")}/records/recall`}>林滄敏</Link>、
               <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("高金素梅")}/records/recall`}>高金素梅</Link>、
               <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("張曉風")}/records/recall`}>張曉風</Link>。
               其中張曉風擔任立委一年就自請辭職，或許還可以理解原因，但其他兩位就很難解釋了。
            </p>
          </div>

          <div className={styles.section}>
            <h1 className={styles.sectionTitle}>真相二、人性衝突，被罷免立委的真實反應？</h1>
            <p className={styles.paragraph}>
              由於立法院第八屆任期期間，民間提出許多罷免立委的行動，因此立院的表態紀錄也成為觀察立委人性衝突的最佳範本。經過分析整理，我們發現被罷免的立委有以下這幾種類型：
            </p>

            <h2 className={styles.sectionSubtitle}>(一)訴苦型：<Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("張慶忠")}/records/recall`}>張慶忠</Link>立委</h2>
            <p className={styles.paragraph}>面對可能會被罷免，張慶忠立委訴苦：
              <blockquote>「如果沒有門檻的話，我們可能每天都會被罷免，罷免除了過不過的問題之外，那種感覺、感受很不好...」</blockquote>
            </p>
 
            <h2 className={styles.sectionSubtitle}>(二)惱怒嗆聲型：<Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("蔡正元")}/records/recall`}>蔡正元</Link>立委</h2>
            <p className={styles.paragraph}>蔡正元立委則是惱怒，甚至在主題完全無關罷免的會議上兩度嗆聲：
              <blockquote>「跟那些什麼爛花一起搞要罷免我，明明講好了，不管法律對不對都要遵守，最起碼媒體不准宣傳，我也沒有宣傳罷免活動啊！要宣傳我會輸他嗎？」<br/><br/>
                          「我是所謂割「藍尾」名單第一名，我告訴你，我不怕。」</blockquote>
            </p>

            <h2 className={styles.sectionSubtitle}>(三)另外提案修法型：<Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("吳育昇")}/records/recall`}>吳育昇</Link>立委</h2>
            <p className={styles.paragraph}>相比之下，吳育昇立委則展現了過人的風度，完全沒有在發言時訴苦或惱怒，而是另外提出了法案，要求罷免連署要附切結書及身分證影本，變相加高罷免難度。2013年11月29日，國民黨團利用人數優勢將這個法案逕付二讀，當時正好吳育昇立委被提出罷免，因此被民進黨立委稱作「吳育昇條款」。</p>
            <p className={styles.paragraph}>事實上，過去二十年來罷免制度曾經出現重大的修法，就是1994年洪秀柱等立委面對被罷免的危機時，主動提出修法，大幅提高提案、連署門檻，也將投票門檻從三分之一提高到二分之一。在官位受到威脅時，洪秀柱及吳育昇立委的作法非常「符合人性」，但是否「符合民意」？那就是另一個問題了。</p>

          </div>  

          <div className={styles.section}>
            <h1 className={styles.sectionTitle}>結論</h1>
            <p className={styles.paragraph}>
                相較於其他議題，罷免因為涉及立委個人權利而較少得到討論的機會，就算有也很容易被認為針對特定立委而模糊焦點。
            </p>
            <p className={styles.paragraph}>
                關於罷免門檻下修的議題，國民黨立委大多表達強烈反對、親民黨立委幾乎不表態，僅有民進黨及台聯立委：
                <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("李俊俋")}/records/recall`}>李俊俋(8)</Link>、
                <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("陳其邁")}/records/recall`}>陳其邁(5)</Link>、
                <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("陳亭妃")}/records/recall`}>陳亭妃(5)</Link>、
                <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("姚文智")}/records/recall`}>姚文智(4)</Link>、
                <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("蘇震清")}/records/recall`}>蘇震清(4)</Link>
                這幾位立委「違反人性」頻繁表達贊成（括號內為表態次數）。在這樣的背景下，這屆立法院任期之間要通過相關修法，幾乎是不可能的任務。
            </p>
            <p className={styles.paragraph}>     
                幾位之前被提出罷免的立委，都在尋求連任中。在保住自己官位的「人性衝突」下，要如何同時說服選民自己高舉「代表民意」的旗幟？不但考驗立委，更考驗選民的智慧。
            </p>
            <p className={styles.paragraph}>    
                另一個值得觀察的重點，如果2016選後民進黨取得新國會最大黨地位，是否會繼續維持現在偏向贊成罷免門檻下修的表態，而促成修法？
            </p>
            <p className={styles.paragraph}>     
                隨著現在公民意識的提升，未來針對不適任立委提出的罷免，應該會更加頻繁，討論也會更熱烈。到底在新國會中，罷免門檻下修會完成修法，還是像過去經驗反而加高呢？這就有賴關心這個議題的選民，依照這些表態紀錄，選擇真正關心這個議題並願意表態的立委了。
            </p>
          </div>
          
      </div>
    )
  }
}

class NuclearPowerPreview extends Component {
    render(){
      const styles = require('./IssueArticle.scss');
      return (
        <div className={styles.articleHeader}>
            <div className={styles.section}>
                <p className={styles.paragraph}>核四工程興建案，是台灣史上最具爭議的公共工程，耗費2,838億元的預算，卻一度停工再復工，最終在2014年4月27日宣布封存停工。這個工程引發社會各界激辯，從核四的工程品質、核廢料貯存問題、核一二三是否延役到經濟發展、核能綠能之間的取捨等等，都是各種熱議話題。</p>
                <p className={styles.paragraph}>那麼，在立法院內又是怎麼討論這個議題呢？讓阿草用數據告訴你，核四在立法院第八屆任期中，所創下的三大「歷史之最」！</p>
            </div>
            <ul className={styles.hintList}>
                <li className={styles.est}>立委角色最複雜</li>
                <li className={styles.est}>最多立委參戰、最多次表態</li>
                <li className={styles.est}>最常提到的話──沒有核安，就沒有核電</li>
            </ul>
        </div>
      )
    }
}
class NuclearPowerContent extends Component {
  render(){
    const styles = require('./IssueArticle.scss');
    return (
      <div>
          <div className={styles.section}>
              <h1 className={styles.sectionTitle}>一、立委角色最複雜</h1>
              <p className={styles.paragraph}>因為核四這個議題牽涉的問題層面實在太廣，相比其他議題，每位立委的行為模式更多元複雜。經過分析，我們發現全體立委可以分成以下幾個類型：</p>
          </div>
          
          <div className={styles.section}>  
              <h2 className={styles.sectionSubtitle}>(一)停建代言人型</h2>
              <p className={styles.paragraph}>按照表態次數，以下這13人堪稱停建代言人（括號內為表態次數，由高到低排列）：</p>
              <p className={styles.paragraph}>
                 <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("田秋堇")}/records/nuclear-power`}>田秋堇(27)</Link>、
                 <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("林佳龍")}/records/nuclear-power`}>林佳龍(21)</Link>、
                 <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("蘇震清")}/records/nuclear-power`}>蘇震清(21)</Link>、
                 <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("丁守中")}/records/nuclear-power`}>丁守中(21)</Link>、
                 <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("邱志偉")}/records/nuclear-power`}>邱志偉(20)</Link>、
                 <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("陳明文")}/records/nuclear-power`}>陳明文(20)</Link>、
                 <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("許添財")}/records/nuclear-power`}>許添財(20)</Link>、
                 <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("陳歐珀")}/records/nuclear-power`}>陳歐珀(20)</Link>、
                 <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("林岱樺")}/records/nuclear-power`}>林岱樺(19)</Link>、
                 <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("高志鵬")}/records/nuclear-power`}>高志鵬(19)</Link>、
                 <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("黃偉哲")}/records/nuclear-power`}>黃偉哲(19)</Link>、
                 <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("鄭麗君")}/records/nuclear-power`}>鄭麗君(18)</Link>、
                 <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("尤美女")}/records/nuclear-power`}>尤美女(18)</Link>
              </p>

              <p className={styles.paragraph}>這13人往往十分積極，在各種機會表達對核四的看法，而且幾乎不只反對核四，更是反對核能，這其中以<Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("田秋堇")}/records/nuclear-power`}>田秋堇</Link>為最具代表性。<Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("丁守中")}/records/nuclear-power`}>丁守中</Link>則是唯一非民進黨的特例，關於他的狀況，會在後面詳細說明。</p>
              <p className={styles.paragraph}><Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("黃偉哲")}/records/nuclear-power`}>黃偉哲</Link>則是另一個特殊的狀況，他的19筆紀錄中，有6筆模糊，這個比例是所有贊成停建的立委中最高的。黃偉哲主要贊成停建的表態都是透過表決，而不是發言。</p>
              <p className={styles.paragraph}>再仔細分析，會發現黃偉哲的發言主要都是模糊的，到底為什麼他發言時都不會直接表現出停建核四的態度呢？這是另一個值得再深入思考的問題。</p>
          </div>

          <div className={styles.section}> 
              <h2 className={styles.sectionSubtitle}>(二)力挺核四型</h2>
              <p className={styles.paragraph}>相對停建方的主將13人，發現反對停建中只有6人：</p>
              <p className={styles.paragraph}>
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("廖國棟")}/records/nuclear-power`}>廖國棟(21)</Link>、
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("楊瓊瓔")}/records/nuclear-power`}>楊瓊瓔(20)</Link>、
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("徐耀昌")}/records/nuclear-power`}>徐耀昌(19)</Link>、
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("簡東明")}/records/nuclear-power`}>簡東明(19)</Link>、
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("黃昭順")}/records/nuclear-power`}>黃昭順(19)</Link>、
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("潘維剛")}/records/nuclear-power`}>潘維剛(18)</Link>
              </p>

              <p className={styles.paragraph}>
                這其中<Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("廖國棟")}/records/nuclear-power`}>廖國棟</Link>、<Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("簡東明")}/records/nuclear-power`}>簡東明</Link>都是原住民立委，所以雖然表決時總是按黨意投票，但發言時往往特別關注核廢料在原住民居住區域貯存的問題，而非直接討論核四是否要停建。
              </p>
              <p className={styles.paragraph}>
                <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("黃昭順")}/records/nuclear-power`}>黃昭順</Link>則是非常特別的挺核派，雖然她的19筆紀錄中有5筆贊成停建，甚至曾經直接表態無法支持核四的預算，但她的12次表決卻從來沒有跑票過，全都是反對停建，堪稱心口不一的代表人物。
              </p>
          </div>

          <div className={styles.section}> 
              <h2 className={styles.sectionSubtitle}>(三)模糊不清型</h2>
              <p className={styles.paragraph}>
                  在所有模糊不清的立委中，我們發現兩個代表人物：<Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("李慶華")}/records/nuclear-power`}>李慶華(20)</Link>、<Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("李桐豪")}/records/nuclear-power`}>李桐豪(19)</Link>。他們表態次數雖然都不少，顯示相當關心這個議題，但發言內容常常模稜兩可，主要都繞著核四安全的問題打轉，而未明講是否支持核四停建。
              </p>

              <p className={styles.paragraph}>
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("李慶華")}/records/nuclear-power`}>李慶華</Link>是最特殊的例子，他曾在2013年3月8日直接表態：「我主張核四停建並且不要運轉」，不過其他發言卻都鬼打牆，在表決上更是十分逃避，一直都沒投票。直到2014年5月9日，立場才開始清楚起來，並投下「贊成停建」票。
              </p>
              <p className={styles.paragraph}>
                  不過，當時總統馬英九已宣布核四封存。或許可以這麼推論，<Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("李慶華")}/records/nuclear-power`}>李慶華</Link>一直想表態贊成停建，但是國民黨的黨紀處分如一隻看不見的手綁住他，直到大局底定，他才勇於面對自己的真心。
              </p>
          </div>

          <div className={styles.section}> 
              <h2 className={styles.sectionSubtitle}>(四)立場轉變型</h2>
              <p className={styles.paragraph}>我們發現全部立委中有三人公開發言，表明自己改變立場成為贊成停建核四：</p>

              <p className={styles.paragraph}>
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("丁守中")}/records/nuclear-power`}>丁守中(21)</Link>、
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("黃昭順")}/records/nuclear-power`}>黃昭順(19)</Link>、
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("羅淑蕾")}/records/nuclear-power`}>羅淑蕾(14)</Link>
              </p>

              <p className={styles.paragraph}>
                  前面說明過，<Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("黃昭順")}/records/nuclear-power`}>黃昭順</Link>是個心口不一的擁核派，雖然嘴巴上說贊成停建核四，但是表決時卻一直都是投下反對票，從來沒有改變過立場。
              </p>

              <p className={styles.paragraph}>
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("羅淑蕾")}/records/nuclear-power`}>羅淑蕾</Link>則和<Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("李慶華")}/records/nuclear-power`}>李慶華</Link>類似，原先在表決上的立場為反對停建核四；但到2014年5月7日（總統馬英九宣布核四封存）大局底定後，便在發言和表決上改變立場。
              </p>

              <p className={styles.paragraph}>
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("丁守中")}/records/nuclear-power`}>丁守中</Link>是唯一不是因為總統馬英九宣布「核四封存」，就自行改變立場，並在爭論不斷時就以表決違抗黨意的立委。他從2013年就開始正式表態反對核四，甚至在2014年3月10日發言：
              </p>
              <blockquote>「我從2011年開始反核四，為了這件事情，我在黨團的投票裡面，不知道被罰了多少錢...」</blockquote>
              <p className={styles.paragraph}>不只表態反對核四，更揭露為此受黨紀罰款的事。在表決上也從2012年開始就投過贊成停建票，因此成為贊成停建方中，唯一的國民黨立委。</p>

          </div>

          <div className={styles.section}> 
              <h2 className={styles.sectionSubtitle}>(五)投票部隊型</h2>
              <p className={styles.paragraph}>
                  前四種類型的立委，是這個議題舉足輕重的人物。接下來這種類型很特別，對議題幾乎沒有什麼發言，但是表決時會出現按鈴投票，有如人體橡皮圖章，只有投票的功用，看不出真正的想法，這樣的立委可以被稱為「投票部隊」。
              </p>
              <p className={styles.paragraph}>
                  由於有12次表決，每位立委至少應該有12次表態紀錄。我們計算表態紀錄在12或13次的立委（只有表決，很少發言說明看法），民進黨有9位，約占民進黨總人數的四分之一；國民黨則高達38位，超過國民黨總人數的一半！這裡因為人數眾多，就不逐一列名，對這個議題有興趣的選民，可以好好看看到底是哪些立委，得了這種不太喜歡說話的病。
              </p>
          </div>

          <div className={styles.section}> 
              <h2 className={styles.sectionSubtitle}>(六)不去投票型</h2>
              <p className={styles.paragraph}>
                  立委應該為民喉舌，在發言和表決時表達他的價值主張。如果一個立委像前者這樣的表決部隊，應該受到批判，那麼接下來這種連投票都懶得投的立委，就根本沒有存在感了。
              </p>

              <p className={styles.paragraph}>
                  我們發現，
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("王金平")}/records/nuclear-power`}>王金平</Link>、
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("洪秀柱")}/records/nuclear-power`}>洪秀柱</Link>、
                  <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("高金素梅")}/records/nuclear-power`}>高金素梅</Link>
                  就是這樣的類型。王金平和洪秀柱，或許還可以解釋是為了當主席主持會議，所以無法參與投票。但高金素梅就相當匪夷所思了，對於核四總共12次表決，竟然從來不去投票！一次都沒有！連投票都沒有，要怎麼為民喉舌呢？建議原住民朋友可以好好瞭解高金素梅的表現。
              </p>
          </div>

          <div className={styles.section}> 
              <h2 className={styles.sectionSubtitle}>(七)人格分裂型</h2>
              <p className={styles.paragraph}>
                 最後特別要介紹的是，<Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("羅明才")}/records/nuclear-power`}>羅明才</Link>的行為模式也是類似表決部隊，從來不發言說出他的看法，我們也只能從他的表決紀錄推論。但他不同於一般表決部隊只會投一種立場，而是分別投贊成4次/沒投票5次/反對3次。也就是說，羅委員內心中彷彿有三個立場的人，每次投票時就天人交戰，堪稱最糾結的人格分裂型，也讓選民永遠無法得知羅委員的真實想法。
              </p>
          </div>
 


          <div className={styles.section}>
              <h1 className={styles.sectionTitle}>二、最多立委參戰、最多次表態</h1>
              <p className={styles.paragraph}>
                核四因為爭議不斷，經常成為各黨立委發言焦點，也變成全體表決大戰。核四在第八屆立院中總共進行12次表決（請記得這個數字，很重要！），因此除了2015年2月立委補選的五位立委之外，幾乎每位立委都對核四表態過，這造就核四成為最多立委參戰的議題。
              </p>
              <p className={styles.paragraph}>
                因為有這12次表決，幾乎每位立委都對核四至少會有12次的表態紀錄，因此有高達1,341次的表決次數！再加上其他發言和提案，整個核四總計1,632次的表態紀錄！這是公投的11倍、罷免的16倍，甚至是婚姻平權的34倍之多！
              </p>

              <blockquote>由此可知，核四可說是第八屆立院中表態紀錄最多、最完整的議題。</blockquote>

              <p className={styles.paragraph}>
                透過核四的表態結果，分析各政黨在整個立院中的輪廓，也會發現十分接近社會大眾對立院的想像。民進黨和台聯都有90%左右站在停建核四的立場，國民黨則有74%反對停建，親民黨則一如以往在國民黨和民進黨之間擺盪，一半贊成、一半模糊。
              </p>  
              <p className={styles.paragraph}>
                值得注意的是，國民黨內也有一部分模糊、甚至是贊成停建的表現，這是否可以推論為國民黨的整體反對態勢，其實已有鬆動現象？甚至這可能是後來核四封存決議的原因嗎？這值得進一步分析實際表態內容。
              </p>
              <p className={styles.paragraph}>
                另外，<Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("徐欣瑩")}/records/nuclear-power`}>徐欣瑩</Link>在國民黨黨籍時，整體表態都偏向反對停建核四。那麼在2015年她另外籌組民國黨以後，她的想法是否就代表民國黨的立場呢？關心核能問題的朋友別忘了瞭解徐欣瑩立委對核四的態度。
              </p>
          </div>
 

           <div className={styles.section}>
              <h1 className={styles.sectionTitle}>三、最常提到的話：沒有核安，就沒有核電</h1>
              <p className={styles.paragraph}>
                在整個核四的討論過程中，最常被指出的一個爭論就是核安，尤其是核四本身的工程安全問題。贊成停建的論述中，多數都是以實際案例指出核四本身不安全的問題，也有部分直接論述核能就是不安全的能源，例如：
              </p>

              <blockquote>
                <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("李昆澤")}/records/nuclear-power`}>李昆澤</Link>：「核四從招標到興建發生的索賄案件高達 44 件，我們能祈求核四安全嗎？再者，核四由統包變成分包、監察院對核四提出 1,500 項變更設計的糾正、原能會也提出核四廠變更 700 項核安設計，我們能夠祈求核四安全嗎？」
              </blockquote>

              <blockquote>
                <Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("葉宜津")}/records/nuclear-power`}>葉宜津</Link>：「作為一個媽媽，我們堅決反對核電，堅決主張台灣不應該使用核電。我們主張節約用電，去尋找替代能源，我們甚至寧可被限電也要主張 不該把遺害萬年的禍害核廢料留給我們的後代。」
              </blockquote>

              <p className={styles.paragraph}>
                相對而言，反對停建方對於核安的論述，卻通常過於簡單，只重複強調「沒有核安，就沒有核能（核電、核四）」，例如：
              </p>

              <blockquote><Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("徐耀昌")}/records/nuclear-power`}>徐耀昌</Link>：「我個人非常認同要有核安才會有核四，也只有這樣相輔相成之下，大家才能很安心的讓核四動起來。」</blockquote>
              <blockquote><Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("王育敏")}/records/nuclear-power`}>王育敏</Link>：「大家的共識是沒有安全的核能，核四就不能商轉，這是全國共識。」</blockquote>
              <blockquote><Link className={`${styles.peopleLink} ${styles.ia} ${styles.bright}`} to={`/people/${people_name2id("楊瓊瓔")}/records/nuclear-power`}>楊瓊瓔</Link>：「大家都是基於關心的立場，也希望台灣的經濟能夠成長，在這方面電是非常重要的，但核安是核能的基本條件。」</blockquote>

              <p className={styles.paragraph}>
                  由這些發言可以發現，其實最常說「沒有核安，就沒有核能」的立委，往往會在之後接著提到「不能再爭吵反核四，還是要考慮經濟發展」、「沒有核四就會電價上漲」等等反對停建核四的說法。所以雖然這些發言看起來立場模糊，但從他們表決上都偏向反對停建核四的投票行為來看，似乎對他們來說「經濟發展」更重要，而「核安」淪為口號。
              </p>
              <p className={styles.paragraph}>這
                  樣的情形大量出現在國民黨或親民黨的模糊發言中，成為整個討論過程中最常出現的用語，但對於核四沒有辦法有效辯護，而僅是空洞口號，可能就是社會輿論風向整體偏向不信任核四安全的原因。
              </p>
          </div>

          <div className={styles.section}>
              <h1 className={styles.sectionTitle}>結論</h1>
              <blockquote>凝聚社會共識、進而解決問題，需要更多更完整的論述和表態。</blockquote>
              <p className={styles.paragraph}>
                由於核四是表態立委最多、表態紀錄最完整的議題，可說是各議題在立院中討論過程的縮影。真正對一個議題比較關心也比較多論述的立委，大概不到全體人數的20%，而在重大爭議的議題上，往往需要更多委員、更頻繁的發言或表態，才能凝聚共識、解決問題。
              </p>
              <p className={styles.paragraph}>
                以核四為例，即使是贊成停建方的立委頻繁排案討論，並有許多完整的表態發言，甚至發動高達12次的表決，在第八屆中仍然要經過兩年多才能促成封存停工的共識，可見其困難程度。
              </p>
              <blockquote>另一方面，高達一半的立委立場模糊或甚至不發言，也是造成難以凝聚共識而法案停滯的原因之一。</blockquote>

              <p className={styles.paragraph}>
                民主政治最重要的是溝通協調、異中求同。許多立委發言模糊，沒有針對問題提出具體建設性的討論，只有「沒有核安，就沒有核能」這類空洞口號的發言，經常導致焦點模糊而無法凝聚共識，也造成時間延宕、浪費立法院寶貴的排案討論機會。
              </p>
              <p className={styles.paragraph}>
                而另一個對議題討論沒有幫助的族群則是「不發言」的立委，贊成或反對的投票往往看不出具體理由，也就無法溝通討論。兩者相加起來甚至高達全體一半的立委人數，可能也是立法院議事效率、法案停滯的原因。
              </p>

              <blockquote>表決很重要，即使沒有通過法案，至少留下表態紀錄，才能監督立院。</blockquote>
              <p className={styles.paragraph}>
                相對其他議題，核四最特別的一點，在於在野黨提出大量的表決提案。雖然表決實際上都沒有通過，但至少使前述都不發言的立委留下表態紀錄，才能檢視立院運作的問題。因此，對於未來任何的國會少數黨來說，除了任何的協商運作外，也許透過公開表決等方式迫使全體立委表態，也是一個可以考慮的手段。
              </p>
              <p className={styles.paragraph}>
                不過，對選民來說，這些表態紀錄真正重要的價值在於，有具體證據說明立委的態度和作為。不論你贊成或反對核四停建，未來都可能再有變化，因此最重要的是：
              </p>

              <blockquote>「依據你關心議題的表態紀錄，投票時選擇真正代表你態度的候選人！」</blockquote>
          </div>

      </div>
    )
  }
}

