import { Dictionary } from "@/features";
import { requestWord } from "@/services";
import { useRequest } from "ahooks";
import { Divider, Empty, Input, Spin, Typography, message } from "antd";
import type { FC } from "react";
import { useEffect } from "react";

const Dict: FC = () => {
  const { data, run, loading, error } = useRequest(requestWord, {
    manual: true,
  });

  useEffect(() => {
    if (error) {
      message.error("Something went wrong.");
    }
  }, [error]);

  return (
    <main>
      <Typography.Title level={2}>Dictionary</Typography.Title>
      <div>
        <Input.Search
          size="large"
          placeholder="Search for a word"
          allowClear
          enterButton="Search"
          onSearch={(value) => {
            run(value);
          }}
        />
      </div>

      <Divider />

      <section>
        <Spin spinning={loading}>
          {data ? <Dictionary dict={data.data} /> : <Empty />}
        </Spin>
      </section>
    </main>
  );
};

export default Dict;
