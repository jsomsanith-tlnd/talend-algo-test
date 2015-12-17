var CONTAINS = 'contains';
var INVALID_RECORDS = 'invalid_records';
var EMPTY_RECORDS = 'empty_records';
var INSIDE_RANGE = 'inside_range';

function getFilterTree(filter) {
    switch (filter.type) {
        case CONTAINS:
            return {
                contains: {
                    field: filter.colId,
                    value: filter.args.phrase
                }
            };
        case INVALID_RECORDS:
            return {
                invalid: {
                    field: filter.colId
                }
            };
        case EMPTY_RECORDS:
            return {
                empty: {
                    field: filter.colId
                }
            };
        case INSIDE_RANGE:
            return {
                range: {
                    field: filter.colId,
                    start: filter.args.min,
                    end: filter.args.max
                }
            };
    }
}

function reduceFn(accu, filter) {
    var nextAccuFilter = getFilterTree(filter);

    if(Object.keys(accu).length !== 0) {
        nextAccuFilter = {
            and: [nextAccuFilter, accu]
        };
    }

    return nextAccuFilter;
}

function toTree(filters) {
    return filters.reduce(reduceFn, {});
}