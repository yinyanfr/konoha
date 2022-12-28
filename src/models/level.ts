import { useLocalStorageState } from "ahooks";

export default function () {
  const [level, setLevel] = useLocalStorageState("preference-level", {
    defaultValue: 4,
  });

  return { level, setLevel };
}
