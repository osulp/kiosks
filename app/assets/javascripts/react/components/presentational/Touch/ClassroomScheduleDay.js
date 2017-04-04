import React, {Component, PropTypes} from 'react';
import moment from 'moment';

/**
 * the valid hours in which classrooms are available for
 * @type {number[]}
 */
const CLASSROOM_HOURS = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

class ClassroomScheduleDay extends Component {
  /**
   * Determine if the provided time is within the start_time and end_time
   * @param {Moment} start_time - the events start time
   * @param {Moment} end_time - the events end time
   * @param {Moment} this_time - the specific time to check
   * @returns {boolean|*} - true if this_time is >= start_time and < end_time
   * @private
   */
  _eventIncludesTime(start_time, end_time, this_time) {
    // current 15 minute interval is between start and end time, `[)` momentjs
    // argument to include the start_time (this_time >= start_time) but not end_time (this_time < end_time)
    return this_time.isBetween(start_time, end_time, null, '[)');
  }

  /**
   * Display a row with the events details rendered full width.
   * @param {Object} event - the event to render details for
   * @param {number} i - the events index
   * @returns {JSX} - the TR element
   * @private
   */
  _eventDetailRow(event, i) {
    return (
      <tr key={`event.${i}.detail`} className={`event-detail-row ${event.room_shortname}`}>
        <td colSpan={CLASSROOM_HOURS.length}>
          <div>
            <span className="event-title">{event.title}</span>
            <span>{event.contact}</span>
            <span>{event.room}</span>
          </div>
        </td>
      </tr>
    )
  }

  /**
   * Given the events start_time and end_time, iterate through each of the configured classroom hours and
   * render cells for each 15min increment which the event is active. The effect is to display a cell for each hour,
   * but show it subdivided with 15min spans to give a visual representation of each interval when the event is active.
   * @param {Moment} date - the current day which the schedule is displaying
   * @param {Object} event - the event to render times for
   * @param {number} i - the events index
   * @param {willamette} true if both willamette east and west are selected in
   * the filter
   * @returns {JSX} - the TR element
   * @private
   */
  _eventTimeRow(date, event, i, willamette) {
    const start_time = moment(event.start_time);
    const end_time = moment(event.end_time);

    return (
      <tr key={`event.${i}.time`} className={`event-time-row ${event.room_shortname} ${event.combined_willamette_room? "willamette-combined" : ""} ${willamette ? "willamette-selected" : ""}`}>
        {CLASSROOM_HOURS.map((h) => {
          const hour = moment(date).hour(h);
          const has_hour = this._eventIncludesTime(start_time, end_time, hour);
          const has_15 = this._eventIncludesTime(start_time, end_time, moment(hour).add(15, 'm'));
          const has_30 = this._eventIncludesTime(start_time, end_time, moment(hour).add(30, 'm'));
          const has_45 = this._eventIncludesTime(start_time, end_time, moment(hour).add(45, 'm'));
          const hour_has_event = has_hour || has_15 || has_30 || has_45;
          return (
            <td key={`event.${i}.${hour}`} className={hour_has_event ? "event-hour" : ""}>
              <span key={`event.${i}.hour.header`} className="event-hour-header">
                {hour.format('h a')}
              </span>
              <span key={`event.${i}.00`} className={has_hour ? "event-time" : ""}>&nbsp;</span>
              <span key={`event.${i}.15`} className={has_15 ? "event-time" : ""}>&nbsp;</span>
              <span key={`event.${i}.30`} className={has_30 ? "event-time" : ""}>&nbsp;</span>
              <span key={`event.${i}.45`} className={has_45 ? "event-time" : ""}>&nbsp;</span>
            </td>
          )
        })}
      </tr>
    )
  }

  /**
   * This function is to check if both willamette east and west are selected by
   * the user in the filter section
   * @param {Object} selected - an array of rooms selected
   * @returns {bool} - true if both willamette east and west are selected
   * @private
   */
  _willametteEastWestSelected(selected) {
    const willamette_west_selected = selected.filter(function(selection){ return (selection.shortname === "lib-willwest")});
    const willamette_east_selected = selected.filter(function(selection){ return (selection.shortname === "lib-willeast")});
    return (willamette_west_selected.length > 0 && willamette_east_selected.length > 0)
  }

  /**
   * An event has a detail row followed by the event time row so that the detail can have full width of the table
   * and the time cells (15min increments) are colored and lined up properly on the x axis.
   * @param {Object} classrooms - the classrooms from the application state
   * @param {Object} events - the events from the application state
   * @param {Moment} date - the day which the schedule is being rendered
   * @returns {JSX} - rows of event details/times or indication if there are no events
   * @private
   */
  _getEventRows(classrooms, events, date) {
    if (!events || !events.length) {
      return (<tr>
        <td>No classrooms scheduled.</td>
      </tr>);
    } else {
      const rows = [];
      this._filteredEvents(classrooms, events).map((e, i) => {
        const selected = Object.values(classrooms).filter((c) => c.selected == true);
        rows.push(this._eventDetailRow(e, i));

        if (this._willametteEastWestSelected(selected) === true) {
          rows.push(this._eventTimeRow(date, e, i, true));
        } else {
          rows.push(this._eventTimeRow(date, e, i, false));
        }
 
      });
      return rows;
    }
  }


  /**
   * Show only events which relate to the currently selected classrooms from the filter
   * @param {Object} classrooms - the classrooms from the application state
   * @param {Object} events - the events from the application state
   * @returns {*} - a filtered list of events
   * @private
   */
  _filteredEvents(classrooms, events) {
    const selected = Object.values(classrooms).filter((c) => c.selected == true);
    const will_combined = [];

    if (this._willametteEastWestSelected(selected) === true) {
      // both rooms (east and west) were selected
      events.forEach(function(event_item) {
        if (event_item.combined_willamette_room === true) {
          // for combined events, exclude willamette east (keep west)
          if ((event_item.room_shortname !== "lib-willeast")) {
            will_combined.push(event_item);
          }
        } else {
          will_combined.push(event_item);
        }

      });
      return Object.values(will_combined).filter((e) => selected.some((s) => s.shortname == e.room_shortname));
    }

    if (selected.length == Object.values(classrooms).length) {
      return events;
    }
    return Object.values(events).filter((e) => selected.some((s) => s.shortname == e.room_shortname));
  }

  render() {
    const events = this.props.classroom_schedule.events;
    const classrooms = this.props.classrooms;
    let date = this.props.date;
    if (date == '') {
      return null;
    }
    date = moment(date);
    return (
      <table className="table classroom-schedule-table">
        <thead>
        <tr key="event.header" className="event-header-row">
          <th colSpan={CLASSROOM_HOURS.length}>
            <div>
              <span>Event Title</span>
              <span>Contact</span>
              <span>Location</span>
            </div>
          </th>
        </tr>
        </thead>
        <tbody>
        {this._getEventRows(classrooms, events, date)}
        </tbody>
      </table>);
  }
}

ClassroomScheduleDay.propTypes = {
  date: PropTypes.string.isRequired,
  classrooms: PropTypes.object.isRequired,
  classroom_schedule: PropTypes.object.isRequired,
  is_fetching_classroom_schedule: PropTypes.bool.isRequired,
};

export default ClassroomScheduleDay;
