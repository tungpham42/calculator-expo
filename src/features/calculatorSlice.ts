// src/features/calculatorSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { evaluate } from "mathjs";

export type BaseType = "DEC" | "HEX" | "BIN" | "OCT";

interface CalculatorState {
  expression: string;
  result: string;
  shiftMode: boolean;
  ans: string;
  base: BaseType;
}

const initialState: CalculatorState = {
  expression: "",
  result: "0",
  shiftMode: false,
  ans: "0",
  base: "DEC",
};

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    appendInput: (state, action: PayloadAction<string>) => {
      state.expression += action.payload;
      state.shiftMode = false;
    },
    clear: (state) => {
      state.expression = "";
      state.result = "0";
      state.shiftMode = false;
    },
    deleteLast: (state) => {
      state.expression = state.expression.slice(0, -1);
    },
    toggleShift: (state) => {
      state.shiftMode = !state.shiftMode;
    },
    changeBase: (state, action: PayloadAction<BaseType>) => {
      const newBase = action.payload;
      if (state.base === newBase) return;

      try {
        // Parse the current result string back to a decimal integer safely
        let decValue = 0;
        if (state.base === "HEX") decValue = parseInt(state.result, 16);
        else if (state.base === "BIN") decValue = parseInt(state.result, 2);
        else if (state.base === "OCT") decValue = parseInt(state.result, 8);
        else decValue = parseInt(state.result, 10);

        if (isNaN(decValue)) decValue = 0;

        // Convert the decimal integer to the newly requested base
        let newStr = "";
        if (newBase === "DEC") newStr = decValue.toString(10);
        else if (newBase === "HEX")
          newStr = (decValue >>> 0).toString(16).toUpperCase();
        else if (newBase === "BIN") newStr = (decValue >>> 0).toString(2);
        else if (newBase === "OCT") newStr = (decValue >>> 0).toString(8);

        state.base = newBase;
        state.result = newStr;
        state.expression = newStr; // Override expression so user can compute from here
      } catch (e) {
        state.result = "Error";
      }
    },
    calculateResult: (state) => {
      try {
        if (!state.expression) return;

        let parsedExpression = state.expression.replace(
          /Ans/g,
          `(${state.ans})`,
        );

        // Prefix Base-N numbers so mathjs understands them (e.g., A becomes 0xA)
        if (state.base === "HEX") {
          parsedExpression = parsedExpression.replace(
            /\b[0-9A-F]+\b/g,
            (m) => `0x${m}`,
          );
        } else if (state.base === "BIN") {
          parsedExpression = parsedExpression.replace(
            /\b[01]+\b/g,
            (m) => `0b${m}`,
          );
        } else if (state.base === "OCT") {
          parsedExpression = parsedExpression.replace(
            /\b[0-7]+\b/g,
            (m) => `0o${m}`,
          );
        }

        const evaluated = evaluate(parsedExpression);
        let formattedResult = "";

        if (state.base !== "DEC") {
          // Bitwise and Base operations only apply to integers
          const intVal = Math.trunc(Number(evaluated));

          // (>>> 0) safely converts negative numbers into 32-bit unsigned Two's Complement
          if (state.base === "HEX")
            formattedResult = (intVal >>> 0).toString(16).toUpperCase();
          else if (state.base === "BIN")
            formattedResult = (intVal >>> 0).toString(2);
          else if (state.base === "OCT")
            formattedResult = (intVal >>> 0).toString(8);
        } else {
          formattedResult = Number.isInteger(evaluated)
            ? String(evaluated)
            : Number(evaluated)
                .toFixed(8)
                .replace(/\.?0+$/, "");
        }

        state.result = formattedResult;
        state.expression = formattedResult;
        state.ans = formattedResult;
        state.shiftMode = false;
      } catch (error) {
        state.result = "Syntax ERROR";
      }
    },
  },
});

export const {
  appendInput,
  clear,
  deleteLast,
  toggleShift,
  changeBase,
  calculateResult,
} = calculatorSlice.actions;
export default calculatorSlice.reducer;
