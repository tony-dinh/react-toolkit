### Example

```
const AccordionItem = require('./partials/accordion-item').default;

const Content = () => (
    <div>
        Lorem ipsum ut tristique himenaeos porttitor tortor enim orci, dictumst amet leo molestie praesent ad leo egestas nunc sem bibendum fames mollis.

        Conubia platea tristique risus aenean lacinia maecenas hac eleifend, potenti mi torquent class vestibulum etiam curabitur, tristique aliquam hac tempor convallis quam congue dolor quisque eu habitasse consequat vel.

        Nam feugiat torquent erat euismod scelerisque ornare ut consectetur et, massa duis ac eu ullamcorper vehicula fringilla massa morbi, velit non id tristique fames auctor nisl ornare convallis tristique pharetra suscipit.

        A id sem nam est ligula posuere cursus massa ligula, felis duis tellus conubia maecenas urna fringilla quis, eget non risus torquent nibh ultricies quis placerat netus massa interdum velit amet conubia.

        Pharetra donec fusce orci congue purus etiam bibendum, litora dictum nostra non aenean curabitur vel, aptent nullam mollis mi ullamcorper inceptos etiam dictumst himenaeos pretium tincidunt.
    </div>
);

<Accordion>
    {Array(5).fill().map((_, index) =>
        <AccordionItem key={index} headerContent={<div>{`Accordion ${index}`}</div>}>
            <Content />
        </AccordionItem>
    )}
</Accordion>
```

### Nested Example
```
const AccordionItem = require('./partials/accordion-item').default;

<Accordion>
    {Array(5).fill().map((_, i) =>
        <AccordionItem key={i} headerContent={<div>{`Accordion ${i}`}</div>}>
            <Accordion>
                {Array(5).fill().map((_, j) =>
                    <AccordionItem
                        key={j}
                        headerContent={<div>{`Accordion ${i}.${j}`}</div>}
                    >
                        <div>hello</div>
                    </AccordionItem>
                )}
            </Accordion>
        </AccordionItem>
    )}
</Accordion>
```
