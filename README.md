# ngager-datetimepicker

> ReactJS Date Range Picker component

[![NPM](https://img.shields.io/npm/v/ngager-datetimepicker.svg)](https://www.npmjs.com/package/ngager-datetimepicker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save ngager-datetimepicker
```

## Usage

```jsx
import React, { Component } from 'react'

import NgagerDateTimePicker from 'ngager-datetimepicker'

class Example extends Component {
  render () {
    return (
      <NgagerDateTimeField
        initialValue={this.state.remindAt}
        onChange={this.handleOnChangeRemindAt}
        errorText={this.state.remindAtValidator}
      />
    )
  }
}
```

## License

MIT © [ngager-group](https://github.com/ngager-group)
