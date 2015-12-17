describe('Tree converter', function() {
    it('should generate empty filter tree', function() {
        //given
        var filters = [];

        //when
        var result = toTree(filters);

        //then
        expect(result).toEqual({});
    });

    it('should generate CONTAINS filter tree', function() {
        //given
        var filters = [
            {
                type: CONTAINS,
                colId: '0001',
                args: {phrase: 'toto'}
            }
        ];

        //when
        var result = toTree(filters);

        //then
        expect(result).toEqual({
            contains: {
                field: '0001',
                value: 'toto'
            }
        });
    });

    it('should generate INVALID_RECORDS filter tree', function() {
        //given
        var filters = [
            {
                type: INVALID_RECORDS,
                colId: '0001'
            }
        ];

        //when
        var result = toTree(filters);

        //then
        expect(result).toEqual({
            invalid: {
                field: '0001'
            }
        });
    });

    it('should generate EMPTY_RECORDS filter tree', function() {
        //given
        var filters = [
            {
                type: EMPTY_RECORDS,
                colId: '0001'
            }
        ];

        //when
        var result = toTree(filters);

        //then
        expect(result).toEqual({
            empty: {
                field: '0001'
            }
        });
    });

    it('should generate INSIDE_RANGE filter tree', function() {
        //given
        var filters = [
            {
                type: INSIDE_RANGE,
                colId: '0001',
                args: {
                    min: 5,
                    max: 20
                }
            }
        ];

        //when
        var result = toTree(filters);

        //then
        expect(result).toEqual({
            range: {
                field: '0001',
                start: 5,
                end: 20
            }
        });
    });

    it('should generate multiple filters tree', function() {
        //given
        var filters = [
            {
                type: INSIDE_RANGE,
                colId: '0001',
                args: {
                    min: 5,
                    max: 20
                }
            },
            {
                type: EMPTY_RECORDS,
                colId: '0002'
            },
            {
                type: INVALID_RECORDS,
                colId: '0003'
            },
            {
                type: CONTAINS,
                colId: '0002',
                args: {
                    phrase: 'toto'
                }
            }
        ];

        //when
        var result = toTree(filters);

        //then
        expect(result).toEqual({
            and: [
                {
                    contains: {
                        field: '0002',
                        value: 'toto'
                    }
                },
                {
                    and: [
                        {
                            invalid: {
                                field: '0003'
                            }
                        },
                        {
                            and: [
                                {
                                    empty: {
                                        field: '0002'
                                    }
                                },
                                {
                                    range: {
                                        field: '0001',
                                        start: 5,
                                        end: 20
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    });
});