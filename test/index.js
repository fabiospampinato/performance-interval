
/* IMPORT */

import {describe} from 'fava';
import {setTimeout as delay} from 'node:timers/promises';
import {setPerformanceInterval, clearPerformanceInterval} from '../dist/index.js';

/* HELPERS */

const isWithinPercentage = ( actual, expected, percentage ) => {
  const min = expected - ( expected * ( percentage / 100 ) );
  const max = expected + ( expected * ( percentage / 100 ) );
  return actual >= min && actual <= max;
};

/* MAIN */

describe ( 'Performance Interval', it => {

  it ( 'works with sub-millisecond intervals', async t => {

    const times = [];

    const intervalId = setPerformanceInterval ( () => {

      times.push ( performance.now () );

    }, 0.25 );

    await delay ( 1000 );

    clearPerformanceInterval ( intervalId );

    t.true ( isWithinPercentage ( times.length, 4000, 5 ) );

  });

});
