import { useState } from "react";

export default function () {
  const [level, setLevel] = useState<number>(0);

  return { level, setLevel };
}
