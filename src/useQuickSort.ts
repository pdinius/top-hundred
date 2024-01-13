import { useEffect, useState } from "react";

const shuffle = <T>(array: Array<T>): Array<T> => {
  let m = array.length;
  let t: T;
  let i: number;

  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

const isClient = typeof window !== "undefined";

const append = <T>(
  setter: React.Dispatch<React.SetStateAction<Array<T>>>,
  arr: Array<T>
) => {
  setter((curr) => {
    const copy = curr.slice();
    copy.push(...arr);
    return copy;
  });
};

export default function useQuickSort<T>(init: Array<T> | string) {
  let shuffled: Array<T> = [];
  if (Array.isArray(init)) {
    shuffled = shuffle(init);
  } else if (isClient) {
    const data = localStorage.getItem(init);
    if (data) {
      const parsed = JSON.parse(data);
      shuffled = shuffle(parsed);
    }
  }

  const [sorted, setSorted] = useState<Array<Array<T> | T>>([]); // ex. [[ ... to be sorted ... ], sorted, sorted, [ ... tbs ... ], sorted, [ ... tbs ... ], etc.]
  const [pivot, setPivot] = useState(shuffled[0]); // item removed from current group to sort all against
  const [columns, setColumns] = useState<Array<Array<T>>>([[], []]);
  const [current, setCurrent] = useState<Array<T>>(shuffled.slice(11)); // current group being sorted into the worse and better arrays
  const [worse, setWorse] = useState<Array<T>>([]); // items worse than pivot
  const [better, setBetter] = useState<Array<T>>([]); // items better than pivot
  const [idx, setIdx] = useState(0); // keeping track of the index in sorted to splice [worse, pivot, better] into once current is empty

  useEffect(() => {
    console.log(shuffled.length);
    updateColumns(shuffled.slice(1));
  }, []);

  const updateColumns = (items: Array<T>) => {
    const lowerBound = Math.min(Math.ceil(items.length / 2), 5);
    const upperBound = lowerBound + Math.min(Math.floor(items.length / 2), 5);
    setColumns([
      items.slice(0, lowerBound),
      items.slice(lowerBound, upperBound),
    ]);
  };

  const resetItems = (items: Array<T>) => {
    // ! FULL RESET
    const shuffled = shuffle(items);
    setSorted([]);
    setPivot(shuffled[0]);
    setCurrent(shuffled.slice(1));
    setWorse([]);
    setBetter([]);
    setIdx(0);
  };

  const sort = () => {
    append(setWorse, columns[0]);
    append(setBetter, columns[1]);
    setCurrent((curr) => {
      const columnItems = curr.slice(0, 10);
      const copy = curr.slice(10);

      if (columnItems.length > 0) {
        updateColumns(columnItems);
        return copy;
      } else {
        console.log(sorted);
        return copy;
        // console.log(`WORSE: ${worse.length + columns[0].length}, BETTER: ${better.length + columns[1].length}`);
        // // NEXT GROUP
        // let next: Array<T> = [];
        // let copy = sorted.slice();
        // copy.splice(idx, 1, worse, pivot, better);
        // copy = copy
        //   .map((v) => (Array.isArray(v) && v.length === 1 ? v[0] : v)) // turn single element arrays into just that element
        //   .filter((v) => (Array.isArray(v) ? v.length > 0 : true)); // remove empty arrays altogether (e.g. when worse or better have no elements)
        // const nextIdx = copy.findIndex((v) => Array.isArray(v));
        // if (nextIdx > -1) {
        //   setIdx(nextIdx);
        //   next = (copy[nextIdx] as Array<T>);
        // } else {
        //   // DONE SORTING
        // }
        // setSorted(copy);
        // setPivot(next[0]);
        // updateColumns(next.slice(1));
        // return next.slice(1);
      }
    });
  };

  const getStatus = () => {
    return [
      ...sorted.slice(0, idx),
      worse,
      [pivot, ...current],
      better,
      ...sorted.slice(idx),
    ];
  };

  const swap = (from: number, to: number, fromIdx: number, toIdx: number) => {
    setColumns((curr) => {
      const copy = curr.slice();
      const spliced = copy[from].splice(fromIdx, 1);
      copy[to].splice(toIdx, 0, spliced[0]);
      return copy;
    });
  };

  return {
    pivot,
    resetItems,
    sort,
    getStatus,
    columns,
    swap,
  };
}
