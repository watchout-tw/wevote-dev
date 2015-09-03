import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta';

export default class About extends Component {
  render() {
    
    return (
      <div className="container">
        <h1>About Us</h1>
        <DocumentMeta title="React Redux Example: About Us"/>
        <p>After months of development, we are proud to release our alpha version of Augur. This version showcases the basic features of our prediction market implementation. Its by no means feature complete and certainly prone to bugs.Tell us what you think and report any issues you have using the "Feedback" link in the app.</p>
       
      </div>
    );
  }

  // handleToggleKitten() {
  //   this.setState({showKitten: !this.state.showKitten});
  // }

  // state = {
  //   showKitten: false
  // }
}
