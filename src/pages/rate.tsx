import { LOCAL_KEY } from "@/constants";
import { GameData } from "@/types/game-types";
import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import styles from "@/styles/Rate.module.scss";
import { cleanString } from ".";
import { GameCard } from "@/components/GameCard";
import { Status } from "@/components/Status";

const shuffle = <T,>(array: Array<T>): Array<T> => {
  let m = array.length,
    t,
    i;

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

const draggableMap = (game: GameData, idx: number) => {
  return (
    <Draggable key={game.id!} draggableId={game.id!} index={idx}>
      {({ innerRef, dragHandleProps, draggableProps }) => {
        return (
          <div ref={innerRef} {...dragHandleProps} {...draggableProps}>
            <GameCard game={game} />
          </div>
        );
      }}
    </Draggable>
  );
};

export default function App() {
  const [sorted, setSorted] = useState<Array<Array<GameData>>>([[], []]);
  const [completed, setCompleted] = useState<Array<Array<GameData> | GameData>>(
    []
  );
  const [worse, setWorse] = useState<Array<GameData>>([]);
  const [better, setBetter] = useState<Array<GameData>>([]);
  const [pivot, setPivot] = useState<GameData>();
  const [remaining, setRemaining] = useState<Array<GameData>>([]);
  const [index, setIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    if (typeof window !== "undefined") {
      const data = localStorage.getItem(LOCAL_KEY);
      if (data) {
        const parsed: Array<GameData> = JSON.parse(data).map((v: GameData) => {
          v.name = cleanString(v.name);
          return v;
        });
        const shuffled = shuffle(parsed);
        setCompleted([shuffled]);
        console.log([shuffled]);
        const dPivot = shuffled[0];
        const dWorse = shuffled.slice(1, 6);
        const dBetter = shuffled.slice(6, 11);
        const dRemaining = shuffled.slice(11);
        setRemaining(dRemaining);
        setWorse(dWorse);
        setBetter(dBetter);
        setPivot(dPivot);
      }
    }

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  const onDragEnd: OnDragEndResponder = ({ source, destination }) => {
    if (!source || !destination) return;
    const sourceId = source.droppableId;
    const destinId = destination.droppableId;
    const sourceIdx = source.index;
    const destinIdx = destination.index;

    if (sourceId === destinId) {
      const setter = sourceId === "worse" ? setWorse : setBetter;
      setter((curr) => {
        const copy = curr.slice();
        const removed = copy.splice(sourceIdx, 1);
        copy.splice(destinIdx, 0, removed[0]);
        return copy;
      });
    } else {
      const setterA = sourceId === "worse" ? setWorse : setBetter;
      const setterB = destinId === "worse" ? setWorse : setBetter;

      setterA((curr) => {
        const copy = curr.slice();
        const removed = copy.splice(sourceIdx, 1);
        setterB((curr) => {
          const copy = curr.slice();
          copy.splice(destinIdx, 0, removed[0]);
          return copy;
        });
        return copy;
      });
    }
  };

  const nextGroup = () => {
    setSorted((curr) => {
      const copy = curr.slice();
      copy[0].push(...worse);
      copy[1].push(...better);
      return copy;
    });
    if (remaining.length === 0) {
      // NEXT PIVOT
      // Replace completed[index] with [sorted[0], pivot, sorted[1]]
      setCompleted(curr => {
        let copy = curr.slice();
        copy.splice(index, 1, sorted[0], pivot!, sorted[1]);
        copy = copy.map(v => {
          if (Array.isArray(v) && v.length === 1) {
            return v[0];
          } else {
            return v;
          }
        }).filter(v => Array.isArray(v) ? v.length > 0 : true);

        if (copy.every(c => !Array.isArray(c))) {
          setShowResults(true)
          return copy;
        }

        const newIndex = copy.findIndex(v => Array.isArray(v));
        setIndex(newIndex);
        const next = shuffle(copy.slice()[newIndex] as Array<GameData>);
        setPivot(next[0]);
        setWorse(next.slice(1, 6));
        setBetter(next.slice(6, 11));
        setRemaining(next.slice(11));
        return copy;
      });
      setSorted([[], []]);
    } else {
      const nextWorse = remaining.slice(0, 5);
      const nextBetter = remaining.slice(5, 10);
      const nextRemaining = remaining.slice(10);
      setWorse(nextWorse);
      setBetter(nextBetter);
      setRemaining(nextRemaining);
    }
  };

  return (
    <div className={styles.outerContainer}>
      <Status
        index={index}
        completed={completed}
      />
      <div className={styles.container}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={"worse"} key={"worse"}>
            {({ droppableProps, innerRef }) => {
              return (
                <div
                  ref={innerRef}
                  {...droppableProps}
                  className={styles.droppable}
                >
                  <div className={styles.title}>Worse</div>
                  {worse.map(draggableMap)}
                </div>
              );
            }}
          </Droppable>
          {pivot ? (
            <div className={styles.pivot}>
              <GameCard game={pivot} />
              <button onClick={nextGroup}>next group</button>
            </div>
          ) : null}
          <Droppable droppableId={"better"} key={"better"}>
            {({ droppableProps, innerRef }) => {
              return (
                <div
                  ref={innerRef}
                  {...droppableProps}
                  className={styles.droppable}
                >
                  <div className={styles.title}>Better</div>
                  {better.map(draggableMap)}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
