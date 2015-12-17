# talend-algo-test

A filter is an object describing a predicate on a dataset records.
Given a list of filters, the goal of the exercise is to generate a tree, representing those filters in another format.

## Filters
Each filter has properties : 

* type : string
* colId : string that represents an id
* args : object that can contain any argument that the filter needs. This is optional.

There are 4 types of filters.

### CONTAINS

```javascript
        {
            type: CONTAINS,
            colId: '0001',          
            args: {phrase: 'toto'}
        }
```

The tree representation is
 
```javascript
        {
            contains: {
                field: '0001',
                value: 'toto'
            }
        }
```

### INVALID_RECORDS

```javascript
        {
            type: INVALID_RECORDS,
            colId: '0001'
        }
```

The tree representation is
 
```javascript
        {
            invalid: {
                field: '0001'
            }
        }
```

### EMPTY_RECORDS

```javascript
        {
            type: EMPTY_RECORDS,
            colId: '0001'
        }
```

The tree representation is
 
```javascript
        {
            empty: {
                field: '0001'
            }
        }
```

### INSIDE_RANGE

```javascript
        {
            type: INSIDE_RANGE,
            colId: '0001',
            args: {
                min: 5,
                max: 20
            }
        }
```

The tree representation is
 
```javascript
        {
            range: {
                field: '0001',
                start: 5,
                end: 20
            }
        }
```

## Filters composition

An array of filters means that all filters should apply on the records. To represent the composition, we have the `and` operator.

```javascript
        {
            and: [
                leftFilter,
                rightFilter
            ]
        }
```

An `and` tree has and array of 2 children. A child can be a single filter tree or another `and` tree.