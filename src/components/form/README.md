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


<Form
    name="test form"
    submitOnEnter
    validate={validate}
    validateOnUpdate
    onSubmit={onSubmit}
>
    <div style={{display: 'flex'}}>
        <Form.Field name="firstName"
            label="First Name"
            component={Input}
            required
        />

        <Form.Field name="lastName"
            label="Last name"
            component={Input}
            required
        />
    </div>

    <Form.Field name="nonDigitInput"
        label="Enter non-digits"
        maxLength={10}
        component={Input}
    />

    <Form.Field name="digitInput"
        label="Enter digits"
        maxLength={10}
        component={(props) => <Input {...props} />}
    />

    <Form.Field name="date"
        label="Select a Date"
        dateFormat="F Y"
        component={(props) => <InputDate {...props} />}
        required
    />

    <Form.Field name="file"
        label="Upload a file"
        component={InputFile}
        required
    />

    <Form.SubmitTrigger
        render={({submit}) => (
            <Button
                text="Submit"
                type="submit"
                onClick={submit}
            />
        )}
    />
</Form>
```
