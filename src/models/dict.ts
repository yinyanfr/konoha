import { useState } from "react";

export default function () {
  const [dict, setDict] = useState<Record<string, Word>>({});

  return {
    dict,
    setDict,
  };
}
