Example:
```
const onChange = (value) => {
    console.log(`Input changed: ${value}`)
};

const onUpdate = (value) => {
    console.log(`Input updated: ${value}`)
};

<Input
    label="Enter Text"
    maxLength={10}
    placeholder="placeholder"
    onChange={onChange}
    onUpdate={onUpdate}
/>
```

### props

#### `disabled`
```
<Input label="Disabled Input" placeholder="Placeholder" disabled />
```

#### `error`
```
<Input error="Error!!" />
```

#### `label`
```
<Input label="Label Text" maxLength={50} />
```

#### `maxLength`
```
<Input maxLength={50} />
```

#### `readOnly`
```
<Input label="Read-only" readOnly />
```