import { LOCAL_KEY, PROGRESS_KEY, SAVED_KEY } from "@/constants";
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
import { useRouter } from "next/router";

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
  const [enabled, setEnabled] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    if (typeof window !== "undefined") {
      const data = localStorage.getItem(LOCAL_KEY);
      const saved = localStorage.getItem(SAVED_KEY);
      let finished = false;
      let shuffled: Array<GameData> = [];
      if (saved) {
        let parsed: Array<GameData | Array<GameData>> = JSON.parse(saved);
        setCompleted(parsed);

        const nextIndex = parsed.findIndex((p) => Array.isArray(p));
        if (nextIndex > -1) {
          setIndex(nextIndex);
          shuffled = shuffle(parsed[nextIndex] as Array<GameData>);
        } else {
          finished = true;
        }
      } else if (data) {
        const parsed: Array<GameData> = JSON.parse(data).map((v: GameData) => {
          v.name = cleanString(v.name);
          return v;
        });
        setCompleted([shuffled]);
        shuffled = shuffle(parsed);
      }
      if (finished) {
        router.push("results");
      } else {
        const progress = localStorage.getItem(PROGRESS_KEY);
        if (progress) {
          const { index, better, worse, pivot, sorted, remaining } = JSON.parse(progress);
          setIndex(index);
          setBetter(better);
          setWorse(worse);
          setPivot(pivot);
          setSorted(sorted);
          setRemaining(remaining);
        } else {
          setPivot(shuffled[0]);
          if (shuffled.length < 11) {
            const cutoff = Math.ceil((shuffled.length - 1) / 2) + 1;
            setWorse(shuffled.slice(1, cutoff));
            setBetter(shuffled.slice(cutoff));
          } else {
            setWorse(shuffled.slice(1, 6));
            setBetter(shuffled.slice(6, 11));
            setRemaining(shuffled.slice(11));
          }
        }
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
      const progress = {
        pivot,
        index,
        better,
        worse,
        sorted: copy,
        remaining,
      };
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
      return copy;
    });
    if (remaining.length === 0) {
      // NEXT PIVOT
      // Replace completed[index] with [sorted[0], pivot, sorted[1]]
      setCompleted((curr) => {
        let copy = curr.slice();
        copy.splice(index, 1, sorted[0], pivot!, sorted[1]);
        copy = copy
          .map((v) => {
            if (Array.isArray(v) && v.length === 1) {
              return v[0];
            } else {
              return v;
            }
          })
          .filter((v) => (Array.isArray(v) ? v.length > 0 : true));

        if (typeof window !== "undefined") {
          localStorage.setItem(SAVED_KEY, JSON.stringify(copy));
        }

        if (copy.every((c) => !Array.isArray(c))) {
          router.push("results");
          return copy;
        }

        const newIndex = copy.findIndex((v) => Array.isArray(v));
        setIndex(newIndex);
        const next = shuffle(copy.slice()[newIndex] as Array<GameData>);
        setPivot(next[0]);
        if (next.length < 11) {
          const cutoff = Math.ceil((next.length - 1) / 2) + 1;
          setWorse(next.slice(1, cutoff));
          setBetter(next.slice(cutoff));
          setRemaining([]);
        } else {
          setWorse(next.slice(1, 6));
          setBetter(next.slice(6, 11));
          setRemaining(next.slice(11));
        }
        return copy;
      });
      setSorted([[], []]);
    } else {
      if (remaining.length < 11) {
        const cutoff = Math.ceil((remaining.length - 1) / 2);
        setWorse(remaining.slice(0, cutoff));
        setBetter(remaining.slice(cutoff));
        setRemaining([]);
      } else {
        setWorse(remaining.slice(0, 5));
        setBetter(remaining.slice(5, 10));
        setRemaining(remaining.slice(10));
      }
    }
  };

  const rLen = worse.length + better.length + remaining.length;

  return (
    <div className={styles.outerContainer}>
      <div className={styles.reset} onClick={() => {
        localStorage.removeItem(PROGRESS_KEY);
        router.push("rate");
      }}>reset progress</div>
      <Status index={index} sorted={sorted} completed={completed} rLen={rLen} />
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
