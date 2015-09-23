import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class Footer extends Component {
  
  constructor(props){ super(props)
    this.state = {
       showAlert: false
    }
  }
  _handleSubmit(value, event){
    
    let emailValue = document.getElementById("email-Primary").value;
    if(emailValue === ""){
        event.preventDefault();
        this.setState({
            showAlert: true
        })
    }
    
  }
  render() {
    
    const styles = require('./Footer.scss');
    const {showAlert} = this.state;
    let alertStyle = showAlert ? styles.showAlert : styles.hideAlert;
   
    return (
      <div className={styles.wrap}>
          <div className={styles.innerWrap}>
              <form action="http://crm.watchout.tw/civicrm/profile/create&amp;gid=10&amp;reset=1" 
            method="post" 
            name="Edit" 
            id="Edit">
        
            <div className={styles.title}>在新議題上線時，收到第一手的通知</div>
            <input name="postURL" type="hidden" value=""/>
            <input name="cancelURL" type="hidden" value="http://crm.watchout.tw/civicrm/profile?reset=1&amp;gid=10"/>
            <input name="add_to_group" type="hidden" value="10"/>
            <input name="_qf_default" type="hidden" value="Edit:cancel"/>
        
            <script type="text/javascript" src="http://crm.watchout.tw/sites/all/modules/civicrm/js/Common.js"></script>
            <div id="crm-container" lang="zh" xmlLang="zh"> 
                  <label className={styles.emailLabel}>e-mail<span className={styles.red}>*</span><span className={alertStyle}>必填資訊</span></label> 
                  <input maxLength="64" 
                         size="30" 
                         name="email-Primary" 
                         type="email" id="email-Primary" 
                         ref="emailInput"
                         className={styles.emailInput}/>
                  <input className={styles.submit}
                         name="_qf_Edit_next" 
                         value="訂閱電子報" 
                         type="submit" 
                         id="_qf_Edit_next"
                         onClick={this._handleSubmit.bind(this, null)}/>
                   
            </div>
            <div className={styles.lawInfo}>
                <div className={styles.lawInfoTitle}>請放心，你隨時可以取消。</div>
                <div className={styles.lawInfoContent}>依據個資法，關於個人資料蒐集、處理及利用聲明：使用本電子報訂閱視為瞭解及同意沃草公司進行您個人資料（email 資訊）之蒐集、處理及利用，除非取得您的同意或其他法令之特別規定，絕不會將您的個人資料提供給第三方或使用於電子報訂閱以外之其它用途。您隨時可來信取消此訂閱服務，經取消訂閱後，相關資料立即從訂閱資料庫中刪除。</div>
                <div className={styles.hideLinks}>
                  <Link to={`/subscribe/succeed`}>訂閱成功</Link>
                  <Link to={`/subscribe/error`}>訂閱失敗</Link>
                </div>
            </div>
                
              </form>
              <div className={styles.bottomInfo}>
                  <div>本網站採 CC-BY-NC-SA 授權</div>
                  <div>網站使用問題與合作建議，請聯絡：wevote@watchout.tw</div>
                  <div className={styles.rightFooterLinks}>
                      <Link to={`/about/`} className={styles.linkItem}>關於立委求職中</Link>
                      <Link to={`/about/FAQ`} className={styles.linkItem}>資料來源說明</Link>
                      <Link to={`/about/statement`} className={styles.linkItem}>著作權聲明</Link>
                      <Link to={`/clarify`} className={styles.linkItem}>立委澄清</Link>
                      <Link to={`/`} className={styles.linkItem}>回首頁</Link>
                  </div>
              </div>
          </div>

      </div>
    );
  }



 
}

