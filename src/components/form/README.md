### Example
```
const FormField = require('./partials/form-field').default
const FormButton = require('./partials/form-button').default

const validate = ({name, value}) => {
    switch(name) {
        case 'nonDigitInput':
            if (/\d/.test(value)) {
                return 'Non-digit inputs only'
            }
            break

        case 'digitInput':
            if (/\D/.test(value)) {
                return 'Digit inputs only'
            }
            break

        default:
            return null
    }
};

<Form name="test form" validate={validate}>
    <FormField name="nonDigitInput"
        label="Enter non-digits"
        maxLength={10}
        component={(props) => <Input {...props} />}
    />

    <FormField name="digitInput"
        label="Enter digits"
        maxLength={10}
        component={(props) => <Input {...props} />}
    />

    <FormField name="date"
        label="Select a Date"
        dateFormat="F Y"
        component={(props) => <InputDate {...props} />}
        required
    />

    <FormButton type="submit" text="Submit" />
</Form>
```