# Command Bus Pattern

FancyCRUD is built on the **Command Bus Pattern**, a powerful architectural pattern that organizes and manages operations within forms and tables. This pattern provides a clean, maintainable, and extensible way to handle application logic.

## What is the Command Bus Pattern?

The Command Bus Pattern is based on the **principle of separation of concerns**. Instead of executing operations directly where they originate, commands are sent through a centralized bus that routes them to the appropriate handler.

Think of it like a postal system: you write a letter (command), put it in a mailbox (bus), and the postal service (handler) delivers it to the right address.

## Core Components

### 1. Command
A command represents the **intention** to perform an action. It's a simple object containing all necessary data to execute the operation.

```ts
// Example: A command to save form data
new SaveFormCommand(formId, fields, settings)
```

**Characteristics:**
- Immutable data container
- Clearly named (e.g., `CreateUserCommand`, `DeleteRecordCommand`)
- Contains all required parameters
- No business logic

### 2. Handler
A handler contains the **business logic** for executing a specific command. Each command type has exactly one handler.

```ts
// Handler that processes SaveFormCommand
class SaveFormHandler {
  execute(command: SaveFormCommand) {
    // Business logic here
    const data = generateFormData(command.fields)
    return http.post(command.url, data)
  }
}
```

**Characteristics:**
- Single responsibility (handles one command type)
- Contains business logic
- Can inject dependencies
- Returns results

### 3. Bus
The bus is the **central dispatcher** that receives commands and routes them to the correct handler.

```ts
const bus = new Bus()
const result = bus.execute(new SaveFormCommand(/* ... */))
```

**Characteristics:**
- Single entry point for all commands
- Type-safe command routing
- Supports dependency injection
- Handles handler lifecycle

## Why Use Command Bus?

### ✅ **Separation of Concerns**
Commands (what to do) are separate from handlers (how to do it). This makes code easier to understand and maintain.

```ts
// ❌ Without Command Bus - Logic mixed with UI
function handleSubmit() {
  const data = { name: form.name, email: form.email }
  axios.post('/users', data)
    .then(response => showNotification('Success'))
    .catch(error => handleError(error))
}

// ✅ With Command Bus - Clean separation
function handleSubmit() {
  bus.execute(new SaveFormCommand(form.id, form.fields, form.settings))
}
```

### ✅ **Testability**
Handlers can be tested independently from UI components.

```ts
// Easy to test
it('should save form data', () => {
  const handler = new SaveFormHandler()
  const result = handler.execute(new SaveFormCommand(/* test data */))
  expect(result).toBeDefined()
})
```

### ✅ **Reusability**
Commands can be executed from anywhere in your application.

```ts
// From a component
bus.execute(new SaveFormCommand(form))

// From a composable
bus.execute(new SaveFormCommand(form))

// From another handler
bus.execute(new SaveFormCommand(form))
```

### ✅ **Extensibility**
Add new features without modifying existing code.

```ts
// Add a new command without touching existing code
class ExportDataCommand { /* ... */ }
class ExportDataHandler { /* ... */ }
register(ExportDataCommand, ExportDataHandler)
```

### ✅ **Type Safety**
TypeScript ensures type safety throughout the command flow.

```ts
// TypeScript knows the return type
const data: FormData = bus.execute(new GenerateFormDataCommand(fields))
```

## How FancyCRUD Uses Command Bus

FancyCRUD uses the Command Bus internally for all operations:

**Form Operations:**
- `CreateFormCommand` - Initialize a new form
- `SaveFormCommand` - Submit form data
- `ValidateFormCommand` - Validate form fields
- `LoadRemoteRecordCommand` - Load data for editing
- `FilterFieldsByFormModeCommand` - Filter fields by mode

**Table Operations:**
- `CreateTableCommand` - Initialize a new table
- `FetchListDataCommand` - Load table data
- `DeleteRecordCommand` - Delete a row
- `PrepareFormToUpdateCommand` - Open edit form with data
- `NormalizeColumnsCommand` - Process column definitions

**Shared Operations:**
- `GenerateFormDataCommand` - Convert fields to API format
- `SetFieldsErrorsCommand` - Set validation errors
- `GetColumnValueCommand` - Extract column values

## Using Built-in Commands

FancyCRUD provides many built-in commands you can use directly:

