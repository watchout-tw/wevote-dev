import React, {Component, PropTypes} from 'react';
import serialize from 'serialize-javascript';
import DocumentMeta from 'react-document-meta';
const cdn = '//cdnjs.cloudflare.com/ajax/libs/';

const IMP = '!important';
const iconDimensions = `width: 28px ${IMP}; height: 28px ${IMP}`;
const cheatCSS = `
.shareaholic-share-buttons-container ul.shareaholic-share-buttons
{ margin: 0 ${IMP}; padding: 4px ${IMP}; }
i.shareaholic-service-icon
{ border: none ${IMP}; background: none ${IMP}; color: white ${IMP}; box-shadow: none ${IMP}; }
.shareaholic-share-buttons-container li.shareaholic-share-button
{ padding: 0 10px ${IMP}; }
i.shareaholic-service-icon { color: black ${IMP}; }
.shareaholic-share-buttons-container.mini li.shareaholic-share-button
{ ${iconDimensions} }
.shareaholic-share-buttons-container.mini .shareaholic-share-button-container .shareaholic-service-icon
{ font-size: 22px ${IMP}; ${iconDimensions} }
.shareaholic-service-icon.service-line_me
{ transform: scale(1.1); }`;

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
const title = "沃草！立委出任務 - 2016立委投票攻略";
const description = "2016立委選舉票該投給誰？「立委出任務」透過類遊戲互動方式，提供選民快速了解現任立委與下任候選人立場，並分析政黨對於議題表態和優先法案的未來承諾。想了解你的選區立委嗎？想知道政黨票怎麼投嗎？請上「立委出任務」！";

export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.object,
    store: PropTypes.object
  }

  render() {
    const {assets, component, store} = this.props;
    const content = React.renderToString(component);
    return (
      <html lang="zh-TW">
        <head>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <meta property="og:site_name" content={title}/>
          <meta property="og:title" content={title}/>
          <meta property="og:description" content={description}/>
          <meta property="og:image" content="http://wevote.tw/facebook.jpg"/>
          <meta property="og:type" content="website"/>
          <meta property="article:publisher" content="https://www.facebook.com/WatchOutTW"/>
          <meta property="article:author" content="https://www.facebook.com/WatchOutTW"/>
          <meta property='shareaholic:article_author' content='https://www.facebook.com/WatchOutTW' />
          <meta property="fb:app_id" content="1640384482880194" />

          <meta name="google-site-verification" content="lcgCkeejw-aJgK6-JoOR9a8ivs5MWZA66UavjFBxCJA" />
          <meta name="msvalidate.01" content="2CB93BE9E9E2D38CAD7DA93479BA8E30" />
          {DocumentMeta.renderAsReact()}

          <link rel="shortcut icon" href="/favicon.ico" />

          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, i) =>
            <link href={assets.styles[style]} key={i} media="screen, projection"
                  rel="stylesheet" type="text/css"/>
          )}

          {/* shareaholic */}
          <script async type='text/javascript' src='//dsms0mj1bbhn4.cloudfront.net/assets/pub/shareaholic.js' data-shr-siteid='9446a9ec8f9ec821f25baf685f09943c' data-cfasync='false'></script>
         
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} />
          <script src={assets.javascript.main}/>

          {/* justfont production code */}
          <script dangerouslySetInnerHTML={{__html: `var _jf = _jf || [];_jf.push(['p','38336']);_jf.push(['_setFont','xingothic-tc-w4','css','.xingothic-tc-w4']);_jf.push(['_setFont','xingothic-tc-w4','alias','xingothic-tc']);_jf.push(['_setFont','xingothic-tc-w4','weight',400]);_jf.push(['_setFont','xingothic-tc-w8','css','.xingothic-tc-w8']);_jf.push(['_setFont','xingothic-tc-w8','alias','xingothic-tc']);_jf.push(['_setFont','xingothic-tc-w8','weight',800]);(function(f,q,c,h,e,i,r,d){var k=f._jf;if(k.constructor===Object){return}var l,t=q.getElementsByTagName("html")[0],a=function(u){for(var v in k){if(k[v][0]==u){if(false===k[v][1].call(k)){break}}}},j=/\\S+/g,o=/[\\t\\r\\n\\f]/g,b=/^[\\s\\uFEFF\\xA0]+|[\\s\\uFEFF\\xA0]+$/g,g="".trim,s=g&&!g.call("\uFEFF\xA0")?function(u){return u==null?"":g.call(u)}:function(u){return u==null?"":(u+"").replace(b,"")},m=function(y){var w,z,v,u,x=typeof y==="string"&&y;if(x){w=(y||"").match(j)||[];z=t[c]?(" "+t[c]+" ").replace(o," "):" ";if(z){u=0;while((v=w[u++])){if(z.indexOf(" "+v+" ")<0){z+=v+" "}}t[c]=s(z)}}},p=function(y){var w,z,v,u,x=arguments.length===0||typeof y==="string"&&y;if(x){w=(y||"").match(j)||[];z=t[c]?(" "+t[c]+" ").replace(o," "):"";if(z){u=0;while((v=w[u++])){while(z.indexOf(" "+v+" ")>=0){z=z.replace(" "+v+" "," ")}}t[c]=y?s(z):""}}},n;k.push(["_eventActived",function(){p(h);m(e)}]);k.push(["_eventInactived",function(){p(h);m(i)}]);k.addScript=n=function(u,A,w,C,E,B){E=E||function(){};B=B||function(){};var x=q.createElement("script"),z=q.getElementsByTagName("script")[0],v,y=false,D=function(){x.src="";x.onerror=x.onload=x.onreadystatechange=null;x.parentNode.removeChild(x);x=null;a("_eventInactived");B()};if(C){v=setTimeout(function(){D()},C)}x.type=A||"text/javascript";x.async=w;x.onload=x.onreadystatechange=function(G,F){if(!y&&(!x.readyState||/loaded|complete/.test(x.readyState))){y=true;if(C){clearTimeout(v)}x.src="";x.onerror=x.onload=x.onreadystatechange=null;x.parentNode.removeChild(x);x=null;if(!F){setTimeout(function(){E()},200)}}};x.onerror=function(H,G,F){if(C){clearTimeout(v)}D();return true};x.src=u;z.parentNode.insertBefore(x,z)};a("_eventPreload");m(h);n(r,"text/javascript",false,3000)})(this,this.document,"className","jf-loading","jf-active","jf-inactive","//d3gc6cgx8oosp4.cloudfront.net/js/stable/v/4.9.4/id/165912760525");`}} />
          <script async src='//www.google-analytics.com/analytics.js'></script>

        </body>
        <style>{cheatCSS}</style>
      </html>
    );
  }
}
