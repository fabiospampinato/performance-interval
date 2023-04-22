
/* IMPORT */

import Worker from 'webworker-shim';

/* HELPERS */

let id = 1;
let workers: Record<number, Worker> = {};

const createWorker = (): Worker => {

  //TODO: Re-use a single blocked worker for every interval, otherwise this gets even more expensive

  return new Worker ( `data:text/javascript;charset=utf-8,${encodeURIComponent (`
    addEventListener ( 'message', event => {
      let interval = event.data;
      let start = performance.now ();
      while ( true ) {
        const end = performance.now ();
        const elapsed = ( end - start );
        if ( elapsed < interval ) continue;
        start = end;
        postMessage ( 'interval' );
      }
    });
  `)}`);

};

/* MAIN */

const setPerformanceInterval = <Args extends unknown[]> ( fn: ( ...args: Args ) => void, interval: number, ...args: Args ): number => {

  const intervalId = id++;
  const worker = createWorker ();

  workers[intervalId] = worker;

  worker.addEventListener ( 'message', () => fn ( ...args ) );
  worker.postMessage ( interval );

  return intervalId;

};

const clearPerformanceInterval = ( intervalId: number ): void => {

  workers[intervalId]?.terminate ();

  delete workers[intervalId];

};

/* EXPORT */

export {setPerformanceInterval, clearPerformanceInterval};
