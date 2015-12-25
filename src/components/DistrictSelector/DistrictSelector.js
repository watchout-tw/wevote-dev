import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import district2eng from '../../utils/district2eng'

export default class DistrictSelector extends Component {
  constructor(props){ super(props)
    this.state = {
        topMenuValue: "",
        bottomMenuValue: 1
    }
  }
  _onSelectTopMenu(event){
    let node = this.refs.topMenu.getDOMNode();
    this.setState({
        topMenuValue: node.value
    })
  }
  _onSelectBottomMenu(event){
    let node = this.refs.bottomMenu.getDOMNode();
    this.setState({
        bottomMenuValue: node.value
    })
  }
  _onGo(){
    let {topMenuValue, bottomMenuValue} = this.state;
    

    console.log(`${topMenuValue}第${bottomMenuValue}`);

  }
  render() {
    const styles = require('./DistrictSelector.scss');
    const {topMenuValue, bottomMenuValue} = this.state;

    let topMenuOptions = districtData.district.map((value, index)=>{
      return (
        <option value={value} key={`topMenu${index}`}
                className={styles.option}>{value}</option>
      )
    });

    let bottomMenuOptions;
    if(topMenuValue && districtData.eleDistrict[topMenuValue]){
      bottomMenuOptions = districtData.eleDistrict[topMenuValue].map((value, index)=>{
          return (
            <option value={index+1} key={`bottomMenu${index}`}
                    className={styles.option}>{value}</option>
          )
      });
    }

    let goButton;
    if(topMenuValue && topMenuValue!=='請選擇'){
        goButton = (
          <div className={styles.buttonWrap}>
              <Link to={`/constituencies/${district2eng(topMenuValue)}/${bottomMenuValue}/`} 
                    className={styles.button}>GO</Link>
          </div>
        )
    }
  
    return (
        <div className={styles.wrap}>
            <select onChange={this._onSelectTopMenu.bind(this)} ref="topMenu"
                    className={styles.selector}>
                <option className={styles.option}>請選擇</option>
                {topMenuOptions}
            </select>
            <select onChange={this._onSelectBottomMenu.bind(this)} ref="bottomMenu"
                    className={styles.selector}>
                {bottomMenuOptions}
            </select>
            {goButton}
        </div>    
    )
  }

  props = {
    className: 'DistrictSelector'
  }
}

