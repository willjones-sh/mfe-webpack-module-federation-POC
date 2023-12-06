import { Suspense, lazy } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageA from "./pages/PageA";
import PageB from "./pages/PageB";
import NotFound from "./pages/NotFound";
import styles from "./App.module.scss";

const RemoteApp = lazy(() => import("remote/RemoteApp"));

const App = () => (
	<div className={styles.app}>
		<h1>Micro-Frontend Demo</h1>
		<h2>This the root in Host</h2>
		<nav className={styles.horizontal_nav}>
			<Link to="/page-a">Host/Page A</Link>
			<Link to="/page-b">Host/Page B</Link>
			<Link to="/remote">Remote</Link>
		</nav>
		<Suspense fallback="Loading">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/page-a" element={<PageA />} />
				<Route path="/page-b" element={<PageB />} />
				<Route path="/remote/*" element={<RemoteApp />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	</div>
);

export default App;
