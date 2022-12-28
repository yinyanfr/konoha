import type { FC } from "react";

interface WordVariationsProps {
  exchange?: string;
}

const WordVariations: FC<WordVariationsProps> = ({ exchange }) => {
  return <p>{exchange}</p>;
};

export default WordVariations;
