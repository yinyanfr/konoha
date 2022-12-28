import type { FC } from "react";

interface ShortTranslationProps {
  translation?: string;
}

const ShortTranslation: FC<ShortTranslationProps> = ({ translation }) => {
  return <span>【{translation?.split(/\\n/g)?.join(", ")}】</span>;
};

export default ShortTranslation;
