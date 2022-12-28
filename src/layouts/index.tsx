import { Link, Outlet } from "umi";
import styles from "./index.less";
import { GithubOutlined } from "@ant-design/icons";
import { Footer } from "@/components";

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        <li>Konoha</li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/example">Example</Link>
        </li>
        <li>
          <Link to="/dict">Dictionary</Link>
        </li>
        <li>
          <a href="https://github.com/yinyanfr/konoha">
            <GithubOutlined /> Github
          </a>
        </li>
      </ul>
      <Outlet />

      <Footer />
    </div>
  );
}
