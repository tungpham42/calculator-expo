// src/components/Calculator.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  appendInput,
  calculateResult,
  changeBase,
  clear,
  deleteLast,
  toggleShift,
} from "../features/calculatorSlice";
import { RootState } from "../store/store";

// Reusable Button Component to keep JSX clean
const CalcButton = ({
  label,
  secondaryLabel,
  onPress,
  styleClass,
  disabled,
}: any) => (
  <View style={styles.buttonContainer}>
    {secondaryLabel ? (
      <Text style={styles.secondaryLabel}>{secondaryLabel}</Text>
    ) : (
      <Text style={styles.secondaryLabel}> </Text>
    )}
    <TouchableOpacity
      style={[styles.casioButton, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.buttonText,
          styleClass === "btnNumber" ? styles.btnNumberText : {},
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  </View>
);

const Calculator: React.FC = () => {
  const { expression, result, shiftMode, base } = useSelector(
    (state: RootState) => state.calculator,
  );
  const dispatch = useDispatch();

  const handleInput = (val: string) => dispatch(appendInput(val));
  const isBin = base === "BIN";
  const isOct = base === "OCT";
  const isDec = base === "DEC";
  const isHex = base === "HEX";

  return (
    <View style={styles.casioBody}>
      {/* Branding */}
      <View style={styles.casioBrandContainer}>
        <Text style={styles.casioBrand}>CASIO</Text>
      </View>

      {/* LCD Screen */}
      <View style={styles.casioScreenContainer}>
        <View style={styles.screenIndicators}>
          <Text style={styles.indicatorText}>
            {shiftMode ? "[S] " : ""}
            <Text style={{ color: "#555" }}>{base}</Text>
          </Text>
        </View>
        <Text style={styles.expressionText} numberOfLines={2}>
          {expression || "0"}
        </Text>
        <Text style={styles.resultText} numberOfLines={1}>
          {result}
        </Text>
      </View>

      {/* Top Controls */}
      <View style={styles.row}>
        <CalcButton
          label="SHIFT"
          onPress={() => dispatch(toggleShift())}
          styleClass="btnShift"
        />
        <View style={{ flex: 3 }} /> {/* Spacer */}
      </View>

      {/* Base Modes Area */}
      <View style={styles.row}>
        <CalcButton
          label="HEX"
          onPress={() => dispatch(changeBase("HEX"))}
          styleClass={isHex ? "btnExe" : "btnNav"}
        />
        <CalcButton
          label="DEC"
          onPress={() => dispatch(changeBase("DEC"))}
          styleClass={isDec ? "btnExe" : "btnNav"}
        />
        <CalcButton
          label="OCT"
          onPress={() => dispatch(changeBase("OCT"))}
          styleClass={isOct ? "btnExe" : "btnNav"}
        />
        <CalcButton
          label="BIN"
          onPress={() => dispatch(changeBase("BIN"))}
          styleClass={isBin ? "btnExe" : "btnNav"}
        />
      </View>

      {/* Dynamic Math Functions Area */}
      {isDec ? (
        <View>
          <View style={styles.row}>
            <CalcButton
              label={shiftMode ? "x!" : "x²"}
              secondaryLabel={shiftMode ? "x!" : "x²"}
              onPress={() => handleInput(shiftMode ? "!" : "^2")}
              styleClass="btnMath"
            />
            <CalcButton
              label={shiftMode ? "³√" : "√"}
              secondaryLabel={shiftMode ? "³√" : "√"}
              onPress={() => handleInput(shiftMode ? "cbrt(" : "sqrt(")}
              styleClass="btnMath"
            />
            <CalcButton
              label={shiftMode ? "10^" : "log"}
              secondaryLabel={shiftMode ? "10^x" : "log"}
              onPress={() => handleInput(shiftMode ? "10^" : "log(")}
              styleClass="btnMath"
            />
            <CalcButton
              label={shiftMode ? "e^" : "ln"}
              secondaryLabel={shiftMode ? "e^x" : "ln"}
              onPress={() => handleInput(shiftMode ? "e^" : "ln(")}
              styleClass="btnMath"
            />
          </View>
          <View style={styles.row}>
            <CalcButton
              label={shiftMode ? "sin⁻¹" : "sin"}
              secondaryLabel={shiftMode ? "sin⁻¹" : "sin"}
              onPress={() => handleInput(shiftMode ? "asin(" : "sin(")}
              styleClass="btnMath"
            />
            <CalcButton
              label={shiftMode ? "cos⁻¹" : "cos"}
              secondaryLabel={shiftMode ? "cos⁻¹" : "cos"}
              onPress={() => handleInput(shiftMode ? "acos(" : "cos(")}
              styleClass="btnMath"
            />
            <CalcButton
              label={shiftMode ? "tan⁻¹" : "tan"}
              secondaryLabel={shiftMode ? "tan⁻¹" : "tan"}
              onPress={() => handleInput(shiftMode ? "atan(" : "tan(")}
              styleClass="btnMath"
            />
            <CalcButton
              label={shiftMode ? "e" : "π"}
              secondaryLabel={shiftMode ? "e" : "π"}
              onPress={() => handleInput(shiftMode ? "e" : "pi")}
              styleClass="btnMath"
            />
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.row}>
            <CalcButton
              label="A"
              onPress={() => handleInput("A")}
              disabled={!isHex}
              styleClass="btnMath"
            />
            <CalcButton
              label="B"
              onPress={() => handleInput("B")}
              disabled={!isHex}
              styleClass="btnMath"
            />
            <CalcButton
              label="C"
              onPress={() => handleInput("C")}
              disabled={!isHex}
              styleClass="btnMath"
            />
            <CalcButton
              label="D"
              onPress={() => handleInput("D")}
              disabled={!isHex}
              styleClass="btnMath"
            />
          </View>
          <View style={styles.row}>
            <CalcButton
              label="E"
              onPress={() => handleInput("E")}
              disabled={!isHex}
              styleClass="btnMath"
            />
            <CalcButton
              label="F"
              onPress={() => handleInput("F")}
              disabled={!isHex}
              styleClass="btnMath"
            />
            <CalcButton
              label="AND"
              onPress={() => handleInput("&")}
              styleClass="btnMath"
            />
            <CalcButton
              label="OR"
              onPress={() => handleInput("|")}
              styleClass="btnMath"
            />
          </View>
        </View>
      )}

      {/* Smart Numpad Area */}
      <View style={styles.row}>
        <CalcButton
          label="7"
          onPress={() => handleInput("7")}
          disabled={isBin}
          styleClass="btnNumber"
        />
        <CalcButton
          label="8"
          onPress={() => handleInput("8")}
          disabled={isBin || isOct}
          styleClass="btnNumber"
        />
        <CalcButton
          label="9"
          onPress={() => handleInput("9")}
          disabled={isBin || isOct}
          styleClass="btnNumber"
        />
        <CalcButton
          label="DEL"
          onPress={() => dispatch(deleteLast())}
          styleClass="btnDelAc"
        />
      </View>
      <View style={styles.row}>
        <CalcButton
          label="4"
          onPress={() => handleInput("4")}
          disabled={isBin}
          styleClass="btnNumber"
        />
        <CalcButton
          label="5"
          onPress={() => handleInput("5")}
          disabled={isBin}
          styleClass="btnNumber"
        />
        <CalcButton
          label="6"
          onPress={() => handleInput("6")}
          disabled={isBin}
          styleClass="btnNumber"
        />
        <CalcButton
          label="AC"
          onPress={() => dispatch(clear())}
          styleClass="btnDelAc"
        />
      </View>
      <View style={styles.row}>
        <CalcButton
          label="1"
          onPress={() => handleInput("1")}
          styleClass="btnNumber"
        />
        <CalcButton
          label="2"
          onPress={() => handleInput("2")}
          disabled={isBin}
          styleClass="btnNumber"
        />
        <CalcButton
          label="3"
          onPress={() => handleInput("3")}
          disabled={isBin}
          styleClass="btnNumber"
        />
        <CalcButton
          label="×"
          onPress={() => handleInput("*")}
          styleClass="btnMath"
        />
      </View>
      <View style={styles.row}>
        <CalcButton
          label="0"
          onPress={() => handleInput("0")}
          styleClass="btnNumber"
        />
        <CalcButton
          label="."
          onPress={() => handleInput(".")}
          disabled={!isDec}
          styleClass="btnNumber"
        />
        <CalcButton
          label="Ans"
          onPress={() => handleInput("Ans")}
          styleClass="btnNumber"
        />
        <CalcButton
          label="÷"
          onPress={() => handleInput("/")}
          styleClass="btnMath"
        />
      </View>
      <View style={styles.row}>
        <CalcButton
          label="("
          onPress={() => handleInput("(")}
          styleClass="btnMath"
        />
        <CalcButton
          label=")"
          onPress={() => handleInput(")")}
          styleClass="btnMath"
        />
        <CalcButton
          label="-"
          onPress={() => handleInput("-")}
          styleClass="btnMath"
        />
        <CalcButton
          label="+"
          onPress={() => handleInput("+")}
          styleClass="btnMath"
        />
      </View>
      <View style={styles.row}>
        <View style={{ flex: 3 }} />
        <CalcButton
          label="EXE"
          onPress={() => dispatch(calculateResult())}
          styleClass="btnExe"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  casioBody: {
    backgroundColor: "#2b2d30",
    borderRadius: 20,
    padding: 20,
    width: 380,
    elevation: 10, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  casioBrandContainer: {
    marginBottom: 10,
  },
  casioBrand: {
    color: "#fff",
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 16,
  },
  casioScreenContainer: {
    backgroundColor: "#9cb4b8",
    borderRadius: 8,
    padding: 10,
    marginBottom: 25,
    minHeight: 120,
    justifyContent: "space-between",
    borderWidth: 3,
    borderColor: "#1a1a1a",
  },
  screenIndicators: {
    minHeight: 18,
  },
  indicatorText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  expressionText: {
    color: "#111",
    fontSize: 20,
    fontFamily: "monospace",
  },
  resultText: {
    color: "#000",
    fontSize: 32,
    textAlign: "right",
    fontFamily: "monospace",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  buttonContainer: {
    width: "23%", // Leaves a tiny gap between 4 items
    alignItems: "center",
  },
  secondaryLabel: {
    color: "#d6a848",
    fontSize: 10,
    marginBottom: 2,
  },
  casioButton: {
    borderRadius: 6,
    aspectRatio: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
  },
  btnNumberText: {
    color: "#000",
  },
  disabledButton: {
    opacity: 0.3,
  },
  btnShift: { backgroundColor: "#444" },
  btnNav: { backgroundColor: "#333" },
  btnMath: { backgroundColor: "#1e1e1e" },
  btnNumber: { backgroundColor: "#f0f0f0" },
  btnDelAc: { backgroundColor: "#d65c5c" },
  btnExe: { backgroundColor: "#1a2b4c" },
});

export default Calculator;
