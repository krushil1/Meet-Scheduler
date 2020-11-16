import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AlarmAddIcon from '@material-ui/icons/AlarmAdd';
import ClearIcon from '@material-ui/icons/Clear';

import { AddCustomAlarm } from '../scripts/alarm.js';

const useStyles = (theme) => ({
  button: {
    borderRadius: 30,
    margin: theme.spacing(2),
    background: '#3f51b5',
    color: 'white',
    '&:hover': {
      background: '#3f51b5',
      color: 'white',
    },
    '&:disabled': {
      background: '#E8EAF6',
      color: '#9fa8da',
    },
  },
  icon: {
    fill: 'black',
  },
});
class AddAlarmForm extends Component {
  constructor() {
    super();
    this.state = {
      selectedLink: '',
      Linkerror: false,
      Dateerror: false,
      selectedTime: '',
      Nameerror: false,
      selectedName: '',
      buttonDisabled: true,
      slots: [
        { count: 0, label: 'Once' },
        { count: 1, label: 'Daily' },
        { count: 7, label: 'Weekly' },
      ],
      selectedSlot: 0,
    };
  }

  handleNameChange = async (event) => {
    var val = event.target.value;
    var error = false;
    if (val == '') {
      error = true;
    }
    await this.setState({
      selectedName: val,
      Nameerror: error,
    });
    this.check();
  };

  handleLinkChange = async (event) => {
    var val = event.target.value;
    var error = false;
    if ((!val.match('https://meet.google.com/[a-zA-Z0-9?&=]+') && !val.match('https://us02web.zoom.us+')) || val == '') {
      error = true;
    }
    await this.setState({
      selectedLink: val,
      Linkerror: error,
    });
    this.check();
  };

  handleTimeChange = async (event) => {
    var val = event.target.value;
    var d = new Date(val);
    var error = false;
    console.log(val, d);
    if (val == '' || d < new Date()) {
      error = true;
    }
    await this.setState({
      selectedTime: val,
      Dateerror: error,
    });
    this.check();
  };

  handleSlotChange = async (event) => {
    this.setState({ selectedSlot: event.target.value });
  };

  check = () => {
    if (
      !this.state.Linkerror &&
      !this.state.Dateerror &&
      !this.state.Nameerror &&
      this.state.selectedLink != '' &&
      this.state.selectedTime != '' &&
      this.state.selectedName != ''
    ) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  ClearForm = () => {
    this.setState({
      selectedLink: '',
      selectedTime: '',
      buttonDisabled: true,
    });
  };

  AddAlarm = async () => {
    var state = {
      Name: this.state.selectedName,
      Link: this.state.selectedLink,
      Time: this.state.selectedTime,
      Repeat: this.state.selectedSlot,
    };
    await AddCustomAlarm(state);
    this.setState({
      selectedLink: '',
      selectedTime: '',
      selectedName: '',
      buttonDisabled: true,
      selectedSlot: 0,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div style={{ height: '300px' }}>
        <TextField
          style={{ width: '90%', marginLeft: '4%' }}
          value={this.state.selectedName}
          onChange={this.handleNameChange}
          id="Link"
          label="Class Name"
          type="text"
          error={this.state.Nameerror}
        />
        <TextField
          style={{ width: '90%', margin: '4%' }}
          value={this.state.selectedLink}
          onChange={this.handleLinkChange}
          id="Link"
          label="Meeting link"
          type="text"
          error={this.state.Linkerror}
        />
        <TextField
          style={{ width: '45%', margin: '4%' }}
          value={this.state.selectedTime}
          onChange={this.handleTimeChange}
          id="date"
          label="Meeting Date"
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
          error={this.state.Dateerror}
        />
        <FormControl
          style={{ width: '35%', margin: '4%' }}
          disabled={this.state.slotDisabled}
        >
          <InputLabel id="demo-controlled-open-select-label">Repeat</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            value={this.state.selectedSlot}
            onChange={this.handleSlotChange}
          >
            {this.state.slots.map((item) => {
              return (
                <MenuItem key={item.count} value={item.count}>
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <center style={{ marginTop: '10px' }}>
          <Button
            className={classes.button}
            id="submit_button"
            disabled={this.state.buttonDisabled}
            variant="contained"
            onClick={this.AddAlarm}
            endIcon={<AlarmAddIcon />}
          >
            Add Alarm
          </Button>
          <Button
            className={classes.button}
            id="clear_button"
            variant="contained"
            onClick={this.ClearForm}
            endIcon={<ClearIcon />}
          >
            Reset
          </Button>
        </center>
      </div>
    );
  }
}

export default withStyles(useStyles)(AddAlarmForm);
