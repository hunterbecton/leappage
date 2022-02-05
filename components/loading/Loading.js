import { Nav } from "components/nav";

export const Loading = ({ withNav, height, customClassName }) => {
  return (
    <>
      {withNav && <Nav />}
      <div
        style={{ height: withNav ? "calc(100vh - 4rem)" : height }}
        className={`flex w-full items-center justify-center ${customClassName}`}
      >
        <img src="/loading/circles.svg" className="h-10 w-10" alt="Loading" />
      </div>
    </>
  );
};

Loading.defaultProps = {
  withNav: true,
  height: "100vh",
  customClassName: "",
};
