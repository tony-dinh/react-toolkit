### props

#### `checked`

```
const onToggle = () => {
    console.log(!state.checked)
    setState({checked: !state.checked})
};

<Checkbox checked={state.checked} onToggle={onToggle} />
```