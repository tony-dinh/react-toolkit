### Props
#### `label`

```
<DatePicker label="Select a Date" />
```

#### `humanReadable`

```
<DatePicker humanReadable={false} />
```

#### `mode`

```
<DatePicker mode="range" />
```

### Events & Hooks
#### `onChange`

User-defined function which triggers when the selected date has changed.

```jsx
function(dateString, selectedDates) {...}
```

```
const onChange = (dateString, selectedDates) => {
    window.alert(`dateString: ${dateString}, selectedDates: ${JSON.stringify(selectedDates)}`)
};

<DatePicker onChange={onChange} />
```
