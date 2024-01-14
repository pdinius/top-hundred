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
import { GameCard } from "@/components/GameCard";
import { Status } from "@/components/Status";
import { useRouter } from "next/router";
import useQuickSort from "@/useQuickSort";

const isClient = typeof window !== "undefined";

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
  const [enabled, setEnabled] = useState(false);
  const { pivot, resetItems, sort, getStatus, columns, swap } =
    useQuickSort<GameData>(LOCAL_KEY);

  const router = useRouter();

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

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
    const sourceId = source.droppableId === "worse" ? 0 : 1;
    const destinId = destination.droppableId === "worse" ? 0 : 1;
    swap(sourceId, destinId, source.index, destination.index);
  };

  const [A, B] = columns;

  return (
    <div className={styles.outerContainer}>
      <div className={styles.reset} onClick={resetItems}>
        reset progress
      </div>
      <Status {...getStatus()} />
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
                  {A.map(draggableMap)}
                </div>
              );
            }}
          </Droppable>
          {pivot ? (
            <div className={styles.pivot}>
              <GameCard game={pivot} />
              <button onClick={sort}>next group</button>
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
                  {B.map(draggableMap)}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
