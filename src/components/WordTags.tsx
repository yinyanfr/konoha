import { Tag } from "antd";
import { FC, useId } from "react";
import { useIntl } from "umi";

const colors = {
  zk: "green",
  gk: "geekblue",
  cet: "gold",
};

interface WordTagsProps {
  tag?: string;
  oxford?: string | boolean;
}

const WordTags: FC<WordTagsProps> = ({ tag, oxford }) => {
  const id = useId();
  const intl = useIntl();
  const tags = tag?.split(/ +/g);

  return (
    <div>
      {tags?.map((e) => {
        if (Object.keys(colors).includes(e)) {
          return (
            <Tag
              key={`${id}-tags-${e}`}
              color={colors[e as keyof typeof colors]}
            >
              {intl.formatMessage({ id: `dict.tag.${e}` })}
            </Tag>
          );
        }
        return null;
      })}

      {oxford ? (
        <Tag key={`${id}-tags-oxford`} color="magenta">
          {intl.formatMessage({ id: "dict.oxford" })}
        </Tag>
      ) : null}
    </div>
  );
};

export default WordTags;
