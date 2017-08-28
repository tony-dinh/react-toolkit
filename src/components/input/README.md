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

#### `maxNum`
```
<Input type="number" maxNum={50} />
```

#### `minNum`
```
<Input type="number" minNum={50} />
```

#### `placeholder`
```
<Input placeholder="Placeholder" />
```

#### `readOnly`
```
<Input label="Read-only" readOnly />
```

#### `stepValue`
```
<Input type="number" stepValue={50} />
```