export const useCallOne = (fn: Function) => {
  let called = false;
  return () => {
    if (!called) {
      called = true;
      fn();
    }
  }
}