```vue
<template>
  <f-form v-bind="form" />
  
  <!-- Display form data in real-time -->
  <v-card class="mt-4">
    <v-card-title>Form Data (Real-time)</v-card-title>
    <v-card-text>
      <pre>{{ formData }}</pre>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { useForm, Bus, GenerateFormDataCommand } from '@fancy-crud/vue'

const bus = new Bus()

const form = useForm({
  fields: {
    firstName: {
      type: 'text',
      label: 'First Name',
      modelValue: ''
    },
    lastName: {
      type: 'text',
      label: 'Last Name',
      modelValue: ''
    },
    email: {
      type: 'text',
      label: 'Email',
      modelValue: ''
    }
  }
})

// Reactive form data - updates whenever fields change
const formData = computed(() => 
  bus.execute(new GenerateFormDataCommand(form.fields))
)
</script>
```

This example:
1. Creates a `Bus` instance to execute commands
2. Defines a form with multiple fields
3. Uses `GenerateFormDataCommand` to convert field values to API-ready format
4. Reactively updates the display whenever field values change

## Creating Custom Commands

You can create your own commands to encapsulate custom business logic. Let's walk through creating a complete custom command.

### Step 1: Define the Command

Create a command class that implements `IBaseCommand`:

```ts
// commands/GreetCommand.ts
import type { IBaseCommand, Meta } from '@fancy-crud/bus'

export class GreetCommand implements IBaseCommand {
  public readonly $meta: Meta<string>

  constructor(
    public readonly name: string,
    public readonly greeting: string = 'Hello'
  ) {}
}
```

**Key Points:**
- Implement `IBaseCommand` interface
- Declare `$meta: Meta<T>` where `T` is the return type
- Use `readonly` for command properties (commands are immutable)
- Commands should be data containers only (no business logic)
- TypeScript will infer the return type from `Meta<T>`

### Step 2: Create the Handler

Create a handler class that implements the business logic:

```ts
// handlers/GreetHandler.ts
import type { IBaseHandler } from '@fancy-crud/bus'
import type { GreetCommand } from '../commands/GreetCommand'

export class GreetHandler implements IBaseHandler<GreetCommand> {
  execute(command: GreetCommand): string {
    const message = `${command.greeting}, ${command.name}! Welcome to FancyCRUD.`
    return message
  }
}
```

**Key Points:**
- Implement `IBaseHandler<TCommand>` where `TCommand` is your command type
- Implement the `execute` method with your business logic
- The return type is automatically inferred from the command's `$meta`
- Handlers can inject dependencies (shown below)

### Step 3: Register the Handler

Register your command-handler pair so the bus knows how to route commands:

```ts
// Register in your entry file (main.ts) or plugin
import { register } from '@fancy-crud/bus'
import { GreetCommand } from './commands/GreetCommand'
import { GreetHandler } from './handlers/GreetHandler'

register(GreetCommand, GreetHandler)
```

**Best Practice:**
- Register commands in your application's entry point (`main.ts`)
- Or create a dedicated `commands.ts` file imported at startup
- Avoid registering in components (unless absolutely necessary)

::: warning
The `register()` function must be called **before** attempting to execute the command. Otherwise, you'll get:
```
HandlerDoesNotExist: Handler not found for command: GreetCommand
```
:::

### Step 4: Use the Command

Now you can execute your command from anywhere in your application:

```vue
<template>
  <f-form v-bind="form" />
  
  <v-card class="mt-4">
    <v-card-title>Greeting Message</v-card-title>
    <v-card-text>
      <p v-if="greetingMessage">{{ greetingMessage }}</p>
      <p v-else>Enter your name and click the button</p>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useForm, Bus, register } from '@fancy-crud/vue'
import { GreetCommand } from './commands/GreetCommand'
import { GreetHandler } from './handlers/GreetHandler'

// Register the command-handler pair
register(GreetCommand, GreetHandler)

const bus = new Bus()
const greetingMessage = ref('')

const form = useForm({
  fields: {
    name: {
      type: 'text',
      label: 'Your Name',
      modelValue: '',
      placeholder: 'Enter your name...'
    },
    greeting: {
      type: 'select',
      label: 'Greeting Type',
      modelValue: 'Hello',
      options: [
        { label: 'Hello', value: 'Hello' },
        { label: 'Hi', value: 'Hi' },
        { label: 'Welcome', value: 'Welcome' },
        { label: 'Greetings', value: 'Greetings' },
      ]
    }
  },
  buttons: {
    main: {
      label: 'Say Hello!',
      onClick: sayHello,
    },
  },
})

function sayHello() {
  // Execute the command
  greetingMessage.value = bus.execute(
    new GreetCommand(
      form.fields.name.modelValue,
      form.fields.greeting.modelValue
    )
  )
}
</script>
```

