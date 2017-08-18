### Example
```
const Content = () => (
    <div>
        Lorem ipsum ut tristique himenaeos porttitor tortor enim orci, dictumst amet leo molestie praesent ad leo egestas nunc sem bibendum fames mollis.

        Conubia platea tristique risus aenean lacinia maecenas hac eleifend, potenti mi torquent class vestibulum etiam curabitur, tristique aliquam hac tempor convallis quam congue dolor quisque eu habitasse consequat vel.

        Nam feugiat torquent erat euismod scelerisque ornare ut consectetur et, massa duis ac eu ullamcorper vehicula fringilla massa morbi, velit non id tristique fames auctor nisl ornare convallis tristique pharetra suscipit.

        A id sem nam est ligula posuere cursus massa ligula, felis duis tellus conubia maecenas urna fringilla quis, eget non risus torquent nibh ultricies quis placerat netus massa interdum velit amet conubia.

        Pharetra donec fusce orci congue purus etiam bibendum, litora dictum nostra non aenean curabitur vel, aptent nullam mollis mi ullamcorper inceptos etiam dictumst himenaeos pretium tincidunt.
    </div>
);

<div>
    <Button text="Show Sliding Sheet" onClick={() => { setState({showing: true}) }} />
    <SlidingSheet showing={state.showing} onDismiss={ () => { setState({showing: false}) }}>
        <Content />
    </SlidingSheet>
</div>

```

### props

#### direction

```
const Content = () => (
    <div>
        Lorem ipsum ut tristique himenaeos porttitor tortor enim orci, dictumst amet leo molestie praesent ad leo egestas nunc sem bibendum fames mollis.

        Conubia platea tristique risus aenean lacinia maecenas hac eleifend, potenti mi torquent class vestibulum etiam curabitur, tristique aliquam hac tempor convallis quam congue dolor quisque eu habitasse consequat vel.

        Nam feugiat torquent erat euismod scelerisque ornare ut consectetur et, massa duis ac eu ullamcorper vehicula fringilla massa morbi, velit non id tristique fames auctor nisl ornare convallis tristique pharetra suscipit.

        A id sem nam est ligula posuere cursus massa ligula, felis duis tellus conubia maecenas urna fringilla quis, eget non risus torquent nibh ultricies quis placerat netus massa interdum velit amet conubia.

        Pharetra donec fusce orci congue purus etiam bibendum, litora dictum nostra non aenean curabitur vel, aptent nullam mollis mi ullamcorper inceptos etiam dictumst himenaeos pretium tincidunt.
    </div>
);

<div>
    <Button text="Slide Up" onClick={() => { setState({showing: true, direction: 'up'}) }} />
    <Button text="Slide Down" onClick={() => { setState({showing: true, direction: 'down'}) }} />
    <Button text="Slide Left" onClick={() => { setState({showing: true, direction: 'left'}) }} />
    <Button text="Slide Right" onClick={() => { setState({showing: true, direction: 'right'}) }} />

    <SlidingSheet showing={state.showing} direction={state.direction} onDismiss={() => setState({showing: false})}>
        <Content />
    </SlidingSheet>
</div>
```
