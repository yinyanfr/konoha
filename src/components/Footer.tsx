import type { FC } from "react";
import styles from "./index.less";
import { GithubOutlined } from "@ant-design/icons";

const Footer: FC = () => {
  return (
    <footer className={styles["app-footer"]}>
      <p>
        Konoha |{" "}
        <a href="https://github.com/yinyanfr/konoha">
          <GithubOutlined /> Github
        </a>
      </p>
    </footer>
  );
};

export default Footer;
