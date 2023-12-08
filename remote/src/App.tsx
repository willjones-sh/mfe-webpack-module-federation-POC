import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageA from "./pages/PageA";
import PageB from "./pages/PageB";
import styles from "./App.module.scss";
import NotFound from "./pages/NotFound";

const App = () => (
  <div className={styles.app}>
    <h2>This the root in Remote</h2>
    <nav className={styles.horizontal_nav}>
      <Link to="page-a">Remote/Page A</Link>
      <Link to="page-b">Remote/Page B</Link>
    </nav>
    <Routes>
      <Route index element={<Home />} />
      <Route path="page-a" element={<PageA />} />
      <Route path="page-b" element={<PageB />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
);

export default App;
