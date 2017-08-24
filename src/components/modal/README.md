### Example
```
const Content = () => (
    <div>
        Lorem ipsum ut tristique himenaeos porttitor tortor enim orci, dictumst amet leo molestie praesent ad leo egestas nunc sem bibendum fames mollis.

        Conubia platea tristique risus aenean lacinia maecenas hac eleifend, potenti mi torquent class vestibulum etiam curabitur, tristique aliquam hac tempor convallis quam congue dolor quisque eu habitasse consequat vel.

        Lorem ipsum ut tristique himenaeos porttitor tortor enim orci, dictumst amet leo molestie praesent ad leo egestas nunc sem bibendum fames mollis.

        Conubia platea tristique risus aenean lacinia maecenas hac eleifend, potenti mi torquent class vestibulum etiam curabitur, tristique aliquam hac tempor convallis quam congue dolor quisque eu habitasse consequat vel.

        Lorem ipsum ut tristique himenaeos porttitor tortor enim orci, dictumst amet leo molestie praesent ad leo egestas nunc sem bibendum fames mollis.

        Conubia platea tristique risus aenean lacinia maecenas hac eleifend, potenti mi torquent class vestibulum etiam curabitur, tristique aliquam hac tempor convallis quam congue dolor quisque eu habitasse consequat vel.

        Lorem ipsum ut tristique himenaeos porttitor tortor enim orci, dictumst amet leo molestie praesent ad leo egestas nunc sem bibendum fames mollis.

        Conubia platea tristique risus aenean lacinia maecenas hac eleifend, potenti mi torquent class vestibulum etiam curabitur, tristique aliquam hac tempor convallis quam congue dolor quisque eu habitasse consequat vel.


        Lorem ipsum ut tristique himenaeos porttitor tortor enim orci, dictumst amet leo molestie praesent ad leo egestas nunc sem bibendum fames mollis.

        Conubia platea tristique risus aenean lacinia maecenas hac eleifend, potenti mi torquent class vestibulum etiam curabitur, tristique aliquam hac tempor convallis quam congue dolor quisque eu habitasse consequat vel.

        Lorem ipsum ut tristique himenaeos porttitor tortor enim orci, dictumst amet leo molestie praesent ad leo egestas nunc sem bibendum fames mollis.

        Conubia platea tristique risus aenean lacinia maecenas hac eleifend, potenti mi torquent class vestibulum etiam curabitur, tristique aliquam hac tempor convallis quam congue dolor quisque eu habitasse consequat vel.

        Lorem ipsum ut tristique himenaeos porttitor tortor enim orci, dictumst amet leo molestie praesent ad leo egestas nunc sem bibendum fames mollis.

        Conubia platea tristique risus aenean lacinia maecenas hac eleifend, potenti mi torquent class vestibulum etiam curabitur, tristique aliquam hac tempor convallis quam congue dolor quisque eu habitasse consequat vel.

        Lorem ipsum ut tristique himenaeos porttitor tortor enim orci, dictumst amet leo molestie praesent ad leo egestas nunc sem bibendum fames mollis.

        Conubia platea tristique risus aenean lacinia maecenas hac eleifend, potenti mi torquent class vestibulum etiam curabitur, tristique aliquam hac tempor convallis quam congue dolor quisque eu habitasse consequat vel.
    </div>
);

<div>
    <Button text="Show Modal" onClick={() => setState({showing: true})}/>

    <Modal headerText="Header Text" showing={state.showing} onDismiss={() => setState({showing: false})}>
        <Content />
    </Modal>
</div>
```