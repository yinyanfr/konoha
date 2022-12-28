import { WordTags, WordVariations } from "@/components";
import { Divider, List, Rate, Space, Typography } from "antd";
import { FC, useId } from "react";
import { useIntl } from "umi";

interface DictionaryProps {
  dict?: Dict;
}

const { Title } = Typography;

const Dictionary: FC<DictionaryProps> = ({ dict }) => {
  const id = useId();
  const intl = useIntl();

  return (
    <article>
      <Title level={3}>{dict?.word}</Title>
      {dict?.phonetic ? <p>/{dict.phonetic}/</p> : null}

      {dict?.collins ? (
        <div>
          <Rate disabled value={parseInt(dict.collins)} />
        </div>
      ) : null}

      <p>{dict?.definition?.split(/\\n/g)?.join("; ")}</p>
      <p>{dict?.translation?.split(/\\n/g)?.join("; ")}</p>

      <WordTags tag={dict?.tag} oxford={dict?.oxford} />

      <Divider />

      {dict?.bnc ? (
        <p>
          {intl.formatMessage({ id: "dict.bnc" })}: {dict.bnc}
        </p>
      ) : null}

      {dict?.frq ? (
        <p>
          {intl.formatMessage({ id: "dict.frq" })}: {dict.frq}
        </p>
      ) : null}

      <Divider />

      <WordVariations exchange={dict?.exchange} />

      <Divider />

      {dict?.resemble ? (
        <div>
          <Title level={4}>{intl.formatMessage({ id: "dict.resemble" })}</Title>
          <p>{dict.resemble.description}</p>
          <List
            size="small"
            itemLayout="horizontal"
            dataSource={dict.resemble?.dict}
            renderItem={(item) => (
              <List.Item key={`${id}-${dict?.word}-${item?.word}`}>
                <List.Item.Meta
                  title={item?.word}
                  description={item?.definition}
                />
              </List.Item>
            )}
          />
        </div>
      ) : null}

      <Divider />

      {dict?.root ? (
        <div>
          <Title level={4}>{intl.formatMessage({ id: "dict.root" })}</Title>
          {["meaning", "class", "function", "origin"].map((e) => (
            <p key={`${id}-root-${e}`}>
              {intl.formatMessage({ id: `dict.root.${e}` })}:{" "}
              {dict.root?.[e as keyof typeof dict.root]}
            </p>
          ))}

          {dict.root.example?.length ? (
            <>
              <Space wrap>
                <p>{intl.formatMessage({ id: "dict.root.examples" })}: </p>
                {dict.root.example.map((e) => (
                  <p key={`${id}-root-example-${e}`}>{e}</p>
                ))}
              </Space>
            </>
          ) : null}
        </div>
      ) : null}
    </article>
  );
};

export default Dictionary;
