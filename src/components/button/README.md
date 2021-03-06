### Basic Example
```
<Button text="Default Button" />
```

### props

#### `children`
```
<Button>
    <IconLabel icon="check" label="Check" />
</Button>
```

#### `href`
```
const onClick = () => {
    console.log('<a> tag clicked')
};

<Button href="https://google.ca" text="I'm a Link" role="primary" onClick={onClick} />
```

#### `role`
```
    <div>
        <Button text="Primary" role="primary"/>
        <Button text="Seconday" role="secondary" />
        <Button text="Tertiary" role="tertiary" />
    </div>
```

### Events & Hooks

#### onMouseEnter & onMouseLeave
```
const onMouseEnter = (e) => {
    console.log('mouse entered', e.target)
};

const onMouseLeave = (e) => {
    console.log('mouse left', e.target)
};

<Button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <IconLabel icon="check" label="Check" />
</Button>
```