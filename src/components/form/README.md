### Example
```
const FormField = require('./partials/form-field').default
const FormFieldGroup = require('./partials/form-field-group').default
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

        case 'firstName':
            if (/\d/.test(value)) {
                return 'Non-digit inputs only'
            }
            break

        case 'lastName':
            if (/\d/.test(value)) {
                return 'Non-digit inputs only'
            }
            break

        default:
            return null
    }
};

const onSubmit = (data) => {
    alert(`submitted with data: ${JSON.stringify(data, null, 4)}`)
};


<Form name="test form" onSubmit={onSubmit} validate={validate}>
    <FormFieldGroup style={{display: 'flex'}}>
        <FormField name="firstName"
            label="First Name"
            component={Input}
        />

        <FormField name="lastName"
            label="Last name"
            component={Input}
            required
        />
    </FormFieldGroup>

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

    <FormButton type="submit" text="Submit" button={Button} />
</Form>
```