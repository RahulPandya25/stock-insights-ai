import { useState } from "react";
import { useDispatch } from "react-redux";

export const useDispatchQueryStatus = (thunkToRun = async () => {}) => {
  const dispatch = useDispatch();
  const [isRunning, setIsRunning] = useState(false);

  const queryRunner = async (param) => {
    setIsRunning(true);
    await dispatch(thunkToRun(param));
    setIsRunning(false);
  };

  return [queryRunner, isRunning];
};
