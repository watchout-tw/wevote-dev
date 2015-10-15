import React, {Component, PropTypes} from 'react';
import serialize from 'serialize-javascript';
import DocumentMeta from 'react-document-meta';
const cdn = '//cdnjs.cloudflare.com/ajax/libs/';

const IMP = '!important';
const cheatCSS = `
.shareaholic-share-buttons-container ul.shareaholic-share-buttons
{ margin: 0 ${IMP}; padding: 4px ${IMP}; }
i.shareaholic-service-icon
{ border: none ${IMP}; background: none ${IMP}; color: white ${IMP}; box-shadow: none ${IMP}; }
.shareaholic-share-buttons-container li.shareaholic-share-button
{ padding: 0 10px ${IMP}; }
.shareaholic-share-buttons-container.mini .shareaholic-share-button-container .shareaholic-service-icon
{ font-size: 16px ${IMP}; }
.shareaholic-share-buttons-container.mini .shareaholic-share-button-container i.shareaholic-service-icon.service-twitter
{ font-size: 18px ${IMP}; margin-top: -1px ${IMP}; }
.shareaholic-share-buttons-container.mini .shareaholic-share-button-container i.shareaholic-service-icon.service-google_plus
{ font-size: 22px ${IMP}; width: 26px ${IMP}; margin-top: -3px ${IMP}; margin-left: -3px ${IMP};}
.shareaholic-share-buttons-container.mini .shareaholic-share-button-container i.shareaholic-service-icon.service-plurk
{ font-size: 15px ${IMP}; padding-top: 1px ${IMP}; }
`;
/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
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
      <html lang="en-us">
        <head>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
          <meta property="og:image" content="http://dev.wevote.tw/facebook.png"/>
          <meta property="og:locale" content="zh_TW"/>
          <meta property="og:type" content="website"/>
          <meta property="article:publisher" content="https://www.facebook.com/WatchOutTW"/>
          <meta property="article:author" content="https://www.facebook.com/WatchOutTW"/>
          <meta property='shareaholic:article_author' content='https://www.facebook.com/WatchOutTW' />


          {DocumentMeta.renderAsReact()}

          <link rel="shortcut icon" href="/favicon.ico" />
          <link href={cdn + 'font-awesome/4.4.0/css/font-awesome.min.css'}
                media="screen, projection" rel="stylesheet" type="text/css" />

          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, i) =>
            <link href={assets.styles[style]} key={i} media="screen, projection"
                  rel="stylesheet" type="text/css"/>
          )}

          {/* shareaholic */}
          <script type='text/javascript' src='//dsms0mj1bbhn4.cloudfront.net/assets/pub/shareaholic.js' data-shr-siteid='6f03c30df4bd0fe0dc18bab5908becce' data-cfasync='false' async='async'></script>
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} />
          <script src={assets.javascript.main}/>
        </body>
        <style>{cheatCSS}</style>
      </html>
    );
  }
}
