# Performance Interval

A precise implementation of `setInterval` that supports sub-millisecond intervals.

This doesn't block the main thread, but it does block another thread, which AFAIK is the only way to implement this in an isomorphic way. So make sure to not use this in production because it's still **expensive**.

## Install

```sh
npm install --save performance-interval
```

## Usage

```ts
import {setPerformanceInterval, clearPerformanceInterval} from 'performance-interval';

// Scheduling a sub-millisecond precise interval

const interval = 0.5; // 500 microseconds
const intervalId = setPerformanceInterval ( () => {

  console.log ( performance.now () ); // Called every 500 microseconds

}, interval );

// Clearing a precise interval

setTimeout ( () => {

  clearPerformanceInterval ( intervalId );

}, 1000 );
```

## License

MIT © Fabio Spampinato
