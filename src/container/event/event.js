import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { getEvents } from '../../actions/get-events';
import { setPage } from '../../virtualPage';
import Calendar from '../../components/calendar/calendar';
import styles from './event.cssm';


class Events extends Component {

  static propTypes = {
    events: PropTypes.array,
    getEvents: PropTypes.func.isRequired,
  };

  constructor(props) {
    setPage('/events', 'Event Calendar');
    super(props);

    this.state = {
      currentMonth: moment().startOf('month'),
    };

    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillMount() {
    var start = this.state.currentMonth.clone();
    start = start.subtract(2, 'M').format('YYYY-MM-DDThh:mm:ss');

    this.props.getEvents(start);
  }

  nextMonth() {
    var month = this.state.currentMonth.clone();
    month.add(1, 'M');
    this.setState({currentMonth: month});
  }

  prevMonth() {
    var month = this.state.currentMonth.clone();
    month.subtract(1, 'M');
    this.setState({currentMonth: month});
  }

  render() {
    const { events } = this.props;

    return (
		<div className={styles.container}>
			<Calendar
        events={events}
        month={this.state.currentMonth}
        nextMonth={this.nextMonth}
        prevMonth={this.prevMonth}
      />
		</div>
    );
 }
};

export default connect(state => ({
  events: state.Events.events,
}), {
  getEvents,
})(Events);
