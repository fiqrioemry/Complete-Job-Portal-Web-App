import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default Layout;
