import React, {Component} from 'react';
import district2eng from '../../utils/district2eng';

const allCities = ['TPE','NTC','KEL','TYN','HCC','HSZ','ZMI','TXG','CHW','NAN','YLN','CYC','CYI','TNN','KHH','PIF','ILA','HUN','TTT','MZG','KNH','MFK','LAB','MAB'];

function getPosClass(pos){
  switch(pos){
    case "aye":
      return "aye";
    case "nay":
      return "nay";
    default:
      return "none";
  }
}
export default class ResultMap extends Component {
  _getDistrictPosition(area, areaNo){
    const {data} = this.props;
    const styles = require('./ResultMap.scss');
    
    if(data[area][areaNo]){
        let pos = getPosClass(data[area][areaNo].position);
        return `${styles[pos]} ${this._getDistrictActiveStyle(area, areaNo)}`;

    }else{//第八屆平地原住民第三位，林正二解職
        return `black ${this._getDistrictActiveStyle(area, areaNo)}`;
    }
    
  }
  
  _setActive(area, areaNo){
    const {setActive} = this.props;
    setActive(area,areaNo);
  }
  _getDistrictActiveStyle(area, areaNo){
    const styles = require('./ResultMap.scss');
    const {activeArea, activeAreaNo} = this.props;
    if(activeArea === area && activeAreaNo === areaNo){
        return styles.active;
    }else{
        return ""
    }
  }
 
