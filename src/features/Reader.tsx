import type { FC } from "react";
import { useEffect, useState, useId } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { useModel } from "umi";
import { uniq } from "lodash";
import { Divider, Slider, Spin } from "antd";
import { getWord } from "@/services";
import { parseLevel } from "@/lib";

interface ReaderProps {
  content: string;
}

const marks = {
  0: "Don't translate",
  25: "Advanced",
  50: "Intermediate",
  75: "Beginner",
  100: "Everything",
};

const Reader: FC<ReaderProps> = ({ content }) => {
  const id = useId();
  const { dict, setDict } = useModel("dict");
  const { level, setLevel } = useModel("level");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (content?.length) {
      setLoading(true);
      const words: Record<string, Word> = {};
      const wordlist = content
        .split(/[ \n]+/g)
        .map((e) => e.replace(/[^A-z]/g, ""))
        .filter((e) => e.length > 3)
        .map((e) => e.toLocaleLowerCase());
      const uniqList = uniq(wordlist);
      const reqList = uniqList.map((e) => getWord(e));
      Promise.allSettled(reqList).then((e) => {
        uniqList.forEach((word, i) => {
          if (e[i].status === "fulfilled") {
            words[word] = (e[i] as PromiseFulfilledResult<Word>)?.value;
          }
        });
        setDict(words);
        setLoading(false);
      });
    }
  }, [content]);

  return (
    <Spin spinning={loading}>
      <Slider
        marks={marks}
        step={null}
        value={level}
        onChange={(value) => {
          setLevel(value);
        }}
      />
      <Divider />
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        remarkPlugins={[remarkGfm, remarkMath]}
        transformImageUri={(uri) => {
          // TODO:
          return uri;
        }}
        components={{
          p({ node, className, children, ...props }) {
            let wordlist: string[] = [];
            if (Array.isArray(children)) {
              wordlist = (children?.[0] as string)
                ?.split(/ +/g)
                ?.map((e) => e.replace(/[^A-z]/g, ""));
            }
            return (
              <p {...props}>
                {wordlist?.length
                  ? wordlist.map((e, i) => {
                      const match = dict[e.toLocaleLowerCase()];
                      const willTranslate =
                        match?.level && match.level > parseLevel(level);

                      return (
                        <span key={`${id}-${e}-${i}`}>
                          <>
                            {e}
                            {willTranslate ? `(${match?.level})` : ""}{" "}
                          </>
                        </span>
                      );
                    })
                  : children}
              </p>
            );
          },
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={undefined as any}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                className={className ? `${className} blockquote` : "blockquote"}
                {...props}
              >
                {children}
              </code>
            );
          },
          a({ className, children, ...props }) {
            return (
              <a
                className={className ? `${className} blue` : "blue"}
                {...props}
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          },
          table({ children, ...props }) {
            return (
              <table
                className="table is-striped is-hoverable is-fullwidth"
                {...props}
              >
                {children}
              </table>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </Spin>
  );
};

export default Reader;
