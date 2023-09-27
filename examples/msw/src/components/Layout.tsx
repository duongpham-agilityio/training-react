import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Outlet />
    </div>
  );
};

export default Layout;
