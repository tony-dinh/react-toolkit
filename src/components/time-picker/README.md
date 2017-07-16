### Props

#### `minTime` / `maxTime`

```
<TimePicker minTime="1:00" maxTime="13:00" />
```

#### `label`

```
<TimePicker label="Select a Time" />
```

#### `twentyFourHour`

```
<TimePicker twentyFourHour={true} />
```

### Events & Hooks
#### `onChange`

User-defined function which triggers when the selected time has changed.

```jsx
function(timeString) {...}
```

```
const onChange = (timeString) => {
    window.alert(`Selected Time ${timeString}`)
};

<TimePicker onChange={onChange} />
```
