import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Message } from '../../CONFIG_FILES/in_prod_messages';
import IPM from '../ipm/ipm';
import TopNav from '../top-nav/top-nav';
import styles from './app-wrap.cssm';


const TABS = [
  {id: 'about', label: 'About Us'},
  {id: 'climb', label: 'Climbing'},
  {id: 'events', label: 'Events'},
  {id: 'join', label: 'Join', className: styles['joinTab']}
];


class AppWrap extends Component {

  constructor(props) {
    super(props);
    this.switchRoute = this.switchRoute.bind(this);
  }

  switchRoute(newRoute) {
    if (newRoute === 'home') {
      this.props.history.push('');
    } else {
      this.props.history.push(newRoute);
    }
  };

  renderTopNav() {
    return (
      <TopNav tabs={TABS} onChange={this.switchRoute}/>
    );
  };

  renderLiveIPM() {
    return <IPM message={Message} />;
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderTopNav()}
        <div className={styles.scrollContainer}>
          {this.renderLiveIPM()}
          {this.props.children}
        </div>

      </div>
    );
  }
};

export default withRouter(AppWrap);
