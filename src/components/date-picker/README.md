### Props

#### `disabledDates`

```
const disabledDate = (date) => {
    // Disable Sundays
    return date.getDay() === 0
};

<DatePicker disabledDates={[disabledDate]} />
```

#### `humanReadable`

```
<DatePicker humanReadable={false} />
```

#### `label`

```
<DatePicker label="Select a Date" />
```

#### `showIcon`

```
<div>
    <DatePicker iconPosition="left" showIcon />
    <DatePicker iconPosition="right" showIcon />
</div>
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
