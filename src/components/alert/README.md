Example:

```
<div>
    <Button text="Show Alert" onClick={() => {setState({showing: true})}}/>

    <Alert
        showing={state.showing}
        animationDuration={250}
        iconName="check"
        tapOutsideToDismiss={true}
        themeColor="#5dc2a0"
        onDismiss={() => {setState({showing: false})}}
    >
        <div>
            <h3>Header Text</h3>
            <p>First line body text</p>
            <p>Second line body text</p>
        </div>
    </Alert>
</div>
```