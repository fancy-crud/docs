# Table Commands

**FancyCRUD** provides a collection of commands to work with tables. These commands power table operations and can be used directly when needed.

## Table Creation & Initialization

### CreateTableCommand

The command `CreateTableCommand` receives raw table attributes and creates a complete normalized table with all required stores and configurations.

```ts
const bus = new Bus()

const table = bus.execute(
  new CreateTableCommand({
    form: userForm,
    columns: {
      firstName: {
        label: 'First Name'
      },
      email: {
        label: 'Email Address'
      }
    },
    settings: {
      url: 'users/'
    },
    pagination: {
      rowsPerPage: 25
    },
    buttons: {
      add: {
        label: 'Add User'
      }
    }
  })
)
```

This command internally:
- Normalizes columns, settings, pagination, filters, buttons, and list configuration
- Sets up default click handlers for add, edit, and remove buttons
- Creates table store with all normalized properties
- Sets up form dialog management
- Configures data fetching functionality
- Returns a complete table object

### NormalizeColumnsCommand

The command `NormalizeColumnsCommand` converts raw column definitions into normalized columns with all default properties.

```ts
const bus = new Bus()

const normalizedColumns = bus.execute(
  new NormalizeColumnsCommand({
    firstName: {
      label: 'First Name'
    },
    email: {
      label: 'Email',
      format: (value) => value.toLowerCase()
    }
  }, formFields)
)
```

This command:
- Merges form fields with column definitions
- Sets default values for each column
- Configures input properties for inline editing
- Handles column value extraction and formatting

### NormalizePaginationCommand

The command `NormalizePaginationCommand` normalizes pagination configuration with default values.

```ts
const bus = new Bus()

const normalizedPagination = bus.execute(
  new NormalizePaginationCommand({
    rowsPerPage: 25,
    rowsPerPageOptions: [25, 50, 100]
  })
)
```

Normalized pagination includes:
- `page`: Current page number (default: 1)
- `rowsPerPage`: Number of rows per page (default: 10)
- `rowsPerPageOptions`: Available page size options (default: [10, 25, 50, 100])
- `count`: Total number of records (default: 0)
- `hidden`: Whether pagination is hidden (default: false)

### NormalizeTableSettingsCommand

The command `NormalizeTableSettingsCommand` merges table settings with default values.

```ts
const bus = new Bus()

const normalizedSettings = bus.execute(
  new NormalizeTableSettingsCommand({
    url: 'users/',
    lookupField: 'id',
    skipDeleteConfirmation: false
  })
)
```

Normalized settings include:
- `url`: API endpoint for table data
- `lookupField`: Field used for record lookups (default: 'id')
- `skipDeleteConfirmation`: Skip delete confirmation dialog (default: false)
- `displayFormDialog`: Whether form dialog is shown (default: false)
- `displayConfirmationDialog`: Whether confirmation dialog is shown (default: false)
- `rowToDelete`: Current row being deleted (default: null)

### NormalizeTableFiltersCommand

The command `NormalizeTableFiltersCommand` normalizes filter parameters for data fetching.

```ts
const bus = new Bus()

const normalizedFilters = bus.execute(
  new NormalizeTableFiltersCommand({
    status: 'active',
    role: 'admin'
  })
)
```

This command passes through filter parameters that will be sent with data fetch requests.

### NormalizeTableButtonsCommand

The command `NormalizeTableButtonsCommand` normalizes button definitions with default labels and properties.

```ts
const bus = new Bus()

const normalizedButtons = bus.execute(
  new NormalizeTableButtonsCommand({
    add: {
      label: 'Add User',
      icon: 'mdi-plus'
    },
    edit: {
      label: 'Edit'
    },
    remove: {
      label: 'Delete'
    },
    customAction: {
      label: 'Export',
      onClick: () => exportData()
    }
  })
)
```

Normalized buttons include:
- **Built-in buttons**: `add`, `edit`, `remove` with default configurations
- **Custom buttons**: Any additional buttons you define
- Default properties: `hidden`, `class`, `isLoading`, `onClick`
- CSS classes from configuration

### NormalizeTableListCommand

The command `NormalizeTableListCommand` normalizes list configuration and data management.

```ts
const bus = new Bus()

const normalizedList = bus.execute(
  new NormalizeTableListCommand({
    data: [],
    options: {
      autoTrigger: true
    }
  })
)
```

Normalized list includes:
- `data`: Array of table rows (default: [])
- `isFetching`: Loading state (default: false)
- `options`: Fetch options including `autoTrigger`
- `fetchData`: Function to fetch data

