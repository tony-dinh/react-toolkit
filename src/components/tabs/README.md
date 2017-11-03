### Example

```
const Tab = require('./partials/tab').default;

const onTabSelected = (index, value) => {
    console.log(index, value)
};

<Tabs onTabSelected={onTabSelected}>
    <Tab href="#tabs" title="Tab 1" value="link-1" />
    <Tab href="#tabs" title="Tab 2" value="link-2" />
    <Tab href="#tabs" title="Tab 3" value="link-3" />
</Tabs>
```
