### Example
```
<SegmentedBarGraph
    data={[
        {
            label: 'Category 1',
            dataset: [
                {label: 'set 1', value: 20, background: 'blue'},
                {label: 'set 2', value: 80, background: 'red'}
            ]
        },
        {
            label: 'Category 2',
            dataset: [
                {label: 'set 1', value: 60, background: 'blue'},
                {label: 'set 2', value: 40, background: 'red'}
            ]
        },
        {
            label: 'Category 3',
            dataset: [
                {label: 'set 1', value: 100, background: 'repeating-linear-gradient(45deg, blue, blue 10px, #465298 10px, #465298 20px)'},
                {label: 'set 2', value: 100, background: 'red'}
            ]
        }
    ]}
    legend
/>
```
