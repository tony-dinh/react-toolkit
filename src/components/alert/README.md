Example:

```
<div>
    <Button text="Show Alert" onClick={() => {setState({showing: true})}}/>
    <div>
    <Alert
        showing={state.showing}
        animationDuration={250}
        iconName="close"
        type="success"
        tapOutsideToDismiss={true}
        onDismiss={() => {setState({showing: false})}}
    >
        <div>
            <h3>Header Text</h3>
            <p>First line body text</p>
            <p>Second line body text</p>
        </div>
    </Alert>
    </div>

</div>
```