## Advanced Patterns

### Commands with Dependencies

Handlers can inject dependencies through their constructor:

```ts
// Command
export class SendEmailCommand implements IBaseCommand {
  public readonly $meta: Meta<Promise<boolean>>

  constructor(
    public readonly to: string,
    public readonly subject: string,
    public readonly body: string
  ) {}
}

// Handler with dependencies
export class SendEmailHandler implements IBaseHandler<SendEmailCommand> {
  constructor(
    private emailService: EmailService,
    private logger: Logger
  ) {}

  execute(command: SendEmailCommand): Promise<boolean> {
    this.logger.info(`Sending email to ${command.to}`)
    return this.emailService.send({
      to: command.to,
      subject: command.subject,
      body: command.body,
    })
  }
}

// Register with dependencies
register(SendEmailCommand, SendEmailHandler)

// Execute with providers
const result = bus.execute(
  new SendEmailCommand('user@example.com', 'Hello', 'Message body'),
  [emailServiceInstance, loggerInstance]
)
```

### Async Commands

Commands can return promises for async operations:

```ts
// Async command
export class FetchUserCommand implements IBaseCommand {
  public readonly $meta: Meta<Promise<User>>

  constructor(
    public readonly userId: number
  ) {}
}

// Async handler
export class FetchUserHandler implements IBaseHandler<FetchUserCommand> {
  async execute(command: FetchUserCommand): Promise<User> {
    const response = await axios.get(`/users/${command.userId}`)
    return response.data
  }
}

// Usage with await
const user = await bus.execute(new FetchUserCommand(123))
console.log(user.name)
```

### Command Composition

Commands can execute other commands within handlers:

```ts
export class CreateUserWithRoleHandler implements IBaseHandler<CreateUserWithRoleCommand> {
  execute(command: CreateUserWithRoleCommand): User {
    const bus = new Bus()
    
    // Execute CreateUserCommand
    const user = bus.execute(
      new CreateUserCommand(command.userData)
    )
    
    // Execute AssignRoleCommand
    bus.execute(
      new AssignRoleCommand(user.id, command.roleId)
    )
    
    return user
  }
}
```

### Command Middleware Pattern

Create reusable logic that wraps command execution:

```ts
// Logging middleware
function withLogging<T extends IBaseCommand>(command: T) {
  const bus = new Bus()
  
  console.log(`Executing: ${command.constructor.name}`)
  const startTime = Date.now()
  
  try {
    const result = bus.execute(command)
    const duration = Date.now() - startTime
    console.log(`Success: ${command.constructor.name} (${duration}ms)`)
    return result
  } catch (error) {
    console.error(`Error: ${command.constructor.name}`, error)
    throw error
  }
}

// Usage
const result = withLogging(new SaveFormCommand(form))
```

## Real-World Examples

### Example 1: Export Data Command

```ts
// Command
export class ExportTableDataCommand implements IBaseCommand {
  public readonly $meta: Meta<Blob>

  constructor(
    public readonly data: any[],
    public readonly format: 'csv' | 'xlsx' | 'pdf',
    public readonly filename: string
  ) {}
}

// Handler
export class ExportTableDataHandler implements IBaseHandler<ExportTableDataCommand> {
  execute(command: ExportTableDataCommand): Blob {
    switch (command.format) {
      case 'csv':
        return this.exportToCSV(command.data, command.filename)
      case 'xlsx':
        return this.exportToExcel(command.data, command.filename)
      case 'pdf':
        return this.exportToPDF(command.data, command.filename)
    }
  }

  private exportToCSV(data: any[], filename: string): Blob {
    const csv = this.convertToCSV(data)
    return new Blob([csv], { type: 'text/csv' })
  }

  private convertToCSV(data: any[]): string {
    // CSV conversion logic
    const headers = Object.keys(data[0]).join(',')
    const rows = data.map(row => Object.values(row).join(',')).join('\n')
    return `${headers}\n${rows}`
  }

  // ... other export methods
}

// Usage
const table = useTable({ /* ... */ })
const bus = new Bus()

function exportData(format: 'csv' | 'xlsx' | 'pdf') {
  const blob = bus.execute(
    new ExportTableDataCommand(
      table.list.data,
      format,
      `users_export_${Date.now()}.${format}`
    )
  )
  
  // Download the file
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `export.${format}`
  link.click()
}
```

