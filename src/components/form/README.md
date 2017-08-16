### Example
```
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
        required
    />

    <FormField name="digitInput"
        label="Enter digits"
        maxLength={10}
        component={(props) => <Input {...props} />}
    />

    <FormButton type="submit" text="Submit" />
</Form>
```