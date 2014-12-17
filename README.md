statements
==========

Meet `statements`. An elegantly simple SQL statement utilty for Node.js. 

`statements` lets you write SQL in a raw file. You simply delimit each SQL statement with a comment.  `statements` will use the contents of that comment as the object key.

##Getting started

Import the module into your project.
```
npm install statements
```

Create a file with SQL statements where each statement has a comment block at the beginning.
```sql
-- createTable
CREATE TABLE environment (
  idenvironment INTEGER PRIMARY KEY AUTOINCREMENT,
  name NVARCHAR(255) NOT NULL,
  description TEXT
);

-- selectById
SELECT environment where idenvironment = $id;
```

Read the SQL file and use the statements in code!
```javascript
// load the module
var statements = require('statements');

// read the contents of a file into an object
var sql = statements.read('environments.sql');

// do something with the values
db.run(sql.createTable);
db.all(sql.selectById);
```

##Options
Statements supports sync and async.

####read(file, callback)
file - required
callback - node style callback

Performs a sync operation if no callback is specified. Will return the result when run in synchronous mode.

####readAsync(file, callback)
file - required
callback - optional node style callback

Executes the load asynchronously and return a promise and optionally calls the callback. The result will be an object

####readSync(file)
file - required

Performs a sync operation. Will return the result when run in synchronous mode.


##Contributing
In leui of a style-guide please follow existing patterns and add appropriate unit tests.

You can validate your code with `grunt validate`