### Example 2: Batch Operations Command

```ts
// Command for batch operations
export class BatchDeleteCommand implements IBaseCommand {
  public readonly $meta: Meta<Promise<{ success: number; failed: number }>>

  constructor(
    public readonly ids: number[],
    public readonly url: string
  ) {}
}

// Handler
export class BatchDeleteHandler implements IBaseHandler<BatchDeleteCommand> {
  async execute(command: BatchDeleteCommand) {
    const results = await Promise.allSettled(
      command.ids.map(id => 
        axios.delete(`${command.url}${id}/`)
      )
    )

    const success = results.filter(r => r.status === 'fulfilled').length
    const failed = results.filter(r => r.status === 'rejected').length

    return { success, failed }
  }
}

// Usage
const selectedRows = ref([1, 2, 3, 4, 5])

async function deleteSelected() {
  const { success, failed } = await bus.execute(
    new BatchDeleteCommand(selectedRows.value, 'users/')
  )

  console.log(`Deleted ${success} records, ${failed} failed`)
  
  // Refresh table
  table.list.fetchData()
}
```

### Example 3: Form Data Validation Command

```ts
interface ValidationResult {
  valid: boolean
  errors: Record<string, string[]>
}

// Command
export class ValidateFormDataCommand implements IBaseCommand {
  public readonly $meta: Meta<ValidationResult>

  constructor(
    public readonly data: Record<string, any>,
    public readonly rules: ValidationRules
  ) {}
}

// Handler
export class ValidateFormDataHandler implements IBaseHandler<ValidateFormDataCommand> {
  execute(command: ValidateFormDataCommand): ValidationResult {
    const errors: Record<string, string[]> = {}

    for (const [field, rules] of Object.entries(command.rules)) {
      const value = command.data[field]
      const fieldErrors: string[] = []

      for (const rule of rules) {
        const result = rule.validate(value)
        if (result !== true) {
          fieldErrors.push(result)
        }
      }

      if (fieldErrors.length > 0) {
        errors[field] = fieldErrors
      }
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    }
  }
}

// Usage
const validationRules = {
  email: [
    { validate: (v) => /.+@.+/.test(v) || 'Invalid email' },
    { validate: (v) => v.length > 0 || 'Email is required' },
  ],
  age: [
    { validate: (v) => v >= 18 || 'Must be 18 or older' },
  ],
}

const result = bus.execute(
  new ValidateFormDataCommand(form.fields, validationRules)
)

if (!result.valid) {
  console.log('Validation errors:', result.errors)
}
```

## Best Practices

### 1. **Command Naming**
Use descriptive, action-oriented names that clearly state intent:

```ts
// ✅ Good
CreateUserCommand
DeleteRecordCommand
SendEmailNotificationCommand
ExportTableDataCommand

// ❌ Bad
UserCommand
RecordCommand
EmailCommand
DataCommand
```

### 2. **Keep Commands Simple**
Commands should be data containers only:

```ts
// ✅ Good - Just data
export class UpdateUserCommand implements IBaseCommand {
  public readonly $meta: Meta<User>

  constructor(
    public readonly userId: number,
    public readonly updates: Partial<User>
  ) {}
}

// ❌ Bad - Contains logic
export class UpdateUserCommand implements IBaseCommand {
  public readonly $meta: Meta<User>

  constructor(
    public readonly userId: number,
    public readonly updates: Partial<User>
  ) {
    // Don't do validation or transformations here
    if (!this.userId) throw new Error('Invalid ID') // ❌ No validation!
    this.updates = this.sanitize(updates) // ❌ No logic!
  }
}
```

### 3. **Single Responsibility for Handlers**
Each handler should do one thing well:

