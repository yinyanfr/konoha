import { Descriptions } from "antd";
import { FC, useId } from "react";
import { useMemo } from "react";
import { useIntl } from "umi";

interface WordVariationsProps {
  exchange?: string;
}

function parseVariations(exchange: string) {
  const variations: { value: string; label: string }[] = [];
  const splitted = exchange.split("/");
  splitted.forEach((e) => {
    const [value, label] = e.split(":");
    variations.push({ value, label });
  });
  return variations;
}

const WordVariations: FC<WordVariationsProps> = ({ exchange }) => {
  const id = useId();
  const intl = useIntl();

  if (exchange) {
    const variations = useMemo(() => parseVariations(exchange), [exchange]);
    return (
      <Descriptions title={intl.formatMessage({ id: "dict.exchange" })}>
        {variations?.map((e) => (
          <Descriptions.Item
            key={`${id}-exchange-${e?.value}`}
            label={intl.formatMessage({ id: `dict.exchange.${e?.value}` })}
          >
            {e?.label}
          </Descriptions.Item>
        ))}
      </Descriptions>
    );
  }
  return null;
};

export default WordVariations;