## Data Management

### FetchListDataCommand

The command `FetchListDataCommand` fetches paginated data from the API.

```ts
const bus = new Bus()

bus.execute(
  new FetchListDataCommand(tableId, 1, {
    onSuccess: (response) => {
      console.log('Data loaded:', response)
    }
  })
)
```

This command:
1. Sets the table loading state
2. Calculates offset based on page and rows per page
3. Includes filter parameters in the request
4. Fetches data from the table's URL
5. Updates table data using `SetListDataCommand`
6. Resets loading state

### SetListDataCommand

The command `SetListDataCommand` updates the table's data and pagination count.

```ts
const bus = new Bus()

bus.execute(
  new SetListDataCommand(tableId, responseData)
)
```

This command handles two data formats:
- **Array**: Sets data directly and count to array length
- **Paginated object**: Extracts results and count from pagination structure

### ResetTablePaginationCommand

The command `ResetTablePaginationCommand` resets the table pagination to the first page.

```ts
const bus = new Bus()

bus.execute(
  new ResetTablePaginationCommand(tableId)
)
```

This command resets the `page` property to 1, useful when applying new filters or refreshing data.

## Record Operations

### DeleteRecordCommand

The command `DeleteRecordCommand` handles record deletion with optional confirmation.

```ts
const bus = new Bus()

bus.execute(
  new DeleteRecordCommand(tableId, row, tableSettings, {
    onSuccess: () => {
      console.log('Record deleted')
    }
  })
)
```

This command:
1. Shows confirmation dialog (if not skipped)
2. Extracts lookup value from the row
3. Sends delete request to API
4. Refreshes table data after deletion
5. Cleans up confirmation dialog state

The delete flow:
- If `skipDeleteConfirmation` is false: Shows confirmation dialog
- After confirmation: Executes the delete request
- After deletion: Fetches updated list data

### UpdateRowValueCommand

The command `UpdateRowValueCommand` updates a single field value for a row.

```ts
const bus = new Bus()

bus.execute(
  new UpdateRowValueCommand(
    newValue,
    row,
    'status',
    tableSettings,
    {
      onSuccess: () => {
        console.log('Value updated')
      }
    }
  )
)
```

This command:
- Extracts the lookup value from the row
- Sends a PATCH/PUT request with the single field update
- Supports inline editing functionality
- Handles API response callbacks

## Form Integration

### PrepareFormToCreateCommand

The command `PrepareFormToCreateCommand` prepares a form for creating a new record from the table.

```ts
const bus = new Bus()

bus.execute(
  new PrepareFormToCreateCommand(formId, {
    onClickAux: () => {
      table.settings.displayFormDialog = false
    }
  })
)
```

This command:
- Switches the form to create mode
- Resets all form fields
- Sets the form loading state to false
- Optionally configures the aux button handler
- Usually triggered by the table's "Add" button

### PrepareFormToUpdateCommand

The command `PrepareFormToUpdateCommand` prepares a form for editing an existing record from the table.

```ts
const bus = new Bus()

bus.execute(
  new PrepareFormToUpdateCommand(formId, row, tableSettings, {
    onClickAux: () => {
      table.settings.displayFormDialog = false
    },
    onReady: () => {
      console.log('Form ready for editing')
    }
  })
)
```

This command:
1. Switches the form to update mode
2. Extracts lookup value from the row
3. Fetches full record data from API
4. Populates form fields with record data
5. Manages form loading state
6. Usually triggered by the table's "Edit" button

The update flow:
- Sets form to update mode
- Shows loading state
- Fetches record details
- Populates all form fields
- Calls `onReady` callback when complete

## Column Utilities

### GetColumnValueCommand

The command `GetColumnValueCommand` extracts and formats a column value from a row.

```ts
const bus = new Bus()

const value = bus.execute(
  new GetColumnValueCommand(row, column, rowIndex)
)
```

This command processes column values in order:
1. **Extract from row**: Gets value using `column.value` as key
2. **Apply field function**: If `column.field` exists, uses custom extraction logic
3. **Apply format function**: If `column.format` exists, formats the value
4. Returns the final processed value

Example with custom field and format:

```ts
const column = {
  value: 'createdAt',
  field: (row) => row.created_at, // Custom extraction
  format: (value) => new Date(value).toLocaleDateString() // Formatting
}

const value = bus.execute(
  new GetColumnValueCommand(row, column, 0)
)
// Returns formatted date string
```

This command is used internally by table components to display cell values.

