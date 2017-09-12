### Basic Example

```
<AppBar title="App Header Bar" />
```

### props

#### `leftButton`
```
const AppBarButton = require('./partials/button').default;

<AppBar title="App Header Bar"
    leftButton={<AppBarButton iconName="menu" />}
/>
```

#### `rightButtonGroup`
```
const AppBarButton = require('./partials/button').default;

<AppBar title="App Header Bar"
    rightButtonGroup={[
        <AppBarButton key={`action-button-0`} iconName="search" />,
        <AppBarButton key={`action-button-1`} iconName="edit" />,
        <AppBarButton key={`action-button-2`} iconName="more-vertical" />
    ]}
/>
```
