import { ReduxAction } from "../interfaces";
import { Sequence } from "../sequences/interfaces";
import { Color } from "../../interfaces.ts";

/** Used by UI widgets that modify a regimen */
export interface RegimenProps {
  regimen?: Regimen;
  dispatch: Function;
};


/** A list of "sequences" scheduled after a starting point (epoch). */
export interface Regimen {
    _id?: string;
    /** Friendly identifier for humans to easily identify regimens. */
    name: string;
    color: Color;
    items: RegimenItem[];
    dirty?: boolean;
};

/** Individual step that a regimen will execute at a point in time. */
export interface RegimenItem {
    sequence: Sequence;
    /** Time (in milliseconds) to wait before executing the sequence */
    timeOffset: number;
};

/** How Regimen state is stored in the application. Used by Regimen reducer mostly */
export interface RegimensState {
    current: number;
    all: Regimen[];
}

/** Used by regimen reducer to route incoming stream of Redux actions */
export interface RegimensActionHandler {
    [actionName: string]: (state: RegimensState,
        action: ReduxAction<any>) => RegimensState;
}
