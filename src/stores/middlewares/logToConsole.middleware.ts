import { StateCreator, StoreMutatorIdentifier } from 'zustand'

type Logger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string,
) => StateCreator<T, Mps, Mcs>

type LoggerImpl = <T>(
  f: StateCreator<T, [], []>,
  name?: string,
) => StateCreator<T, [], []>

const logToConsoleImpl: LoggerImpl = (f, name) => (set, get, store) => {
  const setState = store.setState
  const setFunctionWithLogger: typeof set = (...a) => {
    set(...a)
    console.debug(...(name ? [`${name}:`] : []), get())
  }
  const setStateFunctionWithLogger: typeof store.setState = (...a) => {
    setState(...a)
    console.debug(...(name ? [`${name}:`] : []), store.getState())
  }

  store.setState = setStateFunctionWithLogger;

  return f(setFunctionWithLogger, get, store)
}

export const logger = logToConsoleImpl as unknown as Logger
