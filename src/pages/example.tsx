import { Editor, Reader } from "@/features";
import {
  ProForm,
  ProFormField,
  ProFormDependency,
} from "@ant-design/pro-components";
import type { FC } from "react";
import { useState, useRef } from "react";
import type { ProFormInstance } from "@ant-design/pro-components";
import { Divider, Typography } from "antd";

const defaultArticle = `Paris shooting suspect to appear in court

A French pensioner suspected of fatally shooting three Kurds in Paris was due Monday before a judge who will decide on whether to charge him in the case that sparked angry protests.

The 69-year-old has confessed to a “pathological” hatred for foreigners and spent nearly a day in a psychiatric facility before being returned to police custody on Sunday, authorities said.

The shooting at a Kurdish cultural centre and a nearby hairdressing salon on Friday sparked panic in the city’s bustling 10th district, home to numerous shops and restaurants and a large Kurdish population.

Three others were wounded in the attack but none were in a life-threatening condition, with one out of hospital.

The violence has revived the trauma of three unresolved murders of Kurds in 2013 that many blame on Turkey.

Many in the Kurdish community have expressed anger at the French security services, saying they had done too little to prevent the shooting.

The frustration boiled over on Saturday and furious demonstrators clashed with police in central Paris for a second day running after a tribute rally.

History of violence

The suspect – named as William M. by French media – is a gun enthusiast with a history of weapons offences who had been released on bail earlier this month.

The retired train driver was convicted for armed violence in 2016 by a court in Seine-Saint-Denis, but appealed.

A year later he was convicted for illegally possessing a firearm.

The suspect said he initially wanted to kill people in the northern Paris suburb of Seine-Saint-Denis, which has a large immigrant population.

But he changed his mind as few people were around and his clothing made it difficult for him to reload his weapon, the prosecutor said of the Friday shooting.

He then returned to his parents’ house before deciding to go to the 10th district instead.

Last year, he was charged with racist violence after allegedly stabbing migrants and slashing their tents with a sword in a park in eastern Paris.

The prosecutor said no links with an extremist ideology were found following a search of his parents’ home, a computer and a smartphone.

The suspect said he acquired his weapon four years ago from a member of a shooting club, hid it at his parents’ house and had never used it before.

Often described as the world’s largest people without a state, the Kurds are a Muslim ethnic group spread across Syria, Turkey, Iraq and Iran.
`;

const Example: FC = () => {
  const [content, setContent] = useState("");
  const formRef = useRef<ProFormInstance>();

  return (
    <main>
      <Typography.Title level={2}>Example</Typography.Title>
      <div>
        <ProForm
          formRef={formRef}
          initialValues={{ article: defaultArticle }}
          onFinish={async (values) => {
            setContent(values.article);
          }}
        >
          <ProFormDependency name={["article"]}>
            {({ article }) => (
              <ProForm.Group>
                <ProFormField
                  name="article"
                  label="Enter your article here (temporarily read only due to WIP)"
                  width="lg"
                  renderFormItem={() => (
                    <Editor
                      value={article}
                      onChange={(value) => {
                        formRef.current?.setFieldsValue({ article: value });
                      }}
                    />
                  )}
                />
              </ProForm.Group>
            )}
          </ProFormDependency>
        </ProForm>
      </div>

      <Divider />

      <div>
        <Reader content={content} />
      </div>
    </main>
  );
};

export default Example;
