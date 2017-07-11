import React, {PropTypes} from 'react'
import Button from '../../components/button'
import Icon from '../../components/icon'
import {Accordion, AccordionItem} from '../../components/accordion'

class Sandbox extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        // const progressItems = INTERVIEW_QUESTIONS.map((question, index) => {
        //     return (
        //         <ProgressStepsItem
        //             key={index}
        //             title={`Question ${index + 1}`}
        //             current={index === 1}
        //         />
        //     )
        // })

        // progressItems.push(<ProgressStepsItem
        //     key={`finish-step`}
        //     title={`Submission`}
        //     icon={CheckIcon}
        // />)

        return (
            <div>
                <Button iconName="check" disabled={true} text="Testing"/>
                <Accordion>
                    <AccordionItem
                        headerContent={<div>Header Content</div>}
                    >
                        <div>
                            <div>Hello Content Body</div>
                            <div>Hello Content Body</div>
                            <div>Hello Content Body</div>
                            <div>Hello Content Body</div>
                        </div>
                    </AccordionItem>
                </Accordion>
            </div>
        )
    }
}

Sandbox.propTypes = {
}

export default Sandbox