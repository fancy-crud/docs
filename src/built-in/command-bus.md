# Command Bus Pattern

**FancyCRUD** is using the Command Bus Pattern to organize and manage the execution of commands within a form or table. This pattern is based on the principle of separation of concerns and promotes code modularity and scalability.

In the context of the Command Bus, a "command" typically refers to a request to perform a specific action in the application. Instead of executing these actions directly where they originate, they are sent through a command bus. The command bus acts as an intermediary that directs the command to the appropriate handler, responsible for executing the logic associated with that command.

The Command Bus consists of three main components:

- **Command**: Represents the intention to perform an action in the application. It is an object that contains all the necessary information to carry out the operation.

- **Command Handler**: Is responsible for executing the logic associated with a specific command. Each type of command has its own handler.

- **Command Bus**: Is the component that receives the commands and directs them to the corresponding handler. It can also handle aspects such as command validation before sending it to the handler.

By using a Command Bus, a clearer separation is achieved between the code that generates commands and the code that executes the associated actions. This makes it easier to expand and maintain the system since it's simpler to add new commands and handlers without modifying existing code.

Let's see an example to execute a command:

```vue
<template>
  <f-form v-bind="form" />

  <pre>Form Data: {{ formData.jsonForm }}</pre>
</template>

<script lang="ts" setup>
import { useForm, FieldType, Bus, GenerateFormDataCommand } from '@fancy-crud/vue'

const bus = new Bus()

const form = useForm({
  fields: {
    firstName: {
      type: FieldType.text,
      label: 'First name',
    }
  }
})

const formData = computed(
  () => bus.execute(
    new GenerateFormDataCommand(form.fields)
  )
)
</script>
```

The code above is creating an instance of the `Bus` class, which it's the responsable to direct the command to the corresponding handler.

Then, we created a `firstName` field inside a form. And last, a computed property to execute the command every time the `form.fields.firstName` changes.

## Command

You can use the `FancyCrud` built-in tools to create your own commands. Let's create a command that greets a person each time the user presses the greet button on a form. First of all, you need to define the class to pass parameters into the `CommandHandler`, an the Handler interface.

```ts
import type { BaseCommand } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'

export class GreetCommand implements BaseCommand {
  public readonly meta = meta(IGreetHandler)

  constructor(
    public readonly name: string,
  ) {}
}
```

We're creating a `GreetCommand` class that implements the `BaseCommand` interface, which requires the implementation of the `meta` attribute, this attribute is a utility for the `Bus` to be able to send the command to the corresponding Handler.

## Handler interface

As you can see, we're passing the `IGreetHandler` into the `meta()`, this is the interface (abstract class) that the command needs the handler to implement. So, let's create the `IGreetHandler` interface:

```ts
import type { BaseCommand, BaseHandler } from '@fancy-crud/bus'
import { meta } from '@fancy-crud/bus'

export class GreetCommand implements BaseCommand {
  public readonly meta = meta(IGreetHandler)

  constructor(
    public readonly name: string,
  ) {}
}

export abstract class IGreetHandler implements BaseHandler {
  abstract execute(command: GreetCommand): string
}
```

The `IGreetHandler` class implements BaseHandler, which requires the implementation of `execute()` function. We're passing the `GreetCommand` as parameter of the `execute()` function, and setting the return type for the function, this is useful for the command bus, it will be able to persist the return type of the function, so you will not have to know what's the return type of the command when you use it.

## Handler implementation

Now let's create the implementation of `IGreetHandler` class.

```ts
import type { GreetCommand, IGreetHandler } from '../commands/greet'

export abstract class GreetHandler implements IGreetHandler {
  execute(command: GreetCommand): string {
    return `Hello ${command.name}`
  }
}
```

As you can see, the `GreetHandler` is implementing the `IGreetHandler`, and we're using the name property in the command to concatenate it with the "Hello" string.

## Command handler registration

Last but not least, we need to register the command into the command bus. To accomplish that, just use the `register()` function.

```ts
import { register } from '@fancy-crud/bus'
import { IGreetHandler } from '../commands/greet'
import { GreetHandler } from '../handlers/greet'

register(ICreateFormHandler.name, CreateFormHandler)
```

It is important to place the `register` function in a place where you know that the functions will always be executed. Otherwise, you will receive an error message like the following:

::: danger Error
HandlerDoesNotExist: Handler not found for command: IGreetHandler
:::

::: info
For this example, we place the `register` into the component, but you can place this register into the entry file.
:::

Once you completed the steps above, you will be able to execute the command, let's try it:

```vue
<template>
  <f-form v-bind="form" />
</template>

<script lang="ts" setup>
import { useForm, FieldType, Bus, register } from '@fancy-crud/vue'
import { GreetCommand, IGreetHandler } from '../command-basics/commands/greet'
import { GreetHandler } from './handlers/greet';

register(IGreetHandler.name, GreetHandler)

const bus = new Bus()

const form = useForm({
  fields: {
    name: {
      type: FieldType.text,
      label: 'Name',
      modelValue: ''
    }
  },
  buttons: {
    main: {
      label: 'Greetings',
      onClick: sayHello
    }
  },
  settings: {
    title: 'Say Hello to'
  }
})

function sayHello() {
  const greetings = bus.execute(
    new GreetCommand(form.fields.name.modelValue)
  )

  alert(greetings)
}
</script>

```

<GreetForm />
