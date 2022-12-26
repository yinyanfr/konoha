import type { FC } from "react";
import MDEditor from "@uiw/react-md-editor";
import styles from "./index.less";

interface EditorProps {
  value: string;
  onChange: (value?: string) => void;
}

const Editor: FC<EditorProps> = ({ value, onChange }) => {
  return (
    <div className={styles.mdcontainer}>
      <MDEditor preview="edit" value={value} onChange={onChange} />
    </div>
  );
};

export default Editor;
