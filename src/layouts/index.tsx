import { Link, Outlet } from "umi";
import styles from "./index.less";
import { Footer, SetLang } from "@/components";
import Darkreader from "react-darkreader";

export default function Layout() {
  return (
    <div>
      <nav className={styles.navs}>
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
            <Darkreader />
          </li>
          <li>
            <SetLang />
          </li>
        </ul>
      </nav>

      <Outlet />

      <Footer />
    </div>
  );
}
