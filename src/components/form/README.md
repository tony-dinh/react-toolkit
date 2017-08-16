### Example
```
const validate = ({name, value}) => {
    switch(name) {
        case 'name':
            if (/\d/.test(value)) {
                return 'Non-digit inputs only'
            }
        default:
            return null
    }
};

<Form name="test form" validate={validate}>
    <FormField name="name"
        component={Input}
    />
</Form>
```