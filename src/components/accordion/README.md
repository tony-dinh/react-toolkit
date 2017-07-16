Example:

```
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
    <AccordionItem headerContent={() => <div>Accordion 1</div>}>
        <Content />
    </AccordionItem>

    <AccordionItem headerContent={() => <div>Accordion 2</div>}>
        <Content />
    </AccordionItem>

    <AccordionItem headerContent={() => <div>Accordion 3</div>}>
        <Content />
    </AccordionItem>

    <AccordionItem headerContent={() => <div>Accordion 4</div>}>
        <Content />
    </AccordionItem>
</Accordion>
```
