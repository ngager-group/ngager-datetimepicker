/* eslint-disable */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

const moment = require('moment');

function getValueFromInitialValue(initialValue) {
  if (!initialValue) {
    return null;
  }
  let value;
  if (typeof initialValue === 'string') {
    value = moment(initialValue)
      .local()
      .toDate();
  } else {
    value = initialValue;
  }
  return value;
}

class NgagerDateTimePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      value: getValueFromInitialValue(props.initialValue),
    };
    this.hanldeOnClick = this.hanldeOnClick.bind(this);
    this.hanldeOnChangeDateValue = this.hanldeOnChangeDateValue.bind(this);
    this.hanldeOnChangeTimeValue = this.hanldeOnChangeTimeValue.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.initialValue !== this.props.initialValue &&
      newProps.initialValue !== this.state.value
    ) {
      this.setState({ value: getValueFromInitialValue(newProps.initialValue) });
    }
  }

  componentDidUpdate(props, state) {
    if (state.value !== this.state.value) {
      this.props.onChange(this.state.value);
    }
    if (state.openDialog !== this.state.openDialog && this.state.openDialog === true) {
      this.datePicker.openDialog();
    }
  }

  hanldeOnClick(e) {
    // console.log(e.target.className);
    if (e.target.className && e.target.className.indexOf('fa-times') >= 0) {
      this.setState({ value: null });
      return;
    }
    // this.timePicker.openDialog();
    // this.datePicker.openDialog();
    this.setState({ openDialog: true });
  }

  hanldeOnChangeDateValue(e, value) {
    if (this.state.value !== null) {
      // extract time part
      const hours = this.state.value.getHours();
      const minutes = this.state.value.getMinutes();
      const seconds = this.state.value.getSeconds();
      value.setHours(hours);
      value.setMinutes(minutes);
      value.setSeconds(seconds);
    }
    this.setState({ value }, () => this.timePicker.openDialog());
  }

  hanldeOnChangeTimeValue(e, value) {
    this.setState({ value, openDialog: false });
  }

  renderDateTimeDialog() {
    if (!this.state.openDialog) {
      return false;
    }
    const { minDate, maxDate } = this.props;
    return (
      <div style={{ display: 'none' }}>
        <DatePicker
          name="ngagerDateField"
          ref={el => {
            this.datePicker = el;
          }}
          fullWidth
          value={this.state.value}
          minDate={minDate}
          maxDate={maxDate}
          onChange={this.hanldeOnChangeDateValue}
          underlineShow={false}
          onDismiss={() => this.setState({ openDialog: false })}
        />
        <TimePicker
          ref={el => {
            this.timePicker = el;
          }}
          value={this.state.value}
          onChange={this.hanldeOnChangeTimeValue}
          hintText="12hr Format"
          onDismiss={() => this.setState({ openDialog: false })}
        />
      </div>
    );
  }

  render() {
    const { displayFormat, placeholder, style, errorText, textColor } = this.props;
    const className = `date-field-container ${this.props.className}`;
    const value = this.state.value;
    if (this.props.viewOnly) {
      return (
        <div style={style} className={className}>
          <div className="date-field">
            <i className="fa fa-calendar" aria-hidden="true"></i>
            <span className="value" style={{ color: textColor }}>
              {!value ? '' : moment(value).format(displayFormat)}
            </span>
          </div>
        </div>
      );
    }
    return (
      <div style={style} className={className}>
        {this.renderDateTimeDialog()}
        <div className="date-field" role="button" tabIndex={0} onClick={this.hanldeOnClick}>
          <i className="fa fa-calendar" aria-hidden="true"></i>
          <span className="value" style={{ color: textColor }}>
            {!value ? placeholder : moment(value).format(displayFormat)}
          </span>
          <i
            title={value === null ? 'Open datetime picker' : 'Clear value'}
            className={`fa ${value === null ? 'fa-caret-down' : 'fa-times'}`}
            aria-hidden="true"
          ></i>
        </div>
        {errorText && <span className="error-text">{errorText}</span>}
      </div>
    );
  }
}

NgagerDateTimePicker.propTypes = {
  className: PropTypes.string,
  viewOnly: PropTypes.bool,
  initialValue: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.string]),
  style: PropTypes.instanceOf(Object),
  textColor: PropTypes.string,
  placeholder: PropTypes.string,
  displayFormat: PropTypes.string,
  errorText: PropTypes.string,
  minDate: PropTypes.instanceOf(Object),
  maxDate: PropTypes.instanceOf(Object),
  onChange: PropTypes.func.isRequired,
};

NgagerDateTimePicker.defaultProps = {
  className: '',
  viewOnly: false,
  initialValue: null,
  style: {},
  displayFormat: 'YYYY-MM-DD h:mm A',
  errorText: null,
  minDate: null,
  maxDate: null,
  textColor: 'inherit',
  placeholder: '',
  onChange: () => null,
};

export default NgagerDateTimePicker;