```ts
// ✅ Good - Focused responsibility
export class SaveUserHandler implements IBaseHandler<SaveUserCommand> {
  execute(command: SaveUserCommand): Promise<User> {
    return axios.post('/users', command.data)
  }
}

// ❌ Bad - Too many responsibilities
export class SaveUserHandler extends IBaseHandler<SaveUserCommand> {
  execute(command: SaveUserCommand): Promise<User> {
    // Validate
    this.validate(command.data)
    // Transform
    const transformed = this.transform(command.data)
    // Save
    const user = await axios.post('/users', transformed)
    // Send email
    await this.sendWelcomeEmail(user)
    // Log activity
    await this.logActivity(user)
    return user
  }
}
```

Break complex operations into multiple commands:

```ts
// ✅ Better - Separate commands
bus.execute(new SaveUserCommand(data))
bus.execute(new SendWelcomeEmailCommand(user.email))
bus.execute(new LogActivityCommand(user.id, 'user_created'))
```

### 4. **Use TypeScript Generics**
Let TypeScript infer return types automatically:

```ts
// ✅ Good - Type-safe
export class FetchUserCommand implements IBaseCommand {
  public readonly $meta: Meta<Promise<User>>

  constructor(
    public readonly id: number
  ) {}
}

// TypeScript knows this returns Promise<User>
const user = await bus.execute(new FetchUserCommand(1))
user.name // ✅ Type-safe
```

### 5. **Register Commands at App Startup**
Don't register in components:

```ts
// ✅ Good - main.ts or commands.ts
import { register } from '@fancy-crud/bus'
import * as commands from './commands'
import * as handlers from './handlers'

register(commands.SaveUserCommand, handlers.SaveUserHandler)
register(commands.DeleteUserCommand, handlers.DeleteUserHandler)
// ... all commands

// ❌ Bad - component
<script setup>
// Don't register here unless you have a very good reason
register(SaveUserCommand, SaveUserHandler)
</script>
```

### 6. **Handle Errors Gracefully**
Always handle potential errors in handlers:

```ts
export class SaveFormHandler implements IBaseHandler<SaveFormCommand> {
  async execute(command: SaveFormCommand) {
    try {
      const response = await axios.post(command.url, command.data)
      return response.data
    } catch (error) {
      if (error.response?.status === 422) {
        // Handle validation errors
        throw new ValidationError(error.response.data.errors)
      }
      // Re-throw other errors
      throw error
    }
  }
}
```

## Troubleshooting

### Error: Handler not found for command

**Problem:**
```
HandlerDoesNotExist: Handler not found for command: MyCommand
```

**Solutions:**
1. Ensure you've called `register(MyCommand, MyHandler)`
2. Registration must happen before execution
3. Check that the handler is imported correctly
4. Verify the command class name matches

### TypeScript: Type errors with command execution

**Problem:**
```ts
const result = bus.execute(new MyCommand())
// Type 'unknown' is not assignable to...
```

**Solution:**
Ensure your command implements `IBaseCommand` with `$meta: Meta<ReturnType>`:

```ts
// ✅ Correct
export class MyCommand implements IBaseCommand {
  public readonly $meta: Meta<string>

  constructor(
    public readonly name: string
  ) {}
}
```

### Commands not working in production

**Problem:**
Commands work in development but fail in production build.

**Solutions:**
1. Ensure all commands are registered before app mounts
2. Check that commands/handlers are properly imported (not tree-shaken)
3. Verify class names aren't being mangled by minification

## Performance Considerations

### Command Pooling
For frequently executed commands, consider object pooling:

```ts
class CommandPool<T> {
  private pool: T[] = []

  get(): T | undefined {
    return this.pool.pop()
  }

  return(item: T) {
    this.pool.push(item)
  }
}

// Reuse command instances
const pool = new CommandPool<FetchDataCommand>()
const command = pool.get() || new FetchDataCommand()
bus.execute(command)
pool.return(command)
```

### Memoization
Cache command results for expensive operations:

```ts
const cache = new Map()

function executeWithCache<T extends IBaseCommand>(command: T) {
  const key = JSON.stringify(command)
  
  if (cache.has(key)) {
    return cache.get(key)
  }

  const result = bus.execute(command)
  cache.set(key, result)
  return result
}
```

## Next Steps

- Explore [Form Commands](/forms/commands) for all available form operations
- Learn about [Table Commands](/tables/commands) for table-specific commands
- Check out the [Configuration Guide](/guide/configuration) for setting up FancyCRUD
