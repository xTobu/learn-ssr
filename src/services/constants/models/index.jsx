import Immutable from 'immutable';

// initstate model
const CounterState = Immutable.Record({
    count: 0,
});

export { CounterState };