//目前測試使用，桃園的鄉應該都要改成區，如果要用
const districtData = {
  "district":["臺北市","新北市","桃園市","臺中市","臺南市","高雄市","基隆市","新竹市","新竹縣","苗栗縣","南投縣","嘉義縣","嘉義市","雲林縣","彰化縣","屏東縣","宜蘭縣","花蓮縣","臺東縣", "金門縣","澎湖縣","連江縣","平地原住民","山地原住民"],
  "eleDistrict":{
    "基隆市":["全市"],
    "臺北市":["士林、北投區","大同、士林區","中山、松山區","內湖、南港區","萬華、中正區","大安區","松山、信義區","中正、文山區"],
    "新北市":["泰山區、八里區、淡水區、林口區、石門區、三芝區","三重區、蘆洲區、五股區","三重區","新莊區","鶯歌區、新莊區、樹林區","板橋西區65里","板橋東區61里","中和區76里","永和、中和秀安地區","土城區、三峽區","新店區、深坑區、石碇區、坪林區、烏來區","金山區、萬里區、汐止區、平溪區、瑞芳區、雙溪區、貢寮區"],
    "桃園市":["蘆竹區、龜山區、桃園區11里","新屋區、楊梅區、觀音區、大園區","中壢區73里","桃園區65里","平鎮區、龍潭區","大溪區、八德區、復興區、中壢區12里"],
    "新竹縣":["全縣"],
    "新竹市":["全市"],
    "苗栗縣":["竹南鎮、造橋鄉、後龍鎮、西湖鄉、通霄鎮、銅鑼鄉、苑裡鎮、三義鄉","頭份鎮、三灣鄉、南庄鄉、苗栗市、頭屋鄉、獅潭鄉、公館鄉、大湖鄉、泰安鄉、卓蘭鎮"],
    "臺中市":["大甲區、大安區、外埔區、清水區、梧棲區","沙鹿鎮、龍井鄉、大肚鄉、烏日鄉、霧峰、大里市2里","后里區、神岡區、大雅區、潭子區","西屯區、南屯區","北屯區、北區","西區、中區、東區、南區","太平區、大里區25里","豐原區、石岡區、新社區、東勢區、和平區"],
    "彰化縣":["伸港鄉、線西鄉、和美鎮、鹿港鎮、福興鄉、秀水鄉","彰化市、花壇鄉、芬園鄉","芳苑鄉、二林鎮、埔鹽鄉、溪湖鎮、埔心鄉、大城鄉、竹塘鄉、埤頭鄉、北斗鎮、溪州鄉","大村鄉、員林鎮、永靖鄉、社頭鄉、田尾鄉、田中鎮、二水鄉"],
    "南投縣":["草屯鎮、國姓鄉、埔里鎮、仁愛鄉、中寮鄉、魚池鄉","南投市、名間鄉、集集鎮、竹山鎮、鹿谷鄉、水里鄉、信義鄉"],
    "雲林縣":["麥寮鄉、臺西鄉、東勢鄉、褒忠鄉、土庫鎮、虎尾鎮、四湖鄉、元長鄉、口湖鄉、水林鄉、北港鎮","崙背鄉、二崙鄉、西螺鎮、莿桐鄉、林內鄉、斗六市、大埤鄉、斗南鎮、古坑鄉"],
    "嘉義縣":["六腳鄉、東石鄉、朴子市、太保市、布袋鎮、義竹鄉、鹿草鄉、水上鄉","溪口鄉、大林鎮、梅山鄉、新港鄉、民雄鄉、竹崎鄉、中埔鄉、番路鄉、大埔鄉、阿里山鄉"],
    "嘉義市":["全市"],
    "臺南市":["後壁區、白河區、北門區、學甲區、鹽水區、新營區、柳營區、東山區、將軍區、下營區、六甲區、官田區","七股區、佳里區、麻豆區、善化區、大內區、玉井區、楠西區、西港區、安定區、新市區、山上區、新化區、左鎮區、南化區","安南區、北區、中西區","安平區、南區、東區","永康區、仁德區、歸仁區、關廟區、龍崎區"],
    "高雄市":["那瑪夏區、桃源區、甲仙區、內門區、杉林區、六龜區、阿蓮區、田寮區、旗山區、美濃區、茂林區、燕巢區、大社區、大樹區","茄萣區、湖內區、路竹區、永安區、岡山區、彌陀區、梓官區、橋頭區","楠梓區、左營區","仁武區、鳥松區、大寮區、林園區","鼓山區、鹽埕區、旗津區、三民區42里","三民區45里","前金區、新興區、苓雅區、前鎮區8里","鳳山區","前鎮區51里、小港區"],
    "屏東縣":["里港鄉、高樹鄉、霧臺鄉、九如鄉、鹽埔鄉、長治鄉、內埔鄉、瑪家鄉、泰武鄉、竹田鄉、萬巒鄉、潮州鎮三地門鄉","屏東市、麟洛鄉、萬丹鄉","新園鄉 崁頂鄉 南州鄉 新埤鄉 來義鄉 東港鎮、林邊鄉、佳冬鄉、枋寮鄉、春日鄉、枋山鄉、獅子鄉、牡丹鄉、車城鄉、滿州鄉、恆春鎮、琉球鄉"],
    "臺東縣":["全縣"],
    "花蓮縣":["全縣"],
    "宜蘭縣":["全縣"],
    "澎湖縣":["全縣"],
    "金門縣":["全縣"],
    "連江縣":["全縣"],
    "平地原住民":["全區"],
    "山地原住民":["全區"]
  }
}