  render() {
    const styles = require('./ResultMap.scss');
    const {title} = this.props;
   
    return (
<div className={styles.wrap}>

<h3>{title}</h3>

<svg x="0px" y="0px" viewBox="0 0 1400 1400">
<rect fill="#97FFF5" width="1400" height="1400"/>
<g id="districts">
  <path id="district-PIF-3" className={`${styles.district} ${this._getDistrictPosition('PIF','3')}`} 
        onMouseEnter={this._setActive.bind(this, 'PIF','3')}
        stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" d="M251.67,966.755
    l22.956-23.971l53.072,51.957l21.485-21.739l35.971,35.722l-8.334,8.178v34.989l-32.508,32.762v50.539l18.836,18.878l-26.963,26.92
    v23.28l-32.508,33.523h-11.174l-11.174,10.667v27.936h-8.127v-23.365l-22.194-22.194l-6.603,6.603l-7.774-7.774l16.762-16.762
    l-9.905-9.651l35.809-36.063v-70.602l6.095-6.603v-56.38l-33.523-33.523L251.67,966.755z M198.028,1013.288h14.899v-4.417
    l-6.765-6.765l-4.664,4.664v3.132h-3.471L198.028,1013.288L198.028,1013.288z"/>
  <polygon id="district-PIF-2" className={`${styles.district} ${this._getDistrictPosition('PIF','2')}`} 
           onMouseEnter={this._setActive.bind(this, 'PIF','2')}
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    274.415,942.573 321.116,896.464 340.249,896.464 340.249,925.924 317.392,949.289 296.567,949.289 288.994,956.861   "/>
  <polygon id="district-PIF-1" className={`${styles.district} ${this._getDistrictPosition('PIF','1')}`} 
           onMouseEnter={this._setActive.bind(this, 'PIF','1')}
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    321.116,896.464 313.854,889.37 353.709,849.734 365.645,861.925 417.454,861.925 417.454,878.179 444.883,878.179 
    469.517,902.559 494.66,902.559 494.66,934.051 458.258,969.606 424.565,969.606 385.301,1008.871 349.308,972.878 
    327.571,994.614 288.994,956.861 296.567,949.289 316.884,949.289 340.249,925.924 340.249,896.464   "/>
  <polygon id="district-KHH-9" className={`${styles.district} ${this._getDistrictPosition('KHH','9')}`} 
           onMouseEnter={this._setActive.bind(this, 'KHH','9')}
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    230.282,928.21 237.139,935.067 243.742,935.067 234.599,925.839 234.599,900.528 240.694,900.528 240.694,916.781 
    265.075,916.781 265.075,936.083 257.964,943.194 239.001,943.194 227.403,931.596   "/>
  <polygon id="district-KHH-8" className={`${styles.district} ${this._getDistrictPosition('KHH','8')}`} 
           onMouseEnter={this._setActive.bind(this, 'KHH','8')}
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    267.771,888.116 240.121,916.781 265.075,916.781 265.075,910.686 273.202,910.686 273.202,893.417   "/>
  <polygon id="district-KHH-7" className={`${styles.district} ${this._getDistrictPosition('KHH','7')}`} 
           onMouseEnter={this._setActive.bind(this, 'KHH','7')}
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    255.474,900.414 240.632,884.754 234.599,890.588 234.599,900.528 240.694,900.528 240.694,916.781   "/>
  <polygon id="district-KHH-6" className={`${styles.district} ${this._getDistrictPosition('KHH','6')}`} 
           onMouseEnter={this._setActive.bind(this, 'KHH','6')}
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    263.043,874.792 246.715,891.121 255.741,900.147 267.772,888.116 263.105,883.45  "/>
  <path id="district-KHH-5" className={`${styles.district} ${this._getDistrictPosition('KHH','5')}`} 
        onMouseEnter={this._setActive.bind(this, 'KHH','5')}
        stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" d="M246.856,890.979
    l-6.282-6.282l-4.3,4.3l-5.739-5.739v-13.1l8.163-8.105l18.598,18.709L246.856,890.979z M229.35,925.585v-37.248h-2.878v37.248
    H229.35z"/>
  <polygon id="district-KHH-4" className={`${styles.district} ${this._getDistrictPosition('KHH','4')}`} 
           onMouseEnter={this._setActive.bind(this, 'KHH','4')}
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    251.869,967.574 240.694,967.574 240.694,943.194 257.964,943.194 265.075,936.337 265.075,910.686 273.202,910.686 
    273.202,893.417 263.043,883.512 263.043,871.068 270.662,863.956 280.313,863.956 286.662,870.052 292.503,863.956 
    299.614,863.956 299.614,871.068 287.424,883.766 287.424,903.575 300.591,916.742   "/>
  <polygon id="district-KHH-3" className={`${styles.district} ${this._getDistrictPosition('KHH','3')}`}
           onMouseEnter={this._setActive.bind(this, 'KHH','3')}
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    242.163,865.538 250.853,856.337 250.853,843.639 264.059,843.639 277.265,856.507 277.265,863.956 270.352,863.956 
    263.043,871.068 263.043,875.131 257.354,880.82  "/>
  <polygon id="district-KHH-2" className={`${styles.district} ${this._getDistrictPosition('KHH','2')}`}
           onMouseEnter={this._setActive.bind(this, 'KHH','2')}
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    263.043,745.101 263.043,771.513 252.885,781.035 252.885,843.639 264.059,843.639 276.106,855.594 281.329,855.491 
    281.329,829.417 294.535,829.417 307.029,816.924 292.068,801.963 298.664,795.452 298.598,788.952 283.36,773.545 283.36,765.418 
      "/>
  <polygon id="district-KHH-1" className={`${styles.district} ${this._getDistrictPosition('KHH','1')}`} 
           onMouseEnter={this._setActive.bind(this, 'KHH','1')}
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    298.598,788.783 306.725,788.783 319.932,801.989 331.106,790.814 343.296,802.624 370.979,774.561 457.073,774.561 
    515.231,715.641 583.04,715.641 595.484,703.45 652.119,703.45 685.445,736.875 639.732,782.688 587.103,782.688 494.66,875.216 
    494.66,902.559 469.517,902.559 444.883,878.179 417.454,878.179 417.454,861.925 365.645,861.925 353.709,849.734 313.963,889.48 
    321.032,896.548 300.715,916.866 287.424,903.575 287.424,883.258 299.614,871.068 299.614,863.956 292.503,863.956 
    286.662,870.052 280.44,863.956 277.265,863.956 277.265,855.567 281.329,855.491 281.329,829.417 294.535,829.417 
    307.029,816.924 292.068,801.963 298.622,795.409   "/>
  <polygon id="district-TNN-5" className={`${styles.district} ${this._getDistrictPosition('TNN','5')}`} 
           onMouseEnter={this._setActive.bind(this, 'TNN','5')}
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    271.17,753.227 283.36,765.418 283.36,773.545 298.598,788.783 307.029,788.783 319.932,801.837 331.296,790.624 343.228,802.556 
    366.093,779.691 323.304,736.336 334.569,725.482 316.594,708.244 299.614,724.549 299.614,748.148 271.17,748.148  "/>
  <polygon id="district-TNN-4" className={`${styles.district} ${this._getDistrictPosition('TNN','4')}`} 
           onMouseEnter={this._setActive.bind(this, 'TNN','4')}
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    271.17,753.227 263.043,745.101 263.043,717.672 281.329,717.672 281.329,735.958 288.44,735.958 294.027,729.863 299.614,729.863 
    299.614,748.148 271.17,748.148  "/>
  <polygon id="district-TNN-3" className={`${styles.district} ${this._getDistrictPosition('TNN','3')}`} 
           onMouseEnter={this._setActive.bind(this, 'TNN','3')}
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    263.043,717.672 263.043,692.276 256.465,685.698 269.719,672.214 295.091,697.355 305.765,697.355 316.54,708.298 
    299.614,724.886 299.614,729.863 294.535,729.863 288.44,735.958 281.329,735.958 281.329,717.672  "/>
  <polygon id="district-TNN-2" className={`${styles.district} ${this._getDistrictPosition('TNN','2')}`} 
           onMouseEnter={this._setActive.bind(this, 'TNN','2')}
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    255.364,686.435 246.789,676.911 246.789,665.863 260.123,652.657 268.123,652.657 288.36,632.295 300.72,644.53 312.82,644.53 
    320.439,652.318 343.294,652.316 365.531,674.383 359.435,680.244 384.907,705.482 454.025,705.482 454.025,721.736 
    475.358,721.736 492.379,738.881 456.823,774.561 371.741,774.561 366.352,779.95 323.021,736.619 334.364,725.446 
    306.104,697.355 294.535,697.355 269.556,672.376   "/>
  <polygon id="district-TNN-1" className={`${styles.district} ${this._getDistrictPosition('TNN','1')}`} 
           onMouseEnter={this._setActive.bind(this, 'TNN','1')}
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    288.472,632.407 334.769,585.61 338.217,585.61 338.217,604.912 352.947,620.149 383.931,620.149 397.891,605.927 422.534,605.927 
    436.078,620.149 457.073,620.149 476.967,640.128 470.279,646.731 470.279,661.8 480.438,671.07 480.438,679.07 469.263,679.07 
    454.025,693.461 454.025,705.482 384.907,705.482 359.435,680.244 365.413,674.479 343.379,652.657 320.947,652.657 312.82,644.53 
    300.63,644.53   "/>
  <polygon id="district-CYI-2" className={`${styles.district} ${this._getDistrictPosition('CYI','2')}`} 
           onMouseEnter={this._setActive.bind(this, 'CYI','2')}
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    476.967,640.128 476.882,614.054 498.723,614.054 498.723,598.816 488.565,589.167 488.565,583.832 471.558,583.842 
    456.057,569.356 441.835,569.356 441.835,538.88 496.692,538.88 496.692,544.976 525.136,544.976 525.136,564.277 589.643,628.784 
    611.484,606.943 631.801,627.261 614.532,644.53 614.532,678.054 631.801,695.323 652.119,695.323 652.119,703.45 595.484,703.45 
    583.04,715.641 515.231,715.641 492.379,738.881 475.296,721.736 454.025,721.736 454.025,693.461 469.263,679.07 480.438,679.07 
    480.438,671.07 470.279,661.8 470.279,646.731  "/>
  <polygon id="district-CYI-1" className={`${styles.district} ${this._getDistrictPosition('CYI','1')}`} 
           onMouseEnter={this._setActive.bind(this, 'CYI','1')}
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    441.835,538.88 402.216,538.88 385.886,522.627 374.788,522.627 374.788,531.769 381.561,538.611 362.313,557.897 362.344,574.182 
    345.941,574.287 334.63,585.61 338.217,585.61 338.217,604.912 352.947,620.149 383.931,620.149 398.022,605.927 422.534,605.927 
    436.417,620.149 457.073,620.149 476.374,640.086 476.374,614.054 466.216,614.054 466.216,599.832 456.057,599.832 
    456.057,588.658 466.275,578.91 456.389,569.356 441.835,569.356  "/>
  <polygon id="district-YLN-2" className={`${styles.district} ${this._getDistrictPosition('YLN','2')}`} 
           onMouseEnter={this._setActive.bind(this, 'YLN','2')}
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    501.119,441.764 513.284,453.929 535.929,453.929 545.03,463.029 545.03,469.209 583.04,507.219 596.077,507.219 610.468,521.611 
    610.468,544.976 603.357,544.976 571.865,575.826 571.865,586.626 586.952,601.864 599.294,601.864 607.929,610.499 
    589.643,628.784 525.136,564.277 525.136,544.976 496.692,544.976 496.692,538.88 478.237,538.88 495.676,520.595 553.58,520.595 
    553.58,511.114 546.469,504.341 535.125,504.341 515.993,486.056 500.374,486.056 489.581,475.897 478.406,475.897 
    478.406,464.553   "/>
  <polygon id="district-YLN-1" className={`${styles.district} ${this._getDistrictPosition('YLN','1')}`} 
           onMouseEnter={this._setActive.bind(this, 'YLN','1')}
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    389.01,525.736 389.01,507.389 454.025,441.527 454.025,437.294 445.898,437.294 445.898,432.215 455.38,423.072 487.549,423.072 
    503.718,439.157 478.406,464.553 478.406,475.897 489.581,475.897 500.374,486.056 515.993,486.056 535.125,504.341 
    546.469,504.341 553.58,511.114 553.58,520.595 495.676,520.595 478.237,538.88 402.216,538.88   "/>
  <polygon id="district-NAN-2" className={`${styles.district} ${this._getDistrictPosition('NAN','2')}`} 
           onMouseEnter={this._setActive.bind(this, 'NAN','2')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    611.484,606.943 631.801,627.261 614.532,644.53 614.532,678.054 631.801,695.323 652.119,695.323 652.119,703.45 685.445,736.875 
    718.005,704.322 730.34,716.656 824.274,622.722 791.259,589.675 774.514,606.435 733.388,565.293 705.959,565.293 
    705.959,547.007 699.356,540.066 710.533,529.227 710.542,518.744 690.394,538.892 655.505,504.003 676.33,483.177 653.473,460.32 
    620.627,493.167 620.627,511.803 630.785,511.791 630.785,524.658 610.468,524.658 610.468,544.976 603.357,544.976 
    571.865,575.826 571.865,586.626 586.952,601.864 599.294,601.864 607.929,610.499   "/>
  <polygon id="district-NAN-1" className={`${styles.district} ${this._getDistrictPosition('NAN','1')}`} 
           onMouseEnter={this._setActive.bind(this, 'NAN','1')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    653.473,460.32 653.473,452.786 660.796,445.464 660.796,440.088 671.166,440.088 696.774,465.696 714.848,465.696 728.44,452.104 
    737.959,452.104 750.149,439.913 762.787,452.532 785.196,452.532 802.318,469.654 812.9,459.072 881.449,459.072 899.767,477.389 
    925.132,477.389 935.398,487.655 895.13,527.923 907.102,539.895 824.274,622.722 791.243,589.69 774.506,606.427 733.38,565.301 
    705.959,565.301 705.959,547.007 699.187,540.235 710.364,529.058 710.364,518.744 690.305,538.803 655.505,504.003 
    676.33,483.177  "/>
  <polygon id="district-CHW-4" className={`${styles.district} ${this._getDistrictPosition('CHW','4')}`} 
           onMouseEnter={this._setActive.bind(this, 'CHW','4')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    608.436,417.739 625.452,417.739 645.261,437.548 645.261,452.786 653.473,452.786 653.473,460.32 620.627,493.167 
    620.627,511.803 630.785,511.803 630.785,524.658 610.468,524.658 610.468,521.611 596.077,507.219 604.034,499.262 
    594.214,489.442 594.214,485.378 598.304,485.378 598.304,466.051 581.685,449.432 581.685,438.899 597.904,438.899 
    608.436,449.432 621.464,449.432 621.464,438.295 608.436,425.268   "/>
  <polygon id="district-CHW-3" className={`${styles.district} ${this._getDistrictPosition('CHW','3')}`} 
           onMouseEnter={this._setActive.bind(this, 'CHW','3')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    489.756,425.268 498.724,416.3 509.221,416.3 515.654,416.3 546.892,385.062 556.289,385.062 567.252,374.099 572.204,379.051 
    572.204,399.684 586.765,399.684 593.525,392.923 597.77,397.168 597.77,405.803 608.436,405.803 608.436,425.268 621.464,438.295 
    621.464,449.432 608.436,449.432 597.904,438.899 581.685,438.899 581.685,449.432 598.304,466.051 598.304,485.378 
    594.214,485.378 594.214,489.442 604.034,499.262 596.077,507.219 583.04,507.219 545.03,469.209 545.03,463.029 535.929,453.929 
    513.284,453.929 501.119,441.764 503.722,439.161   "/>
  <polygon id="district-CHW-2" className={`${styles.district} ${this._getDistrictPosition('CHW','2')}`} 
           onMouseEnter={this._setActive.bind(this, 'CHW','2')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    667.864,399.961 667.864,415.961 657.325,426.501 662.531,431.707 671.674,431.707 671.674,440.088 660.796,440.088 
    660.796,445.464 653.473,452.786 645.261,452.786 645.261,437.548 625.452,417.739 623.674,417.739 623.717,390.946 
    630.955,383.708 651.611,383.708   "/>
  <polygon id="district-CHW-1" className={`${styles.district} ${this._getDistrictPosition('CHW','1')}`} 
           onMouseEnter={this._setActive.bind(this, 'CHW','1')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    623.674,417.739 608.436,417.739 608.436,405.803 597.77,405.803 597.77,397.168 593.525,392.923 586.765,399.684 572.204,399.684 
    572.204,379.051 577.05,374.205 587.865,374.205 590.335,371.735 583.488,364.889 587.442,360.935 592.691,366.184 
    607.675,366.184 614.278,359.581 607.802,353.105 603.738,357.168 598.087,351.517 603.167,346.438 628.246,346.438 
    632.976,341.708 651.611,341.708 651.611,383.708 630.955,383.708 623.717,390.946   "/>
  <polygon id="district-TXG-8" className={`${styles.district} ${this._getDistrictPosition('TXG','8')}`} 
           onMouseEnter={this._setActive.bind(this, 'TXG','8')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    729.899,369.299 759.406,398.806 750.149,408.063 750.149,439.913 762.778,452.542 785.196,452.542 802.313,469.659 812.9,459.072 
    881.449,459.072 899.767,477.389 925.132,477.389 935.398,487.655 1025.006,399.039 1002.277,399.039 985.945,415.453 
    976.517,415.453 965.851,404.831 857.661,404.831 857.661,394.967 833.002,370.307 815.224,388.085 804.159,388.085 
    785.59,369.515 785.59,360.766 770.325,345.501 758.149,357.676 749.836,349.362   "/>
  <polygon id="district-TXG-7" className={`${styles.district} ${this._getDistrictPosition('TXG','7')}`} 
           onMouseEnter={this._setActive.bind(this, 'TXG','7')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    750.149,408.063 750.149,439.913 737.959,452.104 728.44,452.104 718.911,461.633 718.911,436.752 708.279,436.752 
    682.628,411.102 685.896,407.834 685.896,404.075 700.66,404.075 706.332,409.747 713.816,402.263 709.685,398.132 
    721.959,398.132 731.889,408.063   "/>
  <polygon id="district-TXG-6" className={`${styles.district} ${this._getDistrictPosition('TXG','6')}`} 
           onMouseEnter={this._setActive.bind(this, 'TXG','6')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    698.07,386.518 713.816,402.263 706.332,409.747 700.66,404.075 685.896,404.075 685.896,398.691   "/>
  <polygon id="district-TXG-5" className={`${styles.district} ${this._getDistrictPosition('TXG','5')}`} 
           onMouseEnter={this._setActive.bind(this, 'TXG','5')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    709.685,398.132 721.959,398.132 731.889,408.063 750.149,408.063 759.461,398.751 742.403,381.803 737.324,386.882 
    725.769,386.882 711.737,372.85 698.07,386.518   "/>
  <polygon id="district-TXG-4" className={`${styles.district} ${this._getDistrictPosition('TXG','4')}`} 
           onMouseEnter={this._setActive.bind(this, 'TXG','4')}  
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    685.896,398.691 711.737,372.85 691.285,352.398 669.49,374.193 669.49,379.723 677.53,387.764 677.53,398.691  "/>
  <polygon id="district-TXG-3" className={`${styles.district} ${this._getDistrictPosition('TXG','3')}`} 
           onMouseEnter={this._setActive.bind(this, 'TXG','3')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    770.325,345.501 758.149,357.676 749.836,349.362 729.899,369.299 742.403,381.803 737.324,386.882 725.769,386.882 
    691.285,352.398 698.84,344.843 702.737,348.74 726.737,324.74 734.53,332.533 764.78,332.533 770.325,338.078  "/>
  <polygon id="district-TXG-2" className={`${styles.district} ${this._getDistrictPosition('TXG','2')}`} 
           onMouseEnter={this._setActive.bind(this, 'TXG','2')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    651.611,341.708 654.357,338.962 644.373,328.978 647.484,325.867 651.039,329.422 656.436,324.026 672.944,340.533 
    685.007,328.47 693.261,328.47 708.134,343.343 702.737,348.74 698.84,344.843 669.49,374.193 669.49,379.723 677.53,387.764 
    677.53,398.691 685.896,398.691 685.896,407.834 682.628,411.102 708.279,436.752 718.911,436.752 718.911,461.633 
    714.848,465.696 696.774,465.696 671.42,440.342 671.42,431.707 662.531,431.707 657.325,426.501 667.864,415.961 667.864,399.961 
    651.611,383.708   "/>
  <polygon id="district-TXG-1" className={`${styles.district} ${this._getDistrictPosition('TXG','1')}`} 
           onMouseEnter={this._setActive.bind(this, 'TXG','1')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    708.134,343.343 726.737,324.74 734.53,332.533 764.78,332.533 755.75,323.504 755.75,272.047 749.133,272.047 737.62,283.56 
    717.896,283.56 691.822,309.634 684.626,302.439 679.077,307.987 679.077,315.607 661.007,315.607 661.007,318.946 
    667.102,318.946 659.23,326.819 672.944,340.533 685.007,328.47 693.261,328.47  "/>
  <polygon id="district-ZMI-2" className={`${styles.district} ${this._getDistrictPosition('ZMI','2')}`} 
           onMouseEnter={this._setActive.bind(this, 'ZMI','2')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    826.508,257.825 861.725,257.825 886.444,282.545 891.354,277.635 884.158,270.439 884.158,260.873 873.544,250.259 
    897.713,226.09 909.132,237.508 913.026,233.614 923.184,243.772 923.184,285.254 935.048,297.117 935.048,309.296 
    922.338,309.296 922.338,328.597 913.872,337.063 927.417,350.607 950.443,350.607 965.851,366.015 965.851,405.125 
    857.661,405.125 857.661,394.967 833.002,370.307 815.224,388.085 804.159,388.085 785.59,369.515 785.59,360.766 770.325,345.501 
    770.325,338.078 804.498,338.078 821.429,321.147 821.429,294.735 827.016,289.148 827.016,276.111 820.413,276.111 
    820.413,271.031 826.339,265.106   "/>
  <polygon id="district-ZMI-1" className={`${styles.district} ${this._getDistrictPosition('ZMI','1')}`} 
           onMouseEnter={this._setActive.bind(this, 'ZMI','1')}  
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    770.325,338.078 755.75,323.504 755.75,272.047 773.345,272.047 813.979,231.413 832.942,231.413 842.085,222.27 885.428,222.27 
    894.74,212.958 908.793,212.958 908.793,228.027 913.872,233.106 909.301,237.677 897.713,226.09 873.544,250.259 884.158,260.873 
    884.158,270.439 891.354,277.635 886.444,282.545 861.725,257.825 826.508,257.825 826.508,265.106 820.498,271.116 
    820.498,276.111 827.016,276.111 827.016,289.148 821.429,294.735 821.429,321.147 804.498,338.078   "/>
  <polygon id="district-TYN-6" className={`${styles.district} ${this._getDistrictPosition('TYN','6')}`} 
           onMouseEnter={this._setActive.bind(this, 'TYN','6')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1100.241,212.154 1100.241,221.854 1088.939,221.854 1088.939,255.455 1079.67,264.725 1088.643,273.698 1100.241,273.698 
    1100.241,287.624 1106.272,293.656 1106.272,305.232 1090.294,305.232 1090.294,347.898 1076.749,347.898 1049.163,375.484 
    1038.848,365.168 1038.848,299.161 1043.274,294.735 1043.274,266.581 1039.211,262.517 1058.844,242.884 1052.489,236.528 
    1068.876,220.141 1068.876,212.154 1081.638,199.392 1082.844,200.598 1085.638,197.805 1088.685,197.805 1088.685,209.741 
    1091.225,209.741 1094.527,206.44  "/>
  <polygon id="district-TYN-5" className={`${styles.district} ${this._getDistrictPosition('TYN','5')}`} 
           onMouseEnter={this._setActive.bind(this, 'TYN','5')}  
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1068.876,212.154 1068.876,220.141 1052.489,236.528 1058.844,242.884 1039.211,262.517 1023.344,246.651 1023.344,240.12 
    1012.508,229.284 1025.109,216.683 1034.421,216.683 1047.035,204.069 1047.035,186.376 1055.162,186.376 1055.162,192.471 
    1061.5,198.81 1061.5,212.154  "/>
  <polygon id="district-TYN-4" className={`${styles.district} ${this._getDistrictPosition('TYN','4')}`} 
           onMouseEnter={this._setActive.bind(this, 'TYN','4')}  
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1082.844,193.995 1079.543,197.297 1082.844,200.598 1085.638,197.805 1088.685,197.805 1088.685,209.741 1091.225,209.741 
    1094.527,206.44 1100.241,212.154 1105.045,207.35 1104.156,206.461 1109.257,201.36 1109.257,188.916 1104.262,183.921 
    1096.304,183.921 1093.807,186.419 1093.807,193.995  "/>
  <polygon id="district-TYN-3" className={`${styles.district} ${this._getDistrictPosition('TYN','3')}`} 
           onMouseEnter={this._setActive.bind(this, 'TYN','3')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1047.035,186.376 1055.162,186.376 1055.162,192.471 1061.5,198.81 1061.5,212.154 1068.876,212.154 1081.638,199.392 
    1079.543,197.297 1082.844,193.995 1082.844,182.99 1080.135,182.99 1059.987,162.842 1041.744,181.085   "/>
  <polygon id="district-TYN-2" className={`${styles.district} ${this._getDistrictPosition('TYN','2')}`} 
           onMouseEnter={this._setActive.bind(this, 'TYN','2')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1025.109,216.683 1034.421,216.683 1047.035,204.069 1047.035,186.376 1041.744,181.085 1059.987,162.842 1080.135,182.99 
    1084.199,182.99 1084.199,167.075 1104.854,167.075 1104.854,142.017 1068.961,142.017 1061.003,134.059 1014.781,134.059 
    990.231,158.609 1004.538,172.916 992.94,184.514   "/>
  <polygon id="district-TYN-1" className={`${styles.district} ${this._getDistrictPosition('TYN','1')}`} 
           onMouseEnter={this._setActive.bind(this, 'TYN','1')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1104.854,142.017 1114.59,142.017 1120.389,147.816 1120.389,162.673 1136.833,179.117 1136.833,187.054 1141.838,192.059 
    1141.838,209.741 1136.939,209.741 1131.055,215.625 1113.32,215.625 1104.156,206.461 1109.257,201.36 1109.257,188.916 
    1104.262,183.921 1096.304,183.921 1093.807,186.419 1093.807,193.995 1082.844,193.995 1082.844,182.99 1084.199,182.99 
    1084.199,167.075 1104.854,167.075   "/>
  <polygon id="district-NTC-12" className={`${styles.district} ${this._getDistrictPosition('NTC','12')}`} 
           onMouseEnter={this._setActive.bind(this, 'NTC','12')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1263.329,152.599 1267.181,156.451 1267.181,189.678 1271.185,193.682 1279.667,193.682 1279.667,196.535 1272.753,203.449 
    1272.753,208.278 1242.335,208.278 1242.335,212.888 1245.735,216.288 1241.252,220.771 1241.252,238.884 1265.952,263.584 
    1277.636,263.584 1277.636,257.211 1273.837,253.413 1283.223,244.026 1288.81,249.614 1303.032,249.614 1319.287,265.868 
    1332.365,278.947 1323.73,287.582 1327.54,291.391 1327.54,298.811 1319.186,307.164 1335.667,323.645 1335.667,328.343 
    1321.572,328.343 1321.572,319.454 1266.715,319.454 1266.715,331.645 1239.819,331.645 1260.656,310.807 1260.656,301.471 
    1241.567,282.381 1241.567,256.09 1231.245,256.09 1222.038,246.884 1222.038,232.259 1231.806,222.492 1226.123,216.81 
    1226.123,209.741 1230.144,209.741 1230.144,184.345 1234.038,180.45 1231.064,177.476 1234.197,174.344 1234.197,167.513 
    1241.996,167.513 1248.987,160.521 1263.329,160.521  "/>
  <polygon id="district-NTC-11" className={`${styles.district} ${this._getDistrictPosition('NTC','11')}`} 
            onMouseEnter={this._setActive.bind(this, 'NTC','11')}  
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1231.245,256.09 1241.573,256.09 1241.573,282.375 1260.668,301.471 1260.668,310.819 1239.819,331.669 1146.844,331.669 
    1146.844,347.898 1090.294,347.898 1090.294,305.232 1106.272,305.232 1106.272,302.1 1121.532,302.1 1136.431,287.201 
    1132.791,283.56 1132.791,271.517 1141.065,271.517 1149.869,262.713 1138.695,251.54 1143.796,246.439 1167.669,246.439 
    1169.866,244.242 1175.203,244.242 1181.529,250.568 1181.529,258.503 1197.202,274.175 1202.631,268.746 1196.028,262.143 
    1206.822,251.349 1206.822,248.344 1208.811,248.344 1212.875,252.407 1220.917,252.407 1227.922,259.413   "/>
  <polygon id="district-NTC-10" className={`${styles.district} ${this._getDistrictPosition('NTC','10')}`} 
           onMouseEnter={this._setActive.bind(this, 'NTC','10')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1153.512,246.439 1143.796,246.439 1138.695,251.54 1149.869,262.713 1141.065,271.517 1132.791,271.517 1132.791,283.56 
    1136.431,287.201 1121.532,302.1 1106.272,302.1 1106.272,293.656 1100.241,287.624 1100.241,273.698 1088.643,273.698 
    1079.67,264.725 1088.939,255.455 1088.939,229.677 1111.288,229.677 1120.495,238.884 1124.875,238.884 1133.173,230.586 
    1137.119,230.586 1139.559,233.026 1146.272,226.312 1151.161,231.201 1156.304,226.058 1156.304,236.154 1153.512,236.154  "/>
  <polygon id="district-NTC-9" className={`${styles.district} ${this._getDistrictPosition('NTC','9')}`} 
           onMouseEnter={this._setActive.bind(this, 'NTC','9')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1169.905,228.027 1169.905,244.28 1175.203,244.28 1179.309,240.175 1179.309,228.027  "/>
  <polygon id="district-NTC-8" className={`${styles.district} ${this._getDistrictPosition('NTC','8')}`} 
           onMouseEnter={this._setActive.bind(this, 'NTC','8')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1156.304,226.058 1156.304,236.154 1153.512,236.154 1153.512,246.439 1167.669,246.439 1169.866,244.242 1169.866,226.058  "/>
  <polygon id="district-NTC-7" className={`${styles.district} ${this._getDistrictPosition('NTC','7')}`} 
           onMouseEnter={this._setActive.bind(this, 'NTC','7')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1150.018,214.148 1150.018,217.594 1137.119,230.493 1139.605,232.979 1146.272,226.312 1151.161,231.201 1156.304,226.058 
    1169.905,226.058 1169.905,222.299 1154.208,222.299 1154.208,214.148   "/>
  <polygon id="district-NTC-6" className={`${styles.district} ${this._getDistrictPosition('NTC','6')}`} 
           onMouseEnter={this._setActive.bind(this, 'NTC','6')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1154.208,214.148 1154.208,222.299 1169.905,222.299 1169.905,216.572 1166.221,212.888 1164.981,214.128   "/>
  <polygon id="district-NTC-5" className={`${styles.district} ${this._getDistrictPosition('NTC','5')}`} 
           onMouseEnter={this._setActive.bind(this, 'NTC','5')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1088.939,229.677 1111.288,229.677 1120.495,238.884 1124.875,238.884 1133.173,230.586 1137.119,230.586 1150.065,217.64 
    1150.065,214.148 1146.246,214.148 1141.838,209.741 1136.939,209.741 1131.055,215.625 1113.32,215.625 1105.045,207.35 
    1100.241,212.154 1100.241,221.854 1088.939,221.854  "/>
  <polygon id="district-NTC-4" className={`${styles.district} ${this._getDistrictPosition('NTC','4')}`} 
           onMouseEnter={this._setActive.bind(this, 'NTC','4')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1141.838,209.741 1146.246,214.148 1165.002,214.148 1169.905,209.071 1169.905,201.221 1164.059,201.221 1157.002,208.278 
    1149.613,208.278 1141.886,200.551   "/>
  <polyline id="district-NTC-3" className={`${styles.district} ${this._getDistrictPosition('NTC','3')}`}
            onMouseEnter={this._setActive.bind(this, 'NTC','3')}   
            stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1169.905,201.221 1187.991,201.221 1187.991,205.619 1177.039,216.572 1169.905,216.572 1166.221,212.888 1169.971,209.138 
    1169.971,201.221  "/>
  <polygon id="district-NTC-2" className={`${styles.district} ${this._getDistrictPosition('NTC','2')}`} 
           onMouseEnter={this._setActive.bind(this, 'NTC','2')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1164.059,201.221 1188.056,201.221 1188.056,198.683 1179.328,189.955 1179.328,183.075 1181.244,181.158 1171.563,171.477 
    1163.097,171.477 1156.156,178.419 1159.203,181.466 1151.754,188.916   "/>
  <polygon id="district-NTC-1" className={`${styles.district} ${this._getDistrictPosition('NTC','1')}`} 
           onMouseEnter={this._setActive.bind(this, 'NTC','1')}  
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1120.77,147.435 1120.77,162.673 1137.023,178.927 1137.023,187.054 1141.933,191.964 1141.933,200.598 1149.613,208.278 
    1157.002,208.278 1164.059,201.221 1151.754,188.916 1159.203,181.466 1156.156,178.419 1163.097,171.477 1171.563,171.477 
    1181.243,181.157 1187.169,175.231 1195.436,175.231 1203.154,167.513 1241.996,167.513 1248.987,160.521 1263.329,160.521 
    1263.329,146.08 1252.324,135.075 1240.641,135.075 1235.477,129.911 1216.938,129.911 1213.001,133.848 1202.716,133.848 
    1192.367,144.197 1185.436,144.197 1172.224,157.408 1144.473,157.408 1134.492,147.427  "/>
  <polygon id="district-TPE-8" className={`${styles.district} ${this._getDistrictPosition('TPE','8')}`} 
           onMouseEnter={this._setActive.bind(this, 'TPE','8')}   
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1179.351,240.217 1175.203,244.365 1181.467,250.63 1181.467,258.503 1197.171,274.206 1202.631,268.746 1196.028,262.143 
    1206.822,251.349 1206.822,248.344 1198.652,248.344 1198.652,244.28 1183.668,244.28  "/>
  <polygon id="district-TPE-7" className={`${styles.district} ${this._getDistrictPosition('TPE','7')}`} 
           onMouseEnter={this._setActive.bind(this, 'TPE','7')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1191.541,244.28 1198.652,244.28 1205.764,237.169 1205.764,229.042 1203.97,230.836 1198.255,225.122 1191.541,231.582   "/>
  <polygon id="district-TPE-6" className={`${styles.district} ${this._getDistrictPosition('TPE','6')}`} 
           onMouseEnter={this._setActive.bind(this, 'TPE','6')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1179.351,228.027 1179.351,240.217 1183.668,244.28 1191.541,244.28 1191.541,231.582 1198.035,225.343 1194.518,221.854 
    1188.462,228.069  "/>
  <polygon id="district-TPE-5" className={`${styles.district} ${this._getDistrictPosition('TPE','5')}`} 
           onMouseEnter={this._setActive.bind(this, 'TPE','5')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1177.039,216.572 1169.905,216.572 1169.905,228.027 1188.578,228.027 1191.541,225.169 1185.436,219.192 1182.577,222.052  "/>
  <polygon id="district-TPE-4" className={`${styles.district} ${this._getDistrictPosition('TPE','4')}`} 
           onMouseEnter={this._setActive.bind(this, 'TPE','4')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1226.081,209.741 1226.081,216.852 1231.753,222.439 1222.017,232.259 1222.017,246.905 1231.245,256.09 1227.922,259.413 
    1220.917,252.407 1212.875,252.407 1208.811,248.344 1198.652,248.344 1198.652,244.28 1205.764,237.169 1205.764,228.451 
    1209.827,224.386 1209.827,209.741   "/>
  <polygon id="district-TPE-3" className={`${styles.district} ${this._getDistrictPosition('TPE','3')}`} 
           onMouseEnter={this._setActive.bind(this, 'TPE','3')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1185.436,219.192 1191.555,225.155 1194.786,221.904 1203.675,230.542 1209.827,224.386 1209.827,209.741 1194.758,209.741  "/>
  <polygon id="district-TPE-2" className={`${styles.district} ${this._getDistrictPosition('TPE','2')}`} 
           onMouseEnter={this._setActive.bind(this, 'TPE','2')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1195.774,199.582 1179.351,183.075 1179.351,189.932 1188.06,198.683 1188.049,205.678 1177.039,216.572 1182.626,222.101 
    1194.758,209.741 1230.144,209.741 1230.144,184.345 1234.038,180.45 1231.064,177.476 1209.118,199.656  "/>
  <polygon id="district-TPE-1" className={`${styles.district} ${this._getDistrictPosition('TPE','1')}`} 
           onMouseEnter={this._setActive.bind(this, 'TPE','1')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1179.351,183.075 1195.774,199.582 1208.811,199.582 1234.208,174.355 1234.208,167.513 1203.154,167.513 1195.436,175.202 
    1187.139,175.202  "/>
  <polygon id="district-KEL-1" className={`${styles.district} ${this._getDistrictPosition('KEL','1')}`} 
           onMouseEnter={this._setActive.bind(this, 'KEL','1')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1242.335,208.278 1242.335,212.888 1245.735,216.288 1241.252,220.771 1241.252,238.884 1265.952,263.584 1277.636,263.584 
    1277.636,257.211 1273.837,253.413 1283.223,244.026 1288.81,249.614 1303.032,249.614 1303.032,244.28 1288.544,229.792 
    1278.652,229.792 1278.652,226.058 1283.421,221.29 1276.68,214.549 1276.68,208.278   "/>
  <path id="district-ILA-1" className={`${styles.district} ${this._getDistrictPosition('ILA','1')}`} 
        onMouseEnter={this._setActive.bind(this, 'ILA','1')}  
        stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" d="M1076.749,347.898
    h70.094v-16.254h119.872v-12.19h54.857v10.159h-35.555l-66.031,65.862v61.121l-39.449,39.619h-30.645l-34.568,34.568l-38.79-38.79
    l-16.065,16.065l-58.635-58.635l-47.435,47.435L940.3,482.759L1076.749,347.898z M1283.925,380.109l8.127,8.127v-10.159h-8.127
    V380.109z"/>
  <polygon id="district-HCC-1" className={`${styles.district} ${this._getDistrictPosition('HCC','1')}`} 
           onMouseEnter={this._setActive.bind(this, 'HCC','1')} 
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    913.872,233.106 926.111,220.867 951.29,220.867 951.29,234.701 955.607,234.701 962.119,228.189 962.119,207.455 945.784,191.12 
    945.784,179.265 934.274,179.265 911.925,201.614 911.925,209.741 908.751,212.916 908.751,228.027   "/>
  <polygon id="district-HSZ-1" className={`${styles.district} ${this._getDistrictPosition('HSZ','1')}`}
           onMouseEnter={this._setActive.bind(this, 'HSZ','1')}  
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    945.784,179.265 954.846,179.265 974.993,159.117 990.739,159.117 1004.538,172.916 992.94,184.514 1025.109,216.683 
    1012.508,229.284 1023.344,240.12 1023.344,246.651 1043.274,266.581 1043.274,294.735 1038.848,299.161 1038.848,365.168 
    1049.006,375.326 1025.006,399.039 1002.277,399.039 985.945,415.453 976.517,415.453 965.962,405.125 965.962,366.015 
    950.499,350.552 927.417,350.552 913.9,337.035 922.338,328.597 922.338,309.296 935.048,309.296 935.048,297.117 923.184,285.254 
    923.184,243.772 912.857,233.445 925.773,220.528 951.29,220.528 951.29,234.701 955.607,234.701 962.119,228.189 962.119,207.455 
    945.784,191.12  "/>
  <polygon id="district-HUN-1" className={`${styles.district} ${this._getDistrictPosition('HUN','1')}`}
           onMouseEnter={this._setActive.bind(this, 'HUN','1')}  
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1097.989,569.263 1126.083,541.49 1076.388,492.138 1060.45,508.04 1001.824,449.432 954.327,496.786 940.263,482.796 
    895.059,527.852 907.102,539.895 730.34,716.656 718.005,704.322 621.448,800.56 719.304,898.357 811.357,804.665 828.879,821.767 
    908.043,742.488 908.043,728.339 994.682,641.7 1004.115,641.7 1004.115,612.531 1047.458,569.187  "/>
  <path id="district-MZG-1" className={`${styles.district} ${this._getDistrictPosition('MZG','1')}`} 
        onMouseEnter={this._setActive.bind(this, 'MZG','1')} 
        stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" d="M184.123,414.945
    v-6.667l-3.746-3.746v-6.222l-2.159-2.159v-5.926h5.587v13.206l5.249,5.249l2.878-2.878l4.402,4.402l5.757-5.757v-3.888h-6.597
    l-5.763-5.763l2.032-2.032l3.386,3.386l2.37-2.37l-6.518-6.518l6.095-6.095l3.132,3.132l2.709-2.709l3.725,3.725l-3.386,3.386
    l3.894,3.894l7.788-7.788h6.095l2.709,2.709l-7.28,7.28l2.963,2.963l4.317-4.317h3.556l4.233-4.233l3.386,3.386l-4.577,4.578
    l3.556,3.556l4.747-4.747l2.54,2.54l-5.757,5.757v9.481l-2.878,2.878l-8.804-8.804h-19.979l-10.836,10.836h-5.079L184.123,414.945z
     M157.14,409.612h3.302l5.841,5.841l2.413-2.413l-8.762-8.762l-2.794,2.794V409.612z M157.14,370.501l5.333,5.333l3.746-3.746
    l5.079,5.079l10.476-10.476l2.624,2.624l11.809-11.809l4.36,4.36l2.857-2.857l-6.222-6.222l4-4l-2.159-2.159l-6.73,6.73
    l-3.026-0.106l-4.254,4.254l3.979,3.979l-2.794,2.794h-5.936l-7.825,7.825l-3.063-3.063h-10.73L157.14,370.501z M209.033,352.808
    l3.979,3.979l3.048-3.048l3.936,3.936v10.032l-4.804,4.804v8.656h3.661l3.185-3.185l-4.19-4.19l6.254-6.254h4.402v-10.836
    l-5.503-5.503h-4.233l-4.106-4.106L209.033,352.808z M130.812,438.818l-4.741,4.741v5.249h-5.249v4.063l4.106,4.106l11.852-11.852
    L130.812,438.818z M133.859,455.072v3.217h2.032l1.651-1.651l2.54,2.54l2.402-2.402l-3.939-3.939l-2.275,2.275L133.859,455.072z
     M63.934,488.849v10.921l2.921,2.921l4.063-4.063h4.952v-2.857l-4.921-4.921h-4.476L63.934,488.849z M245.901,331.01l3.809,3.809
    l3.682-3.682l-5.714-5.714l-4.952,4.952v4.063L245.901,331.01z M249.345,322.264l6.413-6.413l-2.746-2.746v3.175l-4.952,4.952
    L249.345,322.264z"/>
  <polygon id="district-CYC-1" className={`${styles.district} ${this._getDistrictPosition('CYC','1')}`}
           onMouseEnter={this._setActive.bind(this, 'CYC','1')}  
           stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    466.275,578.91 456.057,588.413 456.057,599.832 466.216,599.832 466.216,614.054 498.723,614.054 498.723,598.816 
    488.565,589.167 488.565,583.832 471.558,583.842   "/>
  <path id="district-TTT-1" className={`${styles.district} ${this._getDistrictPosition('TTT','1')}`} 
        onMouseEnter={this._setActive.bind(this, 'TTT','1')} 
        stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" d="M621.477,800.531
    l97.007,97.007l93.083-93.083l16.057,16.057L690.721,957.416h-36.74l-56.719,56.888h-94.137l-140.02,139.85l-18.793-18.963v-50.285
    l32.508-33.016v-35.047l47.746-47.238h33.693l36.402-35.555V875.3l92.443-92.613h52.825L621.477,800.531z M658.722,1103.192v14.73
    l7.619,7.619l2.794-2.794l-4.19-4.19l8.762-8.762l-11.301-11.302L658.722,1103.192z M544.437,1333.624v26.412l7.788,7.788v11.174
    h11.852v-5.418l-5.926-5.926v-9.651l10.751-10.751l-19.725-19.725L544.437,1333.624z"/>
  <path id="district-KNH-1" className={`${styles.district} ${this._getDistrictPosition('KNH','1')}`} 
        onMouseEnter={this._setActive.bind(this, 'KNH','1')} 
        stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" d="M305.594,61.833
    v24.281l14.365,14.365h13.562L348.25,85.75v7.875l6.271-6.271l-4.229-4.229H360.5l4.375-4.375h4.958v13.708l4.958,4.958V119
    l-5.833,5.833v12.833l-15.167,15.167h-23.844v-19.906l-19.906-19.906h-17.646l-13.271,13.271h-9.042l-11.958-11.958V92.167
    l10.208,10.208l16.042-16.042V75.25h9.917v-6.417h-12.25l7-7H305.594z M221.375,79.917h33.833V63.292H248.5l-7.583-7.583
    L221.375,75.25V79.917z"/>
  <path id="district-MFK-1" className={`${styles.district} ${this._getDistrictPosition('MFK','1')}`} 
        onMouseEnter={this._setActive.bind(this, 'MFK','1')} 
        stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" d="M32.594,90.663
    l8.094,8.094h-12.25v-7.875L32.594,90.663z M31.5,108.382l-4.448,4.448H47.25l-4.557-4.557L31.5,108.382z M60.667,87.09
    L50.021,97.736l9.771,9.771h14.583v-3.792L70,99.34h-7.802V87.09H60.667z M88.247,93.671l-9.917,9.917l2.315,2.315l6.079-6.079
    h6.025l5.811,5.811v7.196h2.064v-5.323l4.785-4.785v-3.965l-4.854-4.854L88.247,93.671z M132.708,94.71l-3.919,3.919v6.544
    l-3.236,3.236l3.628,3.628l4.229-4.229l7.118,7.118l2.68-2.68l-2.014-2.014v-6.982h-9.069l4.872-4.872L132.708,94.71z"/>
  
    <polygon id="district-LAB-1" className={`${styles.district} ${this._getDistrictPosition('LAB','1')}`} 
             onMouseEnter={this._setActive.bind(this, 'LAB','1')} 
             stroke="#000000" strokeWidth="3" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1306.663,1001 1228.039,1001 1218.946,1016.75 1315.756,1016.75   "/>
  
    <polygon id="district-LAB-2" className={`${styles.district} ${this._getDistrictPosition('LAB','2')}`} 
             onMouseEnter={this._setActive.bind(this, 'LAB','2')} 
             stroke="#000000" strokeWidth="3" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1306.663,1001 1265.542,1001 1256.448,1016.75 1315.756,1016.75   "/>
  
    <polygon id="district-LAB-3" className={`${styles.district} ${this._getDistrictPosition('LAB','3')}`} 
             onMouseEnter={this._setActive.bind(this, 'LAB','3')} 
             stroke="#000000" strokeWidth="3" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1306.663,1001 1297.917,1001 1288.823,1016.75 1315.756,1016.75   "/>
  
    <polygon id="district-MAB-1" className={`${styles.district} ${this._getDistrictPosition('MAB','1')}`} 
             onMouseEnter={this._setActive.bind(this, 'MAB','1')} 
             stroke="#000000" strokeWidth="3" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1012.782,1016.75 1047.471,956.667 1082.16,1016.75   "/>
  
    <polygon id="district-MAB-2" className={`${styles.district} ${this._getDistrictPosition('MAB','2')}`}
             onMouseEnter={this._setActive.bind(this, 'MAB','2')}  
             stroke="#000000" strokeWidth="3" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1053.247,1016.75 1087.936,956.667 1122.625,1016.75  "/>
  
    <polygon id="district-MAB-3" className={`${styles.district} ${this._getDistrictPosition('MAB','3')}`} 
             onMouseEnter={this._setActive.bind(this, 'MAB','3')} 
             stroke="#000000" strokeWidth="3" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1053.247,1016.75 1082.16,1016.75 1067.703,991.71  "/>
</g>
<g id="cities">
  <polygon id="city-TPE" fill="none" stroke="#000000" strokeWidth="4" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1234.208,167.513 1203.154,167.513 1195.436,175.202 1187.139,175.202 1179.351,183.075 1179.351,189.932 1188.06,198.683 
    1188.049,205.678 1177.039,216.572 1169.905,216.572 1169.905,228.027 1179.351,228.027 1179.351,240.217 1175.203,244.365 
    1181.467,250.63 1181.467,258.502 1197.171,274.206 1202.631,268.746 1196.028,262.143 1206.822,251.349 1206.822,248.344 
    1208.811,248.344 1212.875,252.407 1220.917,252.407 1227.922,259.413 1231.245,256.09 1222.017,246.905 1222.017,232.259 
    1231.753,222.439 1226.081,216.852 1226.081,209.741 1230.144,209.741 1230.144,184.345 1234.038,180.45 1231.065,177.477 
    1234.208,174.355  "/>
  <polygon id="city-NTC" fill="none" stroke="#000000" strokeWidth="4" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1319.186,307.164 1327.54,298.811 1327.54,291.391 1323.731,287.581 1332.365,278.947 1319.287,265.868 1303.032,249.614 
    1288.81,249.614 1283.223,244.026 1273.837,253.413 1277.636,257.211 1277.636,263.584 1265.952,263.584 1241.252,238.884 
    1241.252,220.771 1245.735,216.288 1242.334,212.888 1242.334,208.277 1272.753,208.277 1272.753,203.449 1279.667,196.535 
    1279.667,193.682 1271.185,193.682 1267.181,189.678 1267.181,156.451 1263.329,152.599 1263.329,146.08 1252.324,135.075 
    1240.641,135.075 1235.477,129.911 1216.938,129.911 1213.001,133.848 1202.716,133.848 1192.367,144.197 1185.436,144.197 
    1172.224,157.408 1144.473,157.408 1134.492,147.427 1120.77,147.435 1120.77,162.673 1137.023,178.927 1137.023,187.053 
    1141.933,191.963 1141.933,200.598 1141.886,200.551 1141.838,209.741 1136.939,209.741 1131.055,215.625 1113.32,215.625 
    1105.045,207.35 1100.241,212.154 1100.241,221.854 1088.939,221.854 1088.939,229.677 1088.939,255.455 1079.67,264.725 
    1088.643,273.698 1100.241,273.698 1100.241,287.624 1106.272,293.656 1106.272,302.1 1106.272,305.232 1090.294,305.232 
    1090.294,347.898 1146.844,347.898 1146.844,331.669 1239.819,331.669 1239.843,331.645 1266.715,331.645 1266.715,319.454 
    1321.572,319.454 1321.572,328.343 1335.667,328.343 1335.667,323.645   "/>
  <polygon id="city-TYN" fill="none" stroke="#000000" strokeWidth="4" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1136.833,187.053 1136.833,179.117 1120.389,162.673 1120.389,147.816 1114.59,142.017 1104.854,142.017 1068.961,142.017 
    1061.003,134.059 1014.781,134.059 990.231,158.609 1004.538,172.916 992.94,184.514 1025.109,216.683 1012.508,229.284 
    1023.344,240.12 1023.344,246.651 1039.211,262.517 1043.274,266.581 1043.274,294.735 1038.848,299.161 1038.848,365.168 
    1049.164,375.484 1076.749,347.898 1090.294,347.898 1090.294,305.232 1106.272,305.232 1106.272,293.656 1100.241,287.624 
    1100.241,273.698 1088.643,273.698 1079.67,264.725 1088.939,255.455 1088.939,221.854 1100.241,221.854 1100.241,212.154 
    1105.045,207.35 1113.32,215.625 1131.055,215.625 1136.939,209.741 1141.838,209.741 1141.838,192.059   "/>
  <polygon id="city-HCC" fill="none" stroke="#000000" strokeWidth="4" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    913.872,233.106 926.111,220.867 951.29,220.867 951.29,234.701 955.607,234.701 962.119,228.189 962.119,207.455 945.784,191.12 
    945.784,179.265 934.274,179.265 911.925,201.614 911.925,209.741 908.751,212.916 908.751,228.027   "/>
  <polygon id="city-HSZ" fill="none" stroke="#000000" strokeWidth="4" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    945.784,180.265 954.846,180.265 974.993,160.117 990.739,160.117 1004.538,173.916 992.94,185.514 1025.109,217.683 
    1012.508,230.284 1023.344,241.12 1023.344,247.651 1043.274,267.581 1043.274,295.735 1038.848,300.161 1038.848,366.168 
    1049.006,376.326 1025.006,400.039 1002.277,400.039 985.945,416.453 976.517,416.453 965.962,406.125 965.962,367.015 
    950.499,351.552 927.417,351.552 913.9,338.035 922.338,329.597 922.338,310.296 935.048,310.296 935.048,298.117 923.184,286.254 
    923.184,244.772 912.857,234.445 925.773,221.528 951.29,221.528 951.29,235.701 955.607,235.701 962.119,229.189 962.119,208.455 
    945.784,192.12  "/>
  <polygon id="city-ZMI" fill="none" stroke="#000000" strokeWidth="4" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    950.443,350.607 927.417,350.607 913.872,337.062 922.338,328.597 922.338,309.296 935.048,309.296 935.048,297.117 
    923.184,285.254 923.184,243.772 913.195,233.783 913.872,233.106 908.793,228.027 908.793,212.958 894.74,212.958 885.428,222.27 
    842.085,222.27 832.942,231.413 813.979,231.413 773.345,272.047 755.75,272.047 755.75,323.504 770.325,338.078 770.325,345.501 
    785.59,360.766 785.59,369.515 804.159,388.085 815.224,388.085 833.002,370.307 857.661,394.967 857.661,405.125 965.851,405.125 
    965.851,366.015   "/>
  <polygon id="city-TXG" fill="none" stroke="#000000" strokeWidth="4" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1002.277,399.039 985.945,415.453 976.517,415.453 965.851,404.831 857.661,404.831 857.661,394.967 833.002,370.307 
    815.224,388.085 804.159,388.085 785.59,369.515 785.59,360.766 770.325,345.501 770.325,338.078 764.78,332.533 755.75,323.504 
    755.75,272.047 749.133,272.047 737.62,283.56 717.896,283.56 691.822,309.634 684.626,302.439 679.077,307.987 679.077,315.607 
    661.007,315.607 661.007,318.946 667.102,318.946 659.23,326.819 656.436,324.026 651.039,329.422 647.484,325.867 
    644.373,328.978 654.357,338.962 651.611,341.708 651.611,383.707 667.864,399.961 667.864,415.961 657.325,426.501 
    662.531,431.707 671.42,431.707 671.42,440.342 696.774,465.696 714.848,465.696 718.911,461.633 728.44,452.104 737.959,452.104 
    750.149,439.913 762.778,452.542 785.196,452.542 802.313,469.659 812.9,459.072 881.449,459.072 899.767,477.389 925.132,477.389 
    935.398,487.655 1025.006,399.039  "/>
  <polygon id="city-CHW" fill="none" stroke="#000000" strokeWidth="4" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    662.531,431.707 657.325,426.501 667.864,415.961 667.864,399.961 651.611,383.707 651.611,341.708 632.976,341.708 
    628.246,346.438 603.167,346.438 598.087,351.517 603.738,357.168 607.802,353.105 614.278,359.581 607.675,366.184 
    592.691,366.184 587.442,360.935 583.488,364.889 590.335,371.736 587.865,374.205 577.051,374.205 572.204,379.051 
    567.252,374.099 556.289,385.062 546.892,385.062 515.654,416.3 509.221,416.3 498.724,416.3 489.756,425.268 503.722,439.161 
    501.119,441.764 513.284,453.929 535.929,453.929 545.03,463.029 545.03,469.209 583.04,507.219 596.077,507.219 610.468,521.611 
    610.468,524.658 630.785,524.658 630.785,511.803 620.627,511.803 620.627,493.167 653.473,460.32 653.473,452.786 
    660.796,445.463 660.796,440.088 671.674,440.088 671.674,431.707   "/>
  <polygon id="city-NAN" fill="none" stroke="#000000" strokeWidth="4" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    935.398,487.655 925.132,477.389 899.767,477.389 881.449,459.072 812.9,459.072 802.318,469.654 785.196,452.532 762.787,452.532 
    750.149,439.913 737.959,452.104 728.44,452.104 714.848,465.696 696.774,465.696 671.166,440.088 660.796,440.088 
    660.796,445.463 653.473,452.786 653.473,460.32 620.627,493.167 620.627,511.803 630.785,511.791 630.785,524.658 
    610.468,524.658 610.468,544.976 603.357,544.976 571.865,575.826 571.865,586.626 586.952,601.864 599.294,601.864 
    607.929,610.499 611.484,606.943 631.801,627.26 614.532,644.53 614.532,678.054 631.801,695.323 652.119,695.323 652.119,703.45 
    685.445,736.875 718.005,704.321 730.34,716.656 824.274,622.722 907.102,539.895 895.13,527.923   "/>
  <polygon id="city-YLN" fill="none" stroke="#000000" strokeWidth="4" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    603.357,544.976 610.468,544.976 610.468,521.611 596.077,507.219 583.04,507.219 545.03,469.209 545.03,463.029 535.929,453.929 
    513.284,453.929 501.119,441.764 503.718,439.157 487.549,423.072 455.38,423.072 445.898,432.215 445.898,437.294 
    454.025,437.294 454.025,441.527 389.01,507.389 389.01,525.736 402.216,538.88 478.237,538.88 496.692,538.88 496.692,544.976 
    525.136,544.976 525.136,564.277 589.643,628.784 607.929,610.499 599.294,601.864 586.952,601.864 571.865,586.626 
    571.865,575.826   "/>
  <polygon id="city-CYI" fill="none" stroke="#000000" strokeWidth="4" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    631.801,695.323 614.532,678.054 614.532,644.53 631.801,627.26 611.484,606.943 589.643,628.784 525.136,564.277 525.136,544.976 
    496.692,544.976 496.692,538.88 441.835,538.88 402.216,538.88 385.886,522.627 374.788,522.627 374.788,531.769 381.561,538.611 
    362.313,557.897 362.344,574.182 345.941,574.287 334.63,585.61 338.217,585.61 338.217,604.912 352.947,620.15 383.931,620.15 
    398.022,605.927 422.534,605.927 436.417,620.15 457.073,620.15 476.374,640.086 470.279,646.731 470.279,661.8 480.438,671.07 
    480.438,679.07 469.263,679.07 454.025,693.461 454.025,721.736 475.296,721.736 492.379,738.881 515.231,715.641 583.04,715.641 
    595.484,703.45 652.119,703.45 652.119,695.323   "/>
  <polygon id="city-CYC" fill="none" stroke="#000000" strokeWidth="4" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    466.275,578.91 456.057,588.413 456.057,599.832 466.216,599.832 466.216,614.054 498.723,614.054 498.723,598.816 
    488.565,589.167 488.565,583.832 471.558,583.842   "/>
  <polygon id="city-TNN" fill="none" stroke="#000000" strokeWidth="4" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    475.358,721.736 454.025,721.736 454.025,705.482 454.025,693.461 469.263,679.07 480.438,679.07 480.438,671.07 470.279,661.8 
    470.279,646.731 476.967,640.128 457.073,620.15 436.078,620.15 422.534,605.927 397.891,605.927 383.931,620.15 352.947,620.15 
    338.217,604.912 338.217,585.61 334.769,585.61 288.473,632.407 288.36,632.295 268.123,652.657 260.123,652.657 246.789,665.863 
    246.789,676.911 255.364,686.435 256.465,685.698 263.043,692.276 263.043,717.672 263.043,745.101 271.17,753.227 
    283.361,765.418 283.361,773.545 298.598,788.783 307.029,788.783 319.932,801.837 331.297,790.624 343.228,802.556 
    366.093,779.691 366.352,779.95 371.741,774.561 456.823,774.561 492.379,738.881  "/>
  <polygon id="city-KHH" fill="none" stroke="#000000" strokeWidth="4" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    652.119,703.45 595.484,703.45 583.04,715.641 515.231,715.641 457.073,774.561 370.979,774.561 343.296,802.624 331.106,790.814 
    319.932,801.989 306.725,788.783 298.598,788.783 298.599,789.042 298.598,788.952 283.361,773.545 283.361,765.418 
    263.043,745.101 263.043,771.513 252.885,781.035 252.885,843.639 250.853,843.639 250.853,856.337 242.163,865.538 
    238.699,862.053 230.536,870.158 230.536,883.258 236.26,888.982 234.599,890.588 234.599,900.528 234.599,925.839 
    243.742,935.067 237.139,935.067 230.282,928.21 227.403,931.596 239.001,943.194 240.694,943.194 240.694,967.574 
    251.869,967.574 300.591,916.742 300.715,916.866 321.032,896.548 313.963,889.48 353.709,849.734 365.645,861.925 
    417.454,861.925 417.454,878.178 444.883,878.178 469.517,902.559 494.66,902.559 494.66,875.216 587.103,782.688 639.732,782.688 
    685.445,736.875   "/>
  <polygon id="city-PIF" fill="none" stroke="#000000" strokeWidth="4" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    469.517,902.559 444.883,878.178 417.454,878.178 417.454,861.925 365.645,861.925 353.709,849.734 313.854,889.37 
    321.116,896.464 274.415,942.573 274.626,942.784 251.67,966.755 251.869,1000.082 285.392,1033.605 285.392,1089.986 
    279.297,1096.589 279.297,1167.191 243.488,1203.255 253.393,1212.905 236.631,1229.667 244.405,1237.441 251.008,1230.838 
    273.202,1253.032 273.202,1276.396 281.329,1276.396 281.329,1248.46 292.503,1237.794 303.678,1237.794 336.185,1204.27 
    336.185,1180.99 363.148,1154.07 344.312,1135.192 344.312,1084.653 376.82,1051.891 376.82,1016.902 385.154,1008.724 
    385.301,1008.871 424.565,969.606 458.258,969.606 494.66,934.051 494.66,902.559  "/>
  <polygon id="city-ILA" fill="none" stroke="#000000" strokeWidth="4" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1076.749,347.898 1146.844,347.898 1146.844,331.645 1266.715,331.645 1266.715,319.454 1321.572,319.454 1321.572,329.613 
    1286.017,329.613 1219.986,395.475 1219.986,456.596 1180.536,496.214 1149.891,496.214 1115.323,530.782 1076.533,491.992 
    1060.468,508.057 1001.833,449.422 954.398,496.857 940.3,482.759   "/>
  <polygon id="city-HUN" fill="none" stroke="#000000" strokeWidth="4" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1097.989,569.263 1126.083,541.49 1076.388,492.138 1060.45,508.04 1001.824,449.432 954.327,496.786 940.263,482.796 
    895.059,527.852 907.102,539.895 730.34,716.656 718.005,704.322 621.448,800.56 719.304,898.357 811.357,804.665 828.879,821.767 
    908.043,742.488 908.043,728.339 994.682,641.7 1004.115,641.7 1004.115,612.531 1047.458,569.187  "/>
  <polygon id="city-TTT" fill="none" stroke="#000000" strokeWidth="4" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    621.477,800.531 718.485,897.538 811.567,804.455 827.624,820.513 690.721,957.416 653.981,957.416 597.262,1014.304 
    503.125,1014.304 363.106,1154.155 344.312,1135.192 344.312,1084.906 376.82,1051.891 376.82,1016.844 424.565,969.606 
    458.258,969.606 494.66,934.051 494.66,875.3 587.103,782.688 639.928,782.688   "/>
  <polygon id="city-KEL" fill="none" stroke="#000000" strokeWidth="4" strokeLinejoin="bevel" strokeMiterlimit="10" points="
    1242.335,208.278 1242.335,212.888 1245.735,216.288 1241.252,220.771 1241.252,238.884 1265.952,263.584 1277.636,263.584 
    1277.636,257.211 1273.837,253.413 1283.223,244.026 1288.81,249.614 1303.032,249.614 1303.032,244.28 1288.544,229.792 
    1278.652,229.792 1278.652,226.058 1283.421,221.29 1276.68,214.549 1276.68,208.278   "/>
</g>
<polyline opacity="0.3" fill="none" stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" enable-background="new    " points="
  164.5,0 164.5,194.25 0,194.25 "/>
<polyline opacity="0.3" fill="none" stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" enable-background="new    " points="
  435.751,0 435.751,194.25 174.125,194.25 "/>
<polyline opacity="0.3" fill="none" stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" enable-background="new    " points="
  929.25,1111.542 929.25,880.292 1400,880.292 "/>
<g opacity="0.5">
  <path d="M990.252,1063.345v-23.379h1.723v19.441h9.721v-25.102h1.723v25.102h9.721v-19.441h1.723v23.256h-1.723v-2.338h-21.164
    v2.461H990.252z"/>
  <path d="M1019.414,1059.899l-0.492-1.477c1.558-0.409,3.034-0.819,4.43-1.23v-12.797h-3.568v-1.6h3.568v-8.613h1.723v8.613h3.322
    v1.6h-3.322v12.305c0.492-0.163,1.312-0.45,2.461-0.861c0.738-0.163,1.312-0.327,1.723-0.492c0,0.083,0.04,0.329,0.123,0.738
    c0.081,0.329,0.123,0.575,0.123,0.738C1028.108,1057.315,1024.745,1058.342,1019.414,1059.899z M1031.104,1037.997h1.723v6.768
    l5.414-1.969v-8.613h1.6v8.121l7.506-2.707c0,0.492-0.042,1.19-0.123,2.092c-0.083,3.856-0.165,6.194-0.246,7.014
    c-0.083,3.118-1.23,4.595-3.445,4.43c-0.821,0-1.56,0-2.215,0c0-0.327-0.042-0.738-0.123-1.23
    c-0.083-0.163-0.123-0.286-0.123-0.369c0.738,0,1.435,0,2.092,0c1.394,0.165,2.132-0.738,2.215-2.707
    c0.163-2.953,0.246-5.291,0.246-7.014l-5.783,2.092v13.166h-1.6v-12.674l-5.414,1.969v11.566c-0.246,2.132,0.861,3.076,3.322,2.83
    h6.645c2.461,0.163,3.814-0.615,4.061-2.338c0.246-1.23,0.45-2.624,0.615-4.184c0.163,0.083,0.327,0.165,0.492,0.246
    c0.409,0.165,0.778,0.288,1.107,0.369c0,0.165-0.042,0.369-0.123,0.615c-0.165,1.642-0.369,2.872-0.615,3.691
    c-0.329,2.215-2.011,3.28-5.045,3.199h-7.629c-3.199,0.163-4.718-1.149-4.553-3.938v-11.443l-2.584,0.861l-0.246-1.6l2.83-0.984
    L1031.104,1037.997L1031.104,1037.997z"/>
  <path d="M1055.467,1046.979c0,4.43-0.206,7.629-0.615,9.598c-0.492,2.215-1.477,4.511-2.953,6.891
    c-0.165-0.246-0.452-0.492-0.861-0.738c-0.246-0.165-0.411-0.288-0.492-0.369c1.312-1.888,2.173-3.896,2.584-6.029
    c0.492-2.132,0.738-5.291,0.738-9.475v-10.828h26.209v1.477h-11.443l-1.23,3.938h10.213v11.566h-7.875v6.891
    c0,2.05-1.107,3.116-3.322,3.199c-1.149,0-2.338,0-3.568,0c0-0.246-0.083-0.615-0.246-1.107c-0.083-0.246-0.123-0.411-0.123-0.492
    c1.312,0,2.501,0,3.568,0c1.477,0,2.173-0.534,2.092-1.6v-6.891h-8.736v-11.566h6.275l1.107-3.938h-11.32v9.473H1055.467z
     M1062.234,1054.978l1.354,1.107c-1.888,2.052-4.061,4.061-6.521,6.029c-0.083-0.083-0.246-0.288-0.492-0.615
    c-0.246-0.246-0.452-0.452-0.615-0.615C1057.928,1059.572,1060.02,1057.604,1062.234,1054.978z M1061.004,1043.042v3.445h15.012
    v-3.445H1061.004z M1061.004,1047.964v3.568h15.012v-3.568H1061.004z M1079.092,1061.868c-0.903-0.903-2.257-2.132-4.061-3.691
    c-0.903-0.901-1.6-1.558-2.092-1.969l1.107-1.107c1.64,1.396,3.731,3.282,6.275,5.66L1079.092,1061.868z"/>
  <path d="M1082.906,1050.917c-0.165-0.655-0.452-1.271-0.861-1.846c3.362-4.676,5.946-9.679,7.752-15.012l1.6,0.492
    c-0.821,2.298-1.765,4.513-2.83,6.645v22.271h-1.6v-18.826C1085.736,1046.693,1084.383,1048.785,1082.906,1050.917z
     M1092.996,1049.194h7.752v-8.121h-8.613v-1.6h18.826v1.6h-8.49v8.121h7.629v1.6h-7.629v9.352h9.475v1.6h-20.672v-1.6h9.475v-9.352
    h-7.752L1092.996,1049.194L1092.996,1049.194z M1099.764,1034.552l1.477-0.492c0.246,0.492,0.573,1.272,0.984,2.338
    c0.492,1.149,0.819,1.969,0.984,2.461l-1.723,0.492C1101.157,1038.203,1100.583,1036.604,1099.764,1034.552z"/>
  <path d="M1116.252,1063.591l-0.738-1.723l1.477-0.369v-26.086h23.625v9.229h-9.475c0.246,2.215,0.532,4.267,0.861,6.152h11.074v1.6
    h-10.705c0.984,3.199,2.255,5.702,3.814,7.506c1.065,1.147,2.009,1.681,2.83,1.6c0.819,0,1.394-0.534,1.723-1.6
    c0.409-1.723,0.696-3.239,0.861-4.553c0.492,0.246,1.024,0.411,1.6,0.492c-0.083,0.329-0.165,0.78-0.246,1.354
    c-0.165,0.984-0.411,2.011-0.738,3.076c-0.575,1.969-1.6,2.953-3.076,2.953c-1.56,0-2.953-0.738-4.184-2.215
    c-1.888-2.132-3.322-5.003-4.307-8.613h-11.936v8.49c2.461-0.738,4.962-1.6,7.506-2.584c0,0.738,0,1.313,0,1.723
    C1123.02,1061.007,1119.697,1062.195,1116.252,1063.591z M1118.713,1036.89v6.152h20.18v-6.152H1118.713z M1130.402,1050.794
    c-0.411-1.886-0.738-3.938-0.984-6.152h-10.705v6.152H1130.402z"/>
</g>
<g opacity="0.5">
  <path d="M1194.131,1035.536h26.455v1.723h-12.428v13.535h13.781v1.723h-13.781v11.074h-1.723v-11.074h-13.781v-1.723h13.781
    v-13.535h-12.305v-1.723H1194.131z M1195.854,1040.95l1.354-0.984c1.886,2.38,3.731,4.799,5.537,7.26l-1.6,1.107
    C1199.422,1045.709,1197.657,1043.248,1195.854,1040.95z M1212.834,1048.456l-1.477-1.107c2.542-2.87,4.511-5.331,5.906-7.383
    l1.477,0.984c-0.821,1.149-2.175,2.913-4.061,5.291C1213.858,1047.226,1213.243,1047.964,1212.834,1048.456z"/>
  <path d="M1224.154,1059.899l-0.492-1.477c1.558-0.409,3.034-0.819,4.43-1.23v-12.797h-3.568v-1.6h3.568v-8.613h1.723v8.613h3.322
    v1.6h-3.322v12.305c0.492-0.163,1.312-0.45,2.461-0.861c0.738-0.163,1.312-0.327,1.723-0.492c0,0.083,0.04,0.329,0.123,0.738
    c0.081,0.329,0.123,0.575,0.123,0.738C1232.849,1057.315,1229.485,1058.342,1224.154,1059.899z M1235.844,1037.997h1.723v6.768
    l5.414-1.969v-8.613h1.6v8.121l7.506-2.707c0,0.492-0.042,1.19-0.123,2.092c-0.083,3.856-0.165,6.194-0.246,7.014
    c-0.083,3.118-1.23,4.595-3.445,4.43c-0.821,0-1.56,0-2.215,0c0-0.327-0.042-0.738-0.123-1.23
    c-0.083-0.163-0.123-0.286-0.123-0.369c0.738,0,1.435,0,2.092,0c1.394,0.165,2.132-0.738,2.215-2.707
    c0.163-2.953,0.246-5.291,0.246-7.014l-5.783,2.092v13.166h-1.6v-12.674l-5.414,1.969v11.566c-0.246,2.132,0.861,3.076,3.322,2.83
    h6.645c2.461,0.163,3.814-0.615,4.061-2.338c0.246-1.23,0.45-2.624,0.615-4.184c0.163,0.083,0.327,0.165,0.492,0.246
    c0.409,0.165,0.778,0.288,1.107,0.369c0,0.165-0.042,0.369-0.123,0.615c-0.165,1.642-0.369,2.872-0.615,3.691
    c-0.329,2.215-2.011,3.28-5.045,3.199h-7.629c-3.199,0.163-4.718-1.149-4.553-3.938v-11.443l-2.584,0.861l-0.246-1.6l2.83-0.984
    L1235.844,1037.997L1235.844,1037.997z"/>
  <path d="M1260.207,1046.979c0,4.43-0.206,7.629-0.615,9.598c-0.492,2.215-1.477,4.511-2.953,6.891
    c-0.165-0.246-0.452-0.492-0.861-0.738c-0.246-0.165-0.411-0.288-0.492-0.369c1.312-1.888,2.173-3.896,2.584-6.029
    c0.492-2.132,0.738-5.291,0.738-9.475v-10.828h26.209v1.477h-11.443l-1.23,3.938h10.213v11.566h-7.875v6.891
    c0,2.05-1.107,3.116-3.322,3.199c-1.149,0-2.338,0-3.568,0c0-0.246-0.083-0.615-0.246-1.107c-0.083-0.246-0.123-0.411-0.123-0.492
    c1.312,0,2.501,0,3.568,0c1.477,0,2.173-0.534,2.092-1.6v-6.891h-8.736v-11.566h6.275l1.107-3.938h-11.32v9.473H1260.207z
     M1266.975,1054.978l1.354,1.107c-1.888,2.052-4.061,4.061-6.521,6.029c-0.083-0.083-0.246-0.288-0.492-0.615
    c-0.246-0.246-0.452-0.452-0.615-0.615C1262.668,1059.572,1264.76,1057.604,1266.975,1054.978z M1265.744,1043.042v3.445h15.012
    v-3.445H1265.744z M1265.744,1047.964v3.568h15.012v-3.568H1265.744z M1283.832,1061.868c-0.903-0.903-2.257-2.132-4.061-3.691
    c-0.903-0.901-1.6-1.558-2.092-1.969l1.107-1.107c1.64,1.396,3.731,3.282,6.275,5.66L1283.832,1061.868z"/>
  <path d="M1287.646,1050.917c-0.165-0.655-0.452-1.271-0.861-1.846c3.362-4.676,5.946-9.679,7.752-15.012l1.6,0.492
    c-0.821,2.298-1.765,4.513-2.83,6.645v22.271h-1.6v-18.826C1290.477,1046.693,1289.123,1048.785,1287.646,1050.917z
     M1297.736,1049.194h7.752v-8.121h-8.613v-1.6h18.826v1.6h-8.49v8.121h7.629v1.6h-7.629v9.352h9.475v1.6h-20.672v-1.6h9.475v-9.352
    h-7.752L1297.736,1049.194L1297.736,1049.194z M1304.504,1034.552l1.477-0.492c0.246,0.492,0.573,1.272,0.984,2.338
    c0.492,1.149,0.819,1.969,0.984,2.461l-1.723,0.492C1305.897,1038.203,1305.323,1036.604,1304.504,1034.552z"/>
  <path d="M1320.992,1063.591l-0.738-1.723l1.477-0.369v-26.086h23.625v9.229h-9.475c0.246,2.215,0.532,4.267,0.861,6.152h11.074v1.6
    h-10.705c0.984,3.199,2.255,5.702,3.814,7.506c1.065,1.147,2.009,1.681,2.83,1.6c0.819,0,1.394-0.534,1.723-1.6
    c0.409-1.723,0.696-3.239,0.861-4.553c0.492,0.246,1.024,0.411,1.6,0.492c-0.083,0.329-0.165,0.78-0.246,1.354
    c-0.165,0.984-0.411,2.011-0.738,3.076c-0.575,1.969-1.6,2.953-3.076,2.953c-1.56,0-2.953-0.738-4.184-2.215
    c-1.888-2.132-3.322-5.003-4.307-8.613h-11.936v8.49c2.461-0.738,4.962-1.6,7.506-2.584c0,0.738,0,1.313,0,1.723
    C1327.76,1061.007,1324.438,1062.195,1320.992,1063.591z M1323.453,1036.89v6.152h20.18v-6.152H1323.453z M1335.143,1050.794
    c-0.411-1.886-0.738-3.938-0.984-6.152h-10.705v6.152H1335.143z"/>
</g>
<g opacity="0.5">
  <path d="M90.94,168.254c5.66,0.164,11.074,0.164,16.242,0c-0.083,0.327-0.246,0.696-0.492,1.107
    c0.081-0.083,0.041,0.081-0.123,0.492c-7.302,0-12.593-0.042-15.873-0.123c-4.02,0.081-6.933-1.107-8.736-3.568
    c-1.396,1.148-2.626,2.461-3.691,3.938l-0.984-1.6c0.656-0.658,1.6-1.557,2.83-2.707c0.492-0.492,0.861-0.861,1.107-1.107v-8.244
    h-3.568v-1.6h5.168v9.967C84.542,167.27,87.249,168.417,90.94,168.254z M82.327,152.381c-1.396-1.394-2.996-2.911-4.799-4.553
    l1.23-1.107c0.656,0.658,1.846,1.723,3.568,3.199c0.656,0.575,1.107,0.984,1.354,1.23L82.327,152.381z M82.819,146.967
    c-1.23-1.311-2.79-2.83-4.676-4.553l1.23-1.107c0.246,0.246,0.696,0.658,1.354,1.23c1.803,1.559,2.953,2.626,3.445,3.199
    L82.819,146.967z M87.495,148.689h7.752v-2.953h-8.982v-1.354h8.982v-2.83h1.6v2.83h9.105v1.354h-9.105v2.953h7.875v10.705h-7.875
    v3.076h9.967v1.354h-9.967v3.322h-1.6v-3.322h-9.844v-1.354h9.844v-3.076h-7.752V148.689z M89.094,150.043v3.322h6.152v-3.322
    H89.094z M89.094,154.719v3.445h6.152v-3.445H89.094z M103.122,150.043h-6.275v3.322h6.275V150.043z M96.846,154.719v3.445h6.275
    v-3.445H96.846z"/>
  <path d="M114.196,155.211c-2.134-1.64-3.938-2.953-5.414-3.938l1.107-1.23c0.738,0.492,1.969,1.313,3.691,2.461
    c0.819,0.575,1.434,0.984,1.846,1.23L114.196,155.211z M109.889,169.361c1.311-2.542,2.707-6.029,4.184-10.459
    c0.573,0.329,1.148,0.615,1.723,0.861c-1.313,3.119-2.667,6.645-4.061,10.582L109.889,169.361z M115.549,147.213
    c-1.642-1.394-3.365-2.748-5.168-4.061l1.23-1.23c1.723,1.23,3.445,2.503,5.168,3.814L115.549,147.213z M117.149,166.9h9.967
    v-20.918h-8.121v-1.6h18.457v1.6h-8.613V166.9h9.844v1.354H117.15L117.149,166.9L117.149,166.9z"/>
</g>
<g opacity="0.5">
  <path d="M219.938,152.381c-5.826-2.132-10.418-5.168-13.781-9.105c-3.611,3.857-8.244,7.056-13.904,9.598
    c-0.246-0.492-0.615-0.984-1.107-1.477c6.808-2.953,11.73-6.398,14.766-10.336l1.846,0.369c-0.083,0.083-0.166,0.206-0.246,0.369
    c-0.166,0.166-0.289,0.289-0.369,0.369c3.691,4.02,8.244,6.933,13.658,8.736C220.553,151.316,220.264,151.808,219.938,152.381z
     M196.312,151.396h18.949v1.6h-8.367v5.045h11.074v1.477h-11.074v8.367h13.043v1.6h-27.809v-1.6h13.043v-8.367h-11.074v-1.477
    h11.074v-5.045h-8.859V151.396z M195.697,162.102l1.354-0.984c0.902,0.904,2.172,2.215,3.814,3.938
    c-0.166-0.081-0.083,0.042,0.246,0.369l-1.354,1.107C198.773,165.301,197.42,163.824,195.697,162.102z M211.816,166.531
    l-1.23-1.107c1.477-1.311,2.911-2.748,4.307-4.307l1.354,0.984C214.933,163.578,213.457,165.055,211.816,166.531z"/>
  <path d="M224.859,142.783h10.705v11.566h-9.105v16.119h-1.6V142.783z M226.459,144.26v3.568h7.506v-3.568H226.459z
     M226.459,152.996h7.506v-3.691h-7.506V152.996z M246.023,168.5c2.049,0.164,2.994-0.698,2.83-2.584V154.35h-9.229v-11.566h10.951
    v23.379c0.081,2.625-1.313,3.978-4.184,4.061c-1.642,0-3.036,0-4.184,0c0-0.166-0.042-0.369-0.123-0.615
    c-0.083-0.492-0.166-0.904-0.246-1.23C242.905,168.458,244.301,168.5,246.023,168.5z M241.225,144.26v3.568h7.629v-3.568H241.225z
     M241.225,149.305v3.691h7.629v-3.691H241.225z"/>
</g>
<g opacity="0.5">
  <path d="M1276.445,104.83l-2.461-2.584c-7.875,0.083-14.931,0.329-21.164,0.738c-1.067,0-2.052,0.123-2.953,0.369l-0.861-1.846
    l3.691-0.123c2.378-2.707,5.126-6.356,8.244-10.951l1.723,0.861c-2.298,3.199-4.841,6.521-7.629,9.967l17.473-0.615
    c-0.492-0.573-1.313-1.394-2.461-2.461c-1.067-1.065-1.888-1.846-2.461-2.338l1.354-0.984c1.394,1.23,3.403,3.159,6.029,5.783
    c1.394,1.313,2.419,2.297,3.076,2.953L1276.445,104.83z M1273.738,106.799v13.166h-1.723v-1.969h-17.965v1.969h-1.723v-13.166
    H1273.738z M1254.051,108.398v7.998h17.965v-7.998H1254.051z"/>
  <path d="M1280.137,99.662h8.859v-8.736h1.846v28.793h-1.846v-6.398c-0.575,0.246-1.642,0.698-3.199,1.354
    c-2.544,1.067-4.349,1.763-5.414,2.092l-0.738-1.6c3.116-1.065,6.233-2.255,9.352-3.568v-10.336h-8.859v-1.601H1280.137z
     M1308.93,98.432c-3.118,1.723-6.235,3.405-9.352,5.045v11.197c-0.083,1.723,0.738,2.542,2.461,2.461h1.969
    c1.969,0.164,3.076-0.698,3.322-2.584c0-0.246,0.04-0.615,0.123-1.107c0.163-1.23,0.286-2.215,0.369-2.953
    c0.327,0.166,0.861,0.369,1.6,0.615c-0.165,1.396-0.329,2.707-0.492,3.938c-0.246,2.625-1.846,3.895-4.799,3.814h-2.461
    c-2.707,0.081-4.021-1.23-3.938-3.938V90.926h1.846v10.705c3.526-1.803,6.275-3.363,8.244-4.676L1308.93,98.432z"/>
</g>
<g opacity="0.5">
  <path d="M1130.129,129.262c-0.165-0.246-0.492-0.575-0.984-0.984c-0.083-0.081-0.165-0.164-0.246-0.246
    c2.953-2.049,5.208-4.51,6.768-7.383h-5.783v-1.477h6.275v-3.199h1.6v3.199h5.906v1.477h-5.906v1.23l0.738-0.615
    c2.296,2.215,4.019,4.061,5.168,5.537l-1.23,1.107c-1.642-2.215-3.199-4.101-4.676-5.66v9.475h-1.6v-9.721
    C1134.763,124.875,1132.753,127.293,1130.129,129.262z M1129.145,113.635h8.736c0.984-1.723,1.927-3.403,2.83-5.045l1.477,0.738
    c-0.821,1.477-1.683,2.913-2.584,4.307h4.922v1.354h-15.381V113.635z M1136.158,103.176h1.6v3.199h5.906v1.477h-13.658v-1.477
    h6.152V103.176z M1131.605,109.328l1.354-0.738c0.819,1.15,1.64,2.461,2.461,3.938l-1.354,0.738
    C1133.245,111.789,1132.425,110.478,1131.605,109.328z M1142.311,130.861c2.788-2.788,4.101-7.383,3.938-13.781v-11.689
    c3.362-0.164,7.137-0.533,11.32-1.107l0.492,1.6c-2.953,0.412-6.358,0.738-10.213,0.984v7.875h11.074v1.477h-4.184v15.996h-1.723
    V116.22h-5.168v0.984c0.163,6.564-1.19,11.484-4.061,14.766C1143.295,131.64,1142.803,131.271,1142.311,130.861z"/>
  <path d="M1161.137,111.912h8.859v-8.736h1.846v28.793h-1.846v-6.398c-0.575,0.246-1.642,0.698-3.199,1.354
    c-2.544,1.067-4.349,1.763-5.414,2.092l-0.738-1.6c3.116-1.065,6.233-2.255,9.352-3.568v-10.336h-8.859v-1.601H1161.137z
     M1189.93,110.682c-3.118,1.723-6.235,3.405-9.352,5.045v11.197c-0.083,1.723,0.738,2.542,2.461,2.461h1.969
    c1.969,0.164,3.076-0.698,3.322-2.584c0-0.246,0.04-0.615,0.123-1.107c0.163-1.23,0.286-2.215,0.369-2.953
    c0.327,0.166,0.861,0.369,1.6,0.615c-0.165,1.396-0.329,2.707-0.492,3.938c-0.246,2.625-1.846,3.895-4.799,3.814h-2.461
    c-2.707,0.081-4.021-1.23-3.938-3.938v-23.994h1.846v10.705c3.526-1.803,6.275-3.363,8.244-4.676L1189.93,110.682z"/>
</g>
<g opacity="0.5">
  <path d="M1295.641,207.561h6.152v-10.828h-5.168v-1.477h5.168v-3.199h1.6v3.199h13.781v-3.199h1.723v3.199h5.168v1.477h-5.168
    v10.828h6.029v1.477h-9.475c2.378,2.461,5.577,4.389,9.598,5.783c-0.083,0.166-0.206,0.412-0.369,0.738
    c-0.246,0.329-0.411,0.575-0.492,0.738c-4.922-1.969-8.45-4.387-10.582-7.26h-6.768c-2.544,2.953-5.989,5.537-10.336,7.752
    c-0.246-0.492-0.575-0.984-0.984-1.477c3.938-1.723,7.054-3.814,9.352-6.275h-9.229L1295.641,207.561L1295.641,207.561z
     M1309.545,210.637h1.6v2.953h7.137v1.354h-7.137v3.568h11.936v1.354h-25.717v-1.354h12.182v-3.568h-7.26v-1.354h7.26
    L1309.545,210.637L1309.545,210.637z M1303.393,196.732v2.707h13.781v-2.707H1303.393z M1303.393,200.793v2.707h13.781v-2.707
    H1303.393z M1303.393,204.854v2.707h13.781v-2.707H1303.393z"/>
  <path d="M1336.123,211.498c0.081,2.461-0.821,3.814-2.707,4.061c-0.492,0.083-1.149,0.123-1.969,0.123
    c-0.165-0.573-0.369-1.107-0.615-1.6c1.147,0,1.804-0.041,1.969-0.123c1.312,0,1.927-0.819,1.846-2.461
    c0.081-2.378-0.821-4.799-2.707-7.26l2.953-8.859h-5.045v26.209h-1.477v-27.686h8.244v1.477l-2.953,8.613
    C1335.385,206.29,1336.204,208.791,1336.123,211.498z M1345.967,207.191h1.6v2.584h7.137v1.354h-7.137v3.322h6.645v1.354h-6.645
    v3.322h8.982v1.354h-20.303v-1.354h9.721v-3.322h-6.275v-1.354h6.275v-3.322h-5.414c-0.903,1.477-1.846,2.83-2.83,4.061
    c-0.411-0.41-0.861-0.696-1.354-0.861c1.886-2.049,3.322-4.347,4.307-6.891l1.477,0.492c-0.083,0.166-0.246,0.452-0.492,0.861
    c-0.165,0.412-0.329,0.738-0.492,0.984h4.799v-2.584H1345.967z M1338.461,200.055c-0.575-0.573-0.984-0.942-1.23-1.107
    c2.624-2.295,4.634-4.676,6.029-7.137l1.477,0.615c-0.165,0.246-0.411,0.615-0.738,1.107c-0.329,0.575-0.575,0.984-0.738,1.23
    h10.705v1.477c-1.723,2.134-3.568,3.734-5.537,4.799c2.05,0.904,4.799,1.559,8.244,1.969c-0.083,0.166-0.206,0.412-0.369,0.738
    c-0.246,0.412-0.411,0.698-0.492,0.861c-3.856-0.738-6.851-1.64-8.982-2.707c-2.461,1.23-5.579,2.257-9.352,3.076
    c-0.165-0.327-0.411-0.779-0.738-1.354c0.081,0.083,0.04,0-0.123-0.246c3.445-0.656,6.275-1.434,8.49-2.338
    c-1.396-1.065-2.707-2.338-3.938-3.814C1340.347,198.128,1339.445,199.07,1338.461,200.055z M1340.676,205.1h11.689v1.354h-11.689
    V205.1z M1351.996,196.117h-9.721c1.312,1.723,2.83,3.076,4.553,4.061C1348.878,199.113,1350.601,197.759,1351.996,196.117z"/>
</g>
<g opacity="0.5">
  <path d="M1005.51,109.725c-0.246-0.738-0.492-1.394-0.738-1.969c1.723-3.034,3.116-6.808,4.184-11.32h-3.814v-1.477h3.814V88.93
    h1.6v6.029h3.322v1.477h-3.322v4.43l0.615-0.615c1.147,0.821,2.338,1.805,3.568,2.953l-1.107,1.107
    c-0.984-0.984-2.011-1.926-3.076-2.83v16.734h-1.6v-18.211C1008.217,103.449,1007.067,106.691,1005.51,109.725z M1020.029,89.299
    h1.6v11.074c0,4.841-0.452,8.49-1.354,10.951c-0.903,2.297-2.707,4.633-5.414,7.014c-0.165-0.246-0.575-0.698-1.23-1.354
    c3.938-2.788,5.987-6.725,6.152-11.812c-1.642,1.23-3.568,2.667-5.783,4.307l-0.861-1.6c0.492-0.327,1.23-0.819,2.215-1.477
    c1.969-1.311,3.485-2.338,4.553-3.076c0-0.327,0.04-0.819,0.123-1.477c0-0.656,0-1.148,0-1.477L1020.029,89.299L1020.029,89.299z
     M1014.738,94.467l1.354-0.615c0.246,0.492,0.573,1.273,0.984,2.338c0.901,2.051,1.558,3.488,1.969,4.307l-1.6,0.738
    c-0.492-1.311-1.272-3.24-2.338-5.783C1014.942,95.042,1014.819,94.713,1014.738,94.467z M1033.072,108.74
    c-2.707-1.723-4.799-2.994-6.275-3.814v9.475c0,0.984,0.655,1.477,1.969,1.477h1.723c1.23,0,1.969-0.535,2.215-1.6
    c0-0.246,0.04-0.615,0.123-1.107c0.163-0.984,0.246-1.763,0.246-2.338c0.492,0.246,0.984,0.412,1.477,0.492
    c-0.083,1.313-0.246,2.42-0.492,3.322c-0.329,1.803-1.437,2.707-3.322,2.707h-2.338c-2.134,0-3.199-0.944-3.199-2.83V89.176h1.6
    v14.027c0.655,0.329,1.558,0.821,2.707,1.477c1.886,1.067,3.362,1.928,4.43,2.584L1033.072,108.74z M1027.658,100.127
    c1.723-2.542,3.034-4.756,3.938-6.645l1.477,0.861c-1.067,1.888-2.421,4.103-4.061,6.645L1027.658,100.127z"/>
  <path d="M1038.24,90.406h26.209v27.809h-1.6v-1.477h-23.133v1.477h-1.477V90.406H1038.24z M1039.717,91.76v23.625h23.133V91.76
    H1039.717z M1041.07,111.447c3.608-1.394,6.603-2.994,8.982-4.799h-6.152v-5.168h14.766v5.168h-6.768
    c-0.165,0.166-0.369,0.369-0.615,0.615s-0.738,0.615-1.477,1.107v4.184l4.676-0.861c0,0.246,0,0.698,0,1.354
    c-0.738,0.166-2.38,0.452-4.922,0.861c-1.806,0.246-3.076,0.452-3.814,0.615l-0.246-1.477l2.83-0.369v-3.199
    c-1.642,1.067-3.774,2.174-6.398,3.322c0-0.081-0.083-0.164-0.246-0.246C1041.603,112.309,1041.397,111.939,1041.07,111.447z
     M1041.316,98.281h9.229v-2.215h-7.137v-1.23h7.137v-2.338h1.477v2.338h7.137v1.23h-7.137v2.215h9.229v1.354h-19.934v-1.354
    H1041.316z M1045.254,102.711v2.707h11.936v-2.707H1045.254z M1052.145,109.479l0.861-1.107l2.707,1.477
    c0.655-0.492,1.6-1.188,2.83-2.092c0.409-0.41,0.738-0.696,0.984-0.861l0.984,0.984l-3.445,2.584
    c1.394,0.738,2.747,1.436,4.061,2.092l-0.861,1.23C1057.722,112.391,1055.015,110.955,1052.145,109.479z"/>
</g>
<g opacity="0.5">
  <path d="M890.379,162.512c-0.165-0.246-0.492-0.575-0.984-0.984c-0.083-0.081-0.165-0.164-0.246-0.246
    c2.953-2.049,5.208-4.51,6.768-7.383h-5.783v-1.477h6.275v-3.199h1.6v3.199h5.906v1.477h-5.906v1.23l0.738-0.615
    c2.296,2.215,4.019,4.061,5.168,5.537l-1.23,1.107c-1.642-2.215-3.199-4.101-4.676-5.66v9.475h-1.6v-9.721
    C895.013,158.125,893.003,160.543,890.379,162.512z M889.395,146.885h8.736c0.984-1.723,1.927-3.403,2.83-5.045l1.477,0.738
    c-0.821,1.477-1.683,2.913-2.584,4.307h4.922v1.354h-15.381L889.395,146.885L889.395,146.885z M896.408,136.426h1.6v3.199h5.906
    v1.477h-13.658v-1.477h6.152L896.408,136.426L896.408,136.426z M891.855,142.578l1.354-0.738c0.819,1.15,1.64,2.461,2.461,3.938
    l-1.354,0.738C893.495,145.039,892.675,143.728,891.855,142.578z M902.561,164.111c2.788-2.788,4.101-7.383,3.938-13.781v-11.689
    c3.362-0.164,7.137-0.533,11.32-1.107l0.492,1.6c-2.953,0.412-6.358,0.738-10.213,0.984v7.875h11.074v1.477h-4.184v15.996h-1.723
    V149.47h-5.168v0.984c0.163,6.564-1.19,11.484-4.061,14.766C903.545,164.89,903.053,164.521,902.561,164.111z"/>
  <path d="M922.248,148.361c-0.165-0.164-0.452-0.369-0.861-0.615c-0.165-0.164-0.329-0.287-0.492-0.369
    c2.624-3.445,4.716-7.217,6.275-11.32l1.723,0.615c-0.821,1.888-1.723,3.691-2.707,5.414h8.367v1.6h-6.029v21.656h-1.723v-21.656
    h-1.477c-0.492,0.821-1.23,1.928-2.215,3.322C922.698,147.583,922.411,148.035,922.248,148.361z M933.691,147.746
    c2.788-3.526,5.085-7.423,6.891-11.689l1.6,0.615c-0.738,1.888-1.642,3.691-2.707,5.414h11.074v1.6h-5.045v18.211
    c0.081,2.049-1.026,3.117-3.322,3.199c-0.903,0-2.052,0-3.445,0c0-0.166-0.042-0.452-0.123-0.861
    c-0.083-0.412-0.165-0.698-0.246-0.861c0.409,0,1.024,0.041,1.846,0.123c0.655,0,1.107,0,1.354,0c1.558,0,2.296-0.615,2.215-1.846
    v-17.965h-5.291c-0.984,1.723-2.134,3.405-3.445,5.045C934.634,148.321,934.184,147.992,933.691,147.746z"/>
</g>
<g opacity="0.5">
  <path d="M765.514,190.498h8.244v-3.445h1.6v3.445h9.352v-3.445h1.6v3.445h8.49v1.6h-8.49v3.076h-1.6v-3.076h-9.352v3.076h-1.6
    v-3.076h-8.244V190.498z M768.344,197.389h23.379v18.58H790v-1.846h-20.057v1.846h-1.6L768.344,197.389L768.344,197.389z
     M769.943,198.865v6.275h9.229v-6.275H769.943z M769.943,206.617v6.029h9.229v-6.029H769.943z M790,198.865h-9.229v6.275H790
    V198.865z M780.771,206.617v6.029H790v-6.029H780.771z"/>
  <path d="M797.875,215.354c-0.165-0.246-0.452-0.615-0.861-1.107c-0.165-0.246-0.288-0.412-0.369-0.492
    c5.168-1.477,9.392-3.691,12.674-6.645h-12.182v-1.477h13.535v-2.83h1.723v2.83h13.658v1.477h-12.428
    c3.034,3.036,7.3,5.087,12.797,6.152c-0.411,0.573-0.738,1.148-0.984,1.723c-6.152-1.888-10.501-4.347-13.043-7.383v8.613h-1.723
    v-8.613C808.046,210.474,803.781,213.056,797.875,215.354z M797.629,188.406h27.809v1.477h-9.352v3.938h7.752v7.752h-24.609v-7.752
    h7.629v-3.938h-9.229L797.629,188.406L797.629,188.406z M800.828,195.297v4.922h6.029v-4.922H800.828z M808.457,189.883v3.938
    h6.029v-3.938H808.457z M808.457,195.297v4.922h6.029v-4.922H808.457z M822.238,195.297h-6.152v4.922h6.152V195.297z"/>
</g>
<g opacity="0.5">
  <path d="M665.695,274.58l-2.461-2.584c-7.875,0.083-14.931,0.329-21.164,0.738c-1.067,0-2.052,0.123-2.953,0.369l-0.861-1.846
    l3.691-0.123c2.378-2.707,5.126-6.356,8.244-10.951l1.723,0.861c-2.298,3.199-4.841,6.521-7.629,9.967l17.473-0.615
    c-0.492-0.573-1.313-1.394-2.461-2.461c-1.067-1.065-1.888-1.846-2.461-2.338l1.354-0.984c1.394,1.23,3.403,3.159,6.029,5.783
    c1.394,1.313,2.419,2.297,3.076,2.953L665.695,274.58z M662.988,276.549v13.166h-1.723v-1.969H643.3v1.969h-1.723v-13.166H662.988z
     M643.301,278.148v7.998h17.965v-7.998H643.301z"/>
  <path d="M670.863,266.951h12.059v-6.768h1.723v6.768h12.059v13.412h-1.723v-1.723h-10.336v11.32h-1.723v-11.32h-10.336v1.723
    h-1.723V266.951z M672.586,268.551v8.49h10.336v-8.49H672.586z M694.98,268.551h-10.336v8.49h10.336V268.551z"/>
</g>
<g opacity="0.5">
  <path d="M506.268,355.805h8.244v-2.953h-6.398v-8.982h14.396v8.982h-6.398v2.953h7.998v1.354h-7.998v4.43h-1.6v-4.43h-8.244
    L506.268,355.805L506.268,355.805z M509.59,337.471l1.107-0.861c0.327,0.329,0.738,0.781,1.23,1.354
    c0.573,0.658,0.984,1.15,1.23,1.477l-1.107,0.861h4.799c0.492-0.738,1.107-1.723,1.846-2.953c0.246-0.41,0.409-0.696,0.492-0.861
    l1.354,0.738c-0.246,0.412-0.657,0.984-1.23,1.723c-0.411,0.575-0.698,1.027-0.861,1.354h5.66v1.354h-17.719v-1.354h5.414
    c-0.246-0.327-0.615-0.819-1.107-1.477C510.205,338.251,509.836,337.799,509.59,337.471z M514.266,332.057h1.6v2.953h7.137v1.354
    h-15.627v-1.354h6.891L514.266,332.057L514.266,332.057z M509.59,345.223v2.461h11.32v-2.461H509.59z M509.59,349.037v2.461h11.32
    v-2.461H509.59z M524.725,361.465c-0.246-0.412-0.615-0.861-1.107-1.354c4.593-2.542,8.202-5.947,10.828-10.213l1.477,0.861
    C532.969,355.189,529.235,358.758,524.725,361.465z M525.709,350.514c-0.329-0.492-0.698-0.942-1.107-1.354
    c3.772-2.378,6.808-5.249,9.105-8.613l1.477,0.984C532.312,345.223,529.154,348.218,525.709,350.514z M526.201,340.916
    c-0.083-0.164-0.246-0.369-0.492-0.615c-0.246-0.327-0.452-0.533-0.615-0.615c3.034-1.886,5.495-4.224,7.383-7.014l1.354,0.984
    C531.861,336.363,529.317,338.784,526.201,340.916z"/>
  <path d="M538.629,349.16c-0.165-0.41-0.452-0.861-0.861-1.354c-0.083-0.164-0.165-0.287-0.246-0.369
    c3.608-4.264,6.521-9.269,8.736-15.012l1.723,0.492c-1.23,2.79-2.503,5.374-3.814,7.752v20.795h-1.6v-17.842
    C541.336,345.592,540.022,347.438,538.629,349.16z M552.902,332.672h1.723v13.166c3.526-2.625,6.726-5.783,9.598-9.475l1.6,0.984
    c-3.61,4.43-7.343,7.958-11.197,10.582v8.121c-0.083,1.805,0.942,2.665,3.076,2.584h4.061c1.969,0.081,3.076-0.535,3.322-1.846
    c0.163-0.738,0.409-2.542,0.738-5.414c0.327,0.246,0.861,0.452,1.6,0.615c-0.083,1.969-0.329,3.734-0.738,5.291
    c-0.329,2.049-1.929,3.076-4.799,3.076h-4.676c-2.953,0.081-4.39-1.273-4.307-4.061L552.902,332.672L552.902,332.672z"/>
</g>
<g opacity="0.5">
  <path d="M375.1,471.715c-0.738-0.492-1.642-1.149-2.707-1.969c-6.973,0.246-13.987,0.573-21.041,0.984l-0.246-1.6h3.568
    c1.969-1.394,3.732-2.87,5.291-4.43h-11.074v-1.354h29.162v1.354h-15.996c-0.984,1.149-2.667,2.584-5.045,4.307
    c5.249-0.165,9.761-0.329,13.535-0.492l-3.445-1.846l1.107-1.107c0.41,0.246,1.188,0.738,2.338,1.477
    c2.707,1.64,4.593,2.83,5.66,3.568L375.1,471.715z M351.598,443.906h23.871v1.354h-11.197v2.584h13.166v5.291h-1.477v-4.061
    h-11.689v8.49h-1.6v-8.49h-11.566v4.061h-1.6v-5.291h13.166v-2.584h-11.074V443.906z M375.592,460.395h-24.117v-1.354h24.117
    V460.395z M353.443,451.658h7.137v1.23h-7.137V451.658z M353.443,455.227h7.137v1.23h-7.137V455.227z M366.486,451.658h7.137v1.23
    h-7.137V451.658z M366.486,455.227h7.137v1.23h-7.137V455.227z"/>
  <path d="M381.129,464.578c-0.083-0.163-0.246-0.45-0.492-0.861c-0.246-0.409-0.452-0.696-0.615-0.861
    c2.953-3.526,5.125-7.669,6.521-12.428h-5.045v-1.477h5.168v-6.398h1.723v6.398h4.676v1.477h-4.676v4.307l0.984-0.861
    c1.23,0.903,2.748,2.215,4.553,3.938l-1.23,1.107c-1.396-1.394-2.83-2.747-4.307-4.061v16.857h-1.723v-18.457
    C385.436,457.606,383.59,461.379,381.129,464.578z M399.709,442.553h1.6v6.398h7.752v1.477h-7.752
    c2.05,6.071,4.962,10.87,8.736,14.396c-0.083,0.083-0.206,0.246-0.369,0.492c-0.411,0.411-0.698,0.78-0.861,1.107
    c-3.528-3.691-6.029-8.038-7.506-13.043v18.334h-1.6v-18.211c-1.723,5.087-4.349,9.475-7.875,13.166
    c-0.412-0.492-0.861-0.942-1.354-1.354c4.184-4.101,7.217-9.063,9.105-14.889h-4.799v-1.477h4.922v-6.396H399.709z"/>
</g>
<g opacity="0.5">
  <path d="M86.213,406.473c-0.984-0.984-2.174-2.215-3.568-3.691l0.984-0.984c0.902,0.821,2.132,2.011,3.691,3.568L86.213,406.473z
     M83.137,421.977c0.984-3.608,1.886-7.423,2.707-11.443c0.327,0.246,0.861,0.452,1.6,0.615c-1.23,4.922-2.092,8.694-2.584,11.32
    L83.137,421.977z M86.705,398.598c-0.658-0.819-1.765-2.009-3.322-3.568l1.107-0.984c1.065,0.904,2.215,2.051,3.445,3.445
    L86.705,398.598z M88.428,421.73l-0.369-1.6c1.557-0.165,4.141-0.492,7.752-0.984c0.573-0.819,1.311-2.132,2.215-3.938
    c0.327-0.655,0.573-1.107,0.738-1.354l1.477,0.738c-0.246,0.411-0.575,1.026-0.984,1.846c-0.738,1.23-1.273,2.134-1.6,2.707
    c1.64-0.081,3.117-0.246,4.43-0.492c-0.166,0.411-0.206,0.861-0.123,1.354C95.482,420.827,90.969,421.401,88.428,421.73z
     M94.334,393.553h1.6v3.199h5.66v1.477h-5.66v3.568h5.045v1.477H89.412v-1.477h4.922v-3.568h-5.537v-1.477h5.537V393.553z
     M89.412,406.104h11.566v6.891H89.412V406.104z M90.273,414.594l1.477-0.615c0.246,0.411,0.615,1.107,1.107,2.092
    c0.573,0.984,0.984,1.723,1.23,2.215l-1.477,0.738c-0.412-0.819-1.15-2.215-2.215-4.184
    C90.314,414.759,90.273,414.677,90.273,414.594z M91.012,407.457v4.061h8.367v-4.061H91.012z M102.578,422.838
    c-0.166-0.246-0.535-0.657-1.107-1.23c3.855-2.38,7.054-5.783,9.598-10.213l1.477,0.861
    C109.838,416.769,106.516,420.294,102.578,422.838z M103.316,402.781c-0.083-0.081-0.123-0.163-0.123-0.246
    c-0.412-0.492-0.738-0.819-0.984-0.984c2.707-1.969,5.045-4.47,7.014-7.506l1.23,0.984
    C108.648,398.065,106.27,400.649,103.316,402.781z M103.562,411.764c-0.166-0.246-0.535-0.655-1.107-1.23
    c3.363-2.378,6.029-5.249,7.998-8.613l1.354,0.984C109.426,406.596,106.679,409.549,103.562,411.764z"/>
  <path d="M118.451,407.211c-1.805-1.64-3.242-2.911-4.307-3.814l1.107-1.107c1.394,0.984,2.871,2.175,4.43,3.568L118.451,407.211z
     M114.883,421.607c1.065-3.034,2.092-6.562,3.076-10.582c0.573,0.329,1.107,0.575,1.6,0.738c-0.412,1.56-1.067,3.897-1.969,7.014
    c-0.492,1.723-0.821,2.911-0.984,3.568L114.883,421.607z M119.559,398.967c-1.477-1.394-2.83-2.625-4.061-3.691l1.107-1.107
    c1.477,1.15,2.871,2.338,4.184,3.568L119.559,398.967z M125.588,393.43h1.6v6.152h4.184v1.477h-4.184v5.66h3.445v10.09h-6.891
    v2.215h-1.6v-12.305h3.445v-5.66h-4.43v-1.477h4.43L125.588,393.43L125.588,393.43z M123.742,408.195v7.26h5.291v-7.26H123.742z
     M133.586,394.906h8.244v24.24c0,1.969-0.944,2.953-2.83,2.953c-0.658,0.081-1.642,0.123-2.953,0.123
    c0-0.492-0.123-1.067-0.369-1.723c0.984,0.081,1.926,0.123,2.83,0.123c1.23,0,1.803-0.492,1.723-1.477v-7.383h-5.414
    c-0.246,4.103-1.846,7.752-4.799,10.951c-0.412-0.329-0.861-0.698-1.354-1.107c2.049-2.052,3.363-4.142,3.938-6.275
    c0.656-2.132,0.984-5.414,0.984-9.844V394.906z M135.062,405.488c0,2.215-0.042,3.814-0.123,4.799h5.291v-6.275h-5.168V405.488z
     M135.062,396.383v6.275h5.168v-6.275H135.062z"/>
</g>
<g opacity="0.5">
  <path d="M297.143,544.818l1.23-0.738h-5.66v-5.168h22.641v5.168h-5.783l1.354,0.738c-0.658,0.821-1.313,1.56-1.969,2.215h9.721
    v1.354h-29.285v-1.354h9.721c-0.166-0.246-0.492-0.615-0.984-1.107S297.306,545.064,297.143,544.818z M294.805,549.248h1.6
    c0,0.246-0.042,0.615-0.123,1.107c0,0.492,0,0.821,0,0.984h7.014c0,0.575-0.042,1.354-0.123,2.338c0,0.657,0,1.149,0,1.477
    c-0.083,2.215-1.436,3.322-4.061,3.322c-1.067,0-1.888,0-2.461,0c0-0.411-0.083-0.944-0.246-1.6c0.246,0,0.656,0.04,1.23,0.123
    c0.656,0,1.065,0,1.23,0c1.803,0.081,2.707-0.575,2.707-1.969c0-0.163,0-0.532,0-1.107c0.081-0.573,0.123-0.984,0.123-1.23h-5.66
    c-0.412,2.626-2.257,4.676-5.537,6.152c-0.246-0.329-0.615-0.738-1.107-1.23c3.199-1.313,4.879-2.953,5.045-4.922h-4.061v-1.354
    h4.307c0-0.163,0-0.45,0-0.861C294.762,549.986,294.805,549.577,294.805,549.248z M292.098,535.59h11.074v-2.092h-13.043v-1.354
    h13.043v-2.461h1.723v2.461h13.043v1.354h-13.043v2.092h11.074v1.354h-23.871V535.59z M294.312,540.266v2.461h19.441v-2.461
    H294.312z M298.496,544.08c0.41,0.411,1.065,1.149,1.969,2.215c0.327,0.329,0.533,0.575,0.615,0.738h5.906
    c0.492-0.492,1.271-1.394,2.338-2.707c0.081-0.081,0.164-0.163,0.246-0.246L298.496,544.08L298.496,544.08z M306.125,550.725
    h10.828v8.121h-1.6v-1.723h-7.629v1.723h-1.6v-8.121H306.125z M307.725,552.078v3.814h7.629v-3.814H307.725z"/>
  <path d="M323.229,537.312h11.443v-2.461h-13.166v-1.354h9.475c-0.575-0.492-1.477-1.188-2.707-2.092
    c-0.412-0.246-0.698-0.45-0.861-0.615l0.984-1.107c1.311,0.821,2.707,1.806,4.184,2.953l-0.738,0.861h6.891l-0.738-0.861
    c1.886-1.147,3.403-2.132,4.553-2.953l0.984,1.23c-0.658,0.492-1.969,1.354-3.938,2.584h10.09v1.354h-13.412v2.461h11.689v1.354
    h-11.689v2.461H350.3v1.477h-29.531v-1.477h13.904v-2.461H323.23v-1.354H323.229z M337.748,543.465h1.6
    c0,1.642,0.123,3.241,0.369,4.799h10.459v1.354h-10.213c0.327,1.56,0.779,2.913,1.354,4.061c1.557-0.984,2.994-2.05,4.307-3.199
    l0.984,0.984c-1.477,1.313-2.953,2.461-4.43,3.445c0.327,0.411,0.819,0.819,1.477,1.23c-0.083-0.083-0.042-0.042,0.123,0.123
    c0.738,0.738,1.517,1.065,2.338,0.984c0.819,0,1.394-0.492,1.723-1.477c0.246-0.409,0.492-1.477,0.738-3.199
    c0.081,0.083,0.204,0.165,0.369,0.246c0.573,0.246,0.984,0.369,1.23,0.369c-0.246,1.313-0.535,2.38-0.861,3.199
    c-0.492,1.723-1.519,2.542-3.076,2.461c-1.23,0.081-2.38-0.369-3.445-1.354c-0.738-0.492-1.396-1.107-1.969-1.846
    c-1.723,0.901-4.061,1.927-7.014,3.076c-0.166-0.492-0.452-0.944-0.861-1.354c0.081,0,0.246-0.042,0.492-0.123
    c3.034-1.067,5.208-2.009,6.521-2.83c-0.658-1.065-1.19-2.665-1.6-4.799h-8.367v2.584c0.656-0.081,1.64-0.163,2.953-0.246
    c1.23-0.163,2.172-0.246,2.83-0.246c0,0.575,0.041,1.026,0.123,1.354c-0.492,0-1.273,0.083-2.338,0.246
    c-1.559,0.083-2.75,0.165-3.568,0.246v1.846c0,2.132-1.107,3.239-3.322,3.322c-1.067,0-2.134,0-3.199,0
    c0-0.165-0.042-0.411-0.123-0.738c-0.083-0.411-0.166-0.698-0.246-0.861c0.902,0.081,1.803,0.123,2.707,0.123
    c1.803,0.081,2.665-0.615,2.584-2.092v-1.477c-1.396,0.165-3.322,0.369-5.783,0.615c-0.658,0.165-1.15,0.246-1.477,0.246
    l-0.246-1.6c2.788-0.163,5.291-0.369,7.506-0.615v-2.707h-7.629v-1.354h7.629v-2.338c-1.805,0.083-3.691,0.123-5.66,0.123
    c0-0.081-0.042-0.246-0.123-0.492c-0.083-0.327-0.166-0.615-0.246-0.861c4.676,0,8.694-0.163,12.059-0.492l0.369,1.354
    c-1.559,0.083-3.159,0.206-4.799,0.369v2.338h8.121C337.871,546.952,337.748,545.353,337.748,543.465z M342.547,544.449
    l1.107-0.984c0.327,0.246,0.902,0.698,1.723,1.354c0.819,0.738,1.394,1.23,1.723,1.477l-1.23,1.107
    C344.719,546.255,343.612,545.271,342.547,544.449z"/>
</g>
<g opacity="0.5">
  <path d="M233.445,619.33l-2.461-2.584c-7.875,0.083-14.931,0.329-21.164,0.738c-1.067,0-2.051,0.123-2.953,0.369l-0.861-1.846
    l3.691-0.123c2.378-2.707,5.125-6.356,8.244-10.951l1.723,0.861c-2.297,3.199-4.841,6.521-7.629,9.967l17.473-0.615
    c-0.492-0.573-1.313-1.394-2.461-2.461c-1.067-1.065-1.888-1.846-2.461-2.338l1.354-0.984c1.394,1.23,3.403,3.159,6.029,5.783
    c1.394,1.313,2.418,2.298,3.076,2.953L233.445,619.33z M230.738,621.299v13.166h-1.723v-1.969H211.05v1.969h-1.723v-13.166H230.738
    z M211.051,622.898v7.998h17.965v-7.998H211.051z"/>
  <path d="M250.672,605.18h1.723v3.568h13.658v1.477h-13.658v3.814h11.936v16.857c0,2.132-1.107,3.239-3.322,3.322
    c-1.23,0-2.75,0-4.553,0c0-0.246-0.083-0.615-0.246-1.107c-0.083-0.246-0.123-0.452-0.123-0.615
    c0.984,0.081,2.418,0.123,4.307,0.123c1.64,0.081,2.418-0.492,2.338-1.723v-15.381h-22.271v18.949h-1.6v-20.426h11.812v-3.814
    h-13.781v-1.477h13.781v-3.567H250.672z M242.551,626.59h8.244v-3.814h-7.26v-1.477h9.105c1.23-1.558,2.338-3.116,3.322-4.676
    l1.477,0.738c-0.984,1.396-1.969,2.707-2.953,3.938h5.168v1.477h-7.26v3.814h8.244v1.477h-8.244v5.66h-1.6v-5.66h-8.244v-1.477
    H242.551z M245.75,617.607l1.23-0.984c0.492,0.492,1.107,1.19,1.846,2.092c0.41,0.492,0.738,0.861,0.984,1.107l-1.477,0.984
    C247.513,619.576,246.652,618.511,245.75,617.607z"/>
</g>
<g opacity="0.5">
  <path d="M186.414,814.81h1.477v3.322h13.658v1.477h-29.531v-1.477h14.396V814.81z M175.34,844.341h-1.6v-13.658h26.086v10.09
    c0.081,2.215-1.027,3.322-3.322,3.322c-0.984,0-2.257,0-3.814,0c0-0.575-0.083-1.107-0.246-1.6c1.065,0,2.215,0,3.445,0
    c1.64,0.081,2.418-0.492,2.338-1.723v-8.613H175.34V844.341z M177.062,822.192h19.318v5.906h-19.318L177.062,822.192
    L177.062,822.192z M178.662,823.669v2.953h16.119v-2.953H178.662z M180.139,834.62h13.289v6.275h-13.289V834.62z M181.738,836.097
    v3.322h10.09v-3.322H181.738z"/>
  <path d="M208.809,815.179l1.6,0.246c-0.246,1.723-0.535,3.364-0.861,4.922h5.291v1.477h-5.537c-1.15,5.087-2.79,9.475-4.922,13.166
    c-0.329-0.492-0.698-0.901-1.107-1.23c2.049-3.691,3.526-7.669,4.43-11.936h-3.938v-1.477h4.184
    C208.274,818.707,208.562,816.984,208.809,815.179z M204.502,841.511l-0.369-1.23c0.656-0.081,1.23-0.123,1.723-0.123
    c2.295-5.741,3.938-10.253,4.922-13.535l1.6,0.492c-1.313,3.691-2.953,7.998-4.922,12.92c0.656-0.081,1.6-0.204,2.83-0.369
    c1.23-0.081,2.172-0.163,2.83-0.246c-0.246-0.655-0.615-1.64-1.107-2.953c-0.246-0.819-0.452-1.435-0.615-1.846l1.477-0.492
    c0.656,1.969,1.517,4.307,2.584,7.014c0.246,0.492,0.41,0.861,0.492,1.107l-1.6,0.615l-0.738-2.092
    c-1.805,0.083-4.43,0.286-7.875,0.615C205.24,841.469,204.829,841.511,204.502,841.511z M214.838,827.853
    c-0.329-0.327-0.738-0.738-1.23-1.23c2.707-3.445,4.676-7.3,5.906-11.566l1.6,0.492c-0.575,1.723-1.23,3.364-1.969,4.922h5.414
    c1.065-2.461,1.763-4.265,2.092-5.414l1.6,0.492c-0.492,1.477-1.15,3.118-1.969,4.922h6.398v1.354h-6.398v5.291h5.783v1.354h-5.783
    v5.414h5.783v1.354h-5.783v5.414h6.521v1.23h-13.904v2.584h-1.6v-20.303c-0.083,0.165-0.246,0.411-0.492,0.738
    C216.314,825.721,215.657,826.705,214.838,827.853z M218.898,821.823v5.291h5.783v-5.291H218.898z M218.898,828.468v5.414h5.783
    v-5.414H218.898z M218.898,835.235v5.414h5.783v-5.414H218.898z"/>
</g>
<g opacity="0.5">
  <path d="M235.072,1049.665h-23.133v4.553c0,4.184-0.246,7.302-0.738,9.352c-0.575,2.134-1.642,4.307-3.199,6.521
    c-0.412-0.411-0.861-0.738-1.354-0.984c1.557-2.052,2.542-4.061,2.953-6.029c0.492-1.886,0.738-4.839,0.738-8.859v-11.689h24.732
    v7.135H235.072z M211.939,1044.005v4.184h21.533v-4.184H211.939z M214.277,1054.464h11.936c1.477-2.132,2.461-3.691,2.953-4.676
    l1.477,0.861c-0.821,1.23-1.765,2.503-2.83,3.814h7.014v1.477h-5.168v4.799h7.014v1.477h-7.014v7.998h-1.6v-7.998h-7.506
    c-0.083,3.036-1.805,5.741-5.168,8.121c-0.575-0.575-0.984-0.944-1.23-1.107c3.117-2.052,4.716-4.388,4.799-7.014h-6.029v-1.477
    h6.152c0-0.409,0-0.861,0-1.354v-3.445h-4.799L214.277,1054.464L214.277,1054.464z M217.969,1050.649l1.23-0.738
    c1.148,1.313,2.049,2.421,2.707,3.322l-1.354,0.984c-0.083-0.163-0.246-0.409-0.492-0.738
    C219.24,1052.249,218.542,1051.307,217.969,1050.649z M220.676,1059.386c0,0.492,0,0.944,0,1.354h7.383v-4.799h-7.383V1059.386z"/>
  <path d="M239.502,1069.106c-0.246-0.492-0.615-1.026-1.107-1.6c5.987-1.804,10.54-4.307,13.658-7.506h-10.582v-11.32h10.951v-2.953
    H239.01v-1.6h13.412v-3.199h1.6v3.199h13.535v1.6h-13.535v2.953h11.074V1060h-10.582c3.034,3.282,7.586,5.702,13.658,7.26
    c-0.492,0.573-0.861,1.065-1.107,1.477c-6.152-1.969-10.501-4.43-13.043-7.383v8.859h-1.6v-8.736
    C249.715,1064.514,245.408,1067.055,239.502,1069.106z M243.07,1050.157v3.445h9.352v-3.445H243.07z M243.07,1054.956v3.568h9.352
    v-3.568H243.07z M263.373,1050.157h-9.352v3.445h9.352V1050.157z M254.021,1054.956v3.568h9.352v-3.568H254.021z"/>
</g>
<g opacity="0.5">
  <path d="M665.695,1000.829l-2.461-2.584c-7.875,0.083-14.931,0.329-21.164,0.738c-1.067,0-2.052,0.123-2.953,0.369l-0.861-1.846
    l3.691-0.123c2.378-2.707,5.126-6.356,8.244-10.951l1.723,0.861c-2.298,3.199-4.841,6.521-7.629,9.967l17.473-0.615
    c-0.492-0.573-1.313-1.394-2.461-2.461c-1.067-1.065-1.888-1.846-2.461-2.338l1.354-0.984c1.394,1.23,3.403,3.159,6.029,5.783
    c1.394,1.313,2.419,2.298,3.076,2.953L665.695,1000.829z M662.988,1002.798v13.166h-1.723v-1.969H643.3v1.969h-1.723v-13.166
    H662.988z M643.301,1004.397v7.998h17.965v-7.998H643.301z"/>
  <path d="M670.002,1014.856c-0.246-0.492-0.615-1.026-1.107-1.6c5.987-1.804,10.54-4.307,13.658-7.506h-10.582v-11.32h10.951v-2.953
    H669.51v-1.6h13.412v-3.199h1.6v3.199h13.535v1.6h-13.535v2.953h11.074v11.32h-10.582c3.034,3.282,7.587,5.702,13.658,7.26
    c-0.492,0.573-0.861,1.065-1.107,1.477c-6.152-1.969-10.501-4.43-13.043-7.383v8.859h-1.6v-8.736
    C680.215,1010.264,675.908,1012.805,670.002,1014.856z M673.57,995.907v3.445h9.352v-3.445H673.57z M673.57,1000.706v3.568h9.352
    v-3.568H673.57z M693.873,995.907h-9.352v3.445h9.352V995.907z M684.521,1000.706v3.568h9.352v-3.568H684.521z"/>
</g>
<g opacity="0.5">
  <path d="M1025.129,633.221c-0.246-0.573-0.575-1.107-0.984-1.6c3.526-2.542,6.479-5.987,8.859-10.336l1.6,0.738
    c-0.984,1.723-2.011,3.241-3.076,4.553v14.889h-1.723v-12.674C1028.409,630.351,1026.852,631.827,1025.129,633.221z
     M1043.709,612.057h1.723v3.814h8.49v1.6h-8.49v3.076h-1.723v-3.076h-9.105v2.584h-1.6v-2.584h-8.613v-1.6h8.613v-3.814h1.6v3.814
    h9.105V612.057z M1040.141,621.777h1.723v7.998c3.608-1.886,6.603-4.142,8.982-6.768l1.354,1.107
    c-2.872,3.118-6.317,5.66-10.336,7.629v4.922c-0.083,1.64,0.861,2.419,2.83,2.338h3.814c1.969,0.081,3.034-0.575,3.199-1.969
    c0.327-1.477,0.532-3.034,0.615-4.676c0.163,0,0.45,0.083,0.861,0.246c0.409,0.165,0.655,0.288,0.738,0.369
    c0,1.396-0.165,2.913-0.492,4.553c-0.411,2.132-1.969,3.157-4.676,3.076h-4.43c-2.872,0.081-4.267-1.149-4.184-3.691v-15.134
    H1040.141z"/>
  <path d="M1069.18,638.881c1.23,0,3.076,0,5.537,0c4.676,0.081,8.244,0.081,10.705,0c-0.165,0.327-0.329,0.696-0.492,1.107
    c0,0.163-0.042,0.327-0.123,0.492c-7.137,0-12.428-0.042-15.873-0.123c-3.528,0.081-6.275-1.067-8.244-3.445
    c-0.657,0.492-1.642,1.477-2.953,2.953c-0.411,0.492-0.698,0.819-0.861,0.984l-1.23-1.107c0.655-0.738,1.723-1.806,3.199-3.199
    c0.492-0.492,0.819-0.819,0.984-0.984v-5.783h-4.061v-1.477h5.66v7.383C1063.231,637.815,1065.815,638.881,1069.18,638.881z
     M1075.209,612.057h1.6v2.83h8.49v1.354h-8.49v1.723h-1.6v-1.723h-9.352v1.723h-1.477v-1.723h-8.613v-1.354h8.613v-2.83h1.477v2.83
    h9.352V612.057z M1056.014,623.008l0.984-1.23c1.886,1.23,3.526,2.338,4.922,3.322l-1.107,1.354
    C1059.582,625.469,1057.982,624.321,1056.014,623.008z M1056.875,619.193l0.984-1.23c0.246,0.165,0.738,0.492,1.477,0.984
    c1.64,1.149,2.747,1.929,3.322,2.338l-0.984,1.23c-0.165-0.163-0.492-0.409-0.984-0.738
    C1058.884,620.466,1057.613,619.604,1056.875,619.193z M1064.381,619.686h8.982v-1.354h1.477v1.354h9.352v1.354h-9.352v2.338h7.752
    v8.859h-7.752v2.461h9.844v1.23h-9.844v1.969h-1.477v-1.969h-9.598v-1.23h9.598v-2.461h-7.752v-8.859h7.752v-2.338h-8.982V619.686z
     M1067.088,624.607v2.584h6.275v-2.584H1067.088z M1067.088,628.422v2.584h6.275v-2.584H1067.088z M1081.115,624.607h-6.275v2.584
    h6.275V624.607z M1074.84,628.422v2.584h6.275v-2.584H1074.84z"/>
</g>
<g opacity="0.5">
  <path fill="#FFFFFF" d="M747.673,524.181h1.723v3.568h13.658v1.477h-13.658v3.814h11.936v16.857c0,2.132-1.107,3.239-3.322,3.322
    c-1.23,0-2.749,0-4.553,0c0-0.246-0.083-0.615-0.246-1.107c-0.083-0.246-0.123-0.452-0.123-0.615
    c0.984,0.081,2.419,0.123,4.307,0.123c1.64,0.081,2.419-0.492,2.338-1.723v-15.381H737.46v18.949h-1.6V533.04h11.812v-3.814
    h-13.781v-1.477h13.781L747.673,524.181L747.673,524.181z M739.552,545.591h8.244v-3.814h-7.26V540.3h9.105
    c1.23-1.558,2.338-3.116,3.322-4.676l1.477,0.738c-0.984,1.396-1.969,2.707-2.953,3.938h5.168v1.477h-7.26v3.814h8.244v1.477
    h-8.244v5.66h-1.6v-5.66h-8.244L739.552,545.591L739.552,545.591z M742.751,536.608l1.23-0.984c0.492,0.492,1.107,1.19,1.846,2.092
    c0.409,0.492,0.738,0.861,0.984,1.107l-1.477,0.984C744.514,538.577,743.652,537.512,742.751,536.608z"/>
  <path fill="#FFFFFF" d="M765.269,542.392l-0.246-1.846l4.553-1.354v-7.383h-4.184v-1.477h4.184v-6.029h1.6v6.029h3.691v1.477
    h-3.691v6.891l3.445-1.107c0,0.492,0,1.067,0,1.723l-3.445,1.107v9.352c0.081,2.215-0.944,3.322-3.076,3.322
    c-0.246,0-0.657,0.04-1.23,0.123c-0.492,0-0.821,0-0.984,0c0-0.165-0.042-0.369-0.123-0.615c-0.083-0.575-0.165-0.984-0.246-1.23
    c0.409,0,1.147,0,2.215,0c1.312,0.081,1.927-0.492,1.846-1.723v-8.736c-0.492,0.165-1.19,0.411-2.092,0.738
    C766.499,541.982,765.761,542.229,765.269,542.392z M776.712,539.808v-1.477h15.012v1.477c-1.56,3.445-3.568,6.194-6.029,8.244
    c2.05,1.477,5.126,2.665,9.229,3.568c-0.165,0.246-0.411,0.655-0.738,1.23c-0.083,0.163-0.123,0.286-0.123,0.369
    c-3.938-1.067-7.179-2.461-9.721-4.184c-2.544,1.723-5.783,3.199-9.721,4.43c-0.165-0.246-0.411-0.615-0.738-1.107
    c-0.083-0.246-0.165-0.411-0.246-0.492c3.691-0.903,6.849-2.173,9.475-3.814c-2.298-2.05-3.979-4.799-5.045-8.244L776.712,539.808
    L776.712,539.808z M790.862,533.778h0.369c0.819,0,1.271-0.409,1.354-1.23c0.081-0.163,0.163-0.532,0.246-1.107
    c0.081-0.492,0.123-0.819,0.123-0.984c0.163,0.083,0.492,0.206,0.984,0.369c0.246,0.083,0.409,0.123,0.492,0.123
    c0,0.165-0.042,0.492-0.123,0.984c-0.083,0.492-0.123,0.821-0.123,0.984c-0.329,1.642-1.23,2.421-2.707,2.338h-0.861
    c-2.215,0.083-3.282-1.024-3.199-3.322v-4.799h-6.645c0,2.872-0.246,4.882-0.738,6.029c-0.492,1.149-1.642,2.421-3.445,3.814
    c-0.411-0.492-0.821-0.942-1.23-1.354c2.788-1.64,4.061-4.019,3.814-7.137v-2.953h9.844v6.152
    C789.017,533.082,789.632,533.778,790.862,533.778z M790.001,539.808h-10.336c1.147,3.036,2.747,5.456,4.799,7.26
    C786.925,544.936,788.771,542.515,790.001,539.808z"/>
</g>
<g opacity="0.5">
  <path d="M1237.891,434.008h5.537v-17.596h18.211v17.596h5.537v1.477h-29.285V434.008z M1252.041,407.553h1.723v3.322h12.059v5.414
    h-1.723v-3.814h-23.133v3.814h-1.723v-5.414h12.797L1252.041,407.553L1252.041,407.553z M1245.027,417.889v4.43h14.889v-4.43
    H1245.027z M1245.027,423.795v4.43h14.889v-4.43H1245.027z M1245.027,429.701v4.307h14.889v-4.307H1245.027z"/>
  <path d="M1288.463,407.307h1.6v2.215h8.736v1.23h-8.736v1.723h-1.6v-1.723h-8.982v1.723h-1.6v-1.723h-8.613v-1.23h8.613v-2.215h1.6
    v2.215h8.982V407.307z M1270.621,413.336h11.32v6.645h-9.721v16.734h-1.6L1270.621,413.336L1270.621,413.336z M1272.221,414.443
    v1.723h8.121v-1.723H1272.221z M1272.221,418.873h8.121v-1.723h-8.121V418.873z M1283.172,420.104h1.6v1.6h8.244v1.23h-8.244v1.6
    h7.014v5.66h-7.014v1.6l0.492-0.861c0.573,0.165,1.435,0.452,2.584,0.861c1.804,0.657,3.199,1.107,4.184,1.354l-0.738,1.23
    c-1.723-0.738-3.897-1.517-6.521-2.338v3.938h-1.6v-4.922c-1.723,1.642-4.349,3.116-7.875,4.43c0-0.083-0.083-0.165-0.246-0.246
    c-0.083-0.246-0.288-0.615-0.615-1.107c3.526-1.065,6.192-2.378,7.998-3.938h-6.398v-5.66h7.137v-1.6h-8.244v-1.23h8.244v-1.601
    H1283.172z M1277.635,425.641v3.445h5.537v-3.445H1277.635z M1279.111,426.871l0.861-0.738l1.969,1.846l-0.984,0.738
    L1279.111,426.871z M1290.309,425.641h-5.537v3.445h5.537V425.641z M1288.832,426.871l-1.846,1.846l-0.984-0.738l1.969-1.846
    L1288.832,426.871z M1293.262,435.115c1.723,0.081,2.542-0.657,2.461-2.215v-12.92h-9.598v-6.645h11.197V432.9
    c0.081,2.461-1.149,3.649-3.691,3.568c-1.23,0-2.421,0-3.568,0c-0.083-0.329-0.206-0.821-0.369-1.477
    C1290.924,435.073,1292.112,435.115,1293.262,435.115z M1287.602,414.443v1.723h8.121v-1.723H1287.602z M1287.602,418.873h8.121
    v-1.723h-8.121V418.873z"/>
</g>
<polyline opacity="0.5" fill="none" stroke="#000000" strokeLinejoin="bevel" strokeMiterlimit="10" enable-background="new    " points="
  739.812,1337.111 841.688,1159.027 841.688,1203.874 804.797,1183.205 "/>
<g opacity="0.5">
  <path d="M837.886,1135.06h6.398v-6.31h1.333v20.795h-1.333v-4.621c-0.415,0.178-1.186,0.504-2.311,0.978
    c-1.837,0.771-3.141,1.273-3.91,1.511l-0.533-1.155c2.251-0.77,4.502-1.629,6.754-2.577v-7.465h-6.398L837.886,1135.06
    L837.886,1135.06z M858.681,1134.171c-2.252,1.244-4.503,2.459-6.754,3.644v8.087c-0.06,1.244,0.533,1.836,1.777,1.777h1.422
    c1.422,0.118,2.222-0.504,2.399-1.866c0-0.178,0.029-0.444,0.089-0.8c0.118-0.889,0.207-1.6,0.267-2.133
    c0.236,0.119,0.622,0.267,1.155,0.444c-0.119,1.008-0.237,1.955-0.355,2.844c-0.178,1.896-1.333,2.813-3.466,2.755h-1.777
    c-1.955,0.059-2.903-0.889-2.844-2.844v-17.329h1.333v7.731c2.547-1.303,4.532-2.429,5.954-3.377L858.681,1134.171z"/>
</g>
</svg>
          

         
      </div>
    )
  }
  props = {
    classNameName: 'ResultMap'
  }
}
