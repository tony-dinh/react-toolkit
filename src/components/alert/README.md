Example:

```
<div>
    <Button text="Show Alert" onClick={() => {setState({showing: true})}}/>

    <Alert
        showing={state.showing}
        animationDuration={250}
        bodyLine1="First line body text"
        bodyLine2="Second line body text"
        header="Header Text"
        iconName="close"
        type="success"
        tapOutsideToDismiss={true}
        onDismiss={() => {setState({showing: false})}}
    />
</div>
```