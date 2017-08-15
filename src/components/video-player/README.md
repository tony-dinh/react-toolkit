### Example

```
<div>
    <Button text="Show Video Player" onClick={() => { setState({showing: true}) }} />
    <VideoPlayer showing={state.showing} onDismiss={() => { setState({showing: false}) }} src={'https://youtu.be/as5FA5vVwcE'}/>
</div>
```