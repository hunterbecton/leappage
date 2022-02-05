export const Container = ({ size, customClassName, children, ...other }) => {
  switch (size) {
    case "bottom-0":
      return (
        <div className={`px-4 pt-12 pb-0 ${customClassName}`} {...other}>
          {children}
        </div>
      );
    case "top-0":
      return (
        <div className={`px-4 pt-0 pb-12 ${customClassName}`} {...other}>
          {children}
        </div>
      );
    case "0":
      return (
        <div className={`px-4 py-0 ${customClassName}`} {...other}>
          {children}
        </div>
      );
    case "xs":
      return (
        <div className={`px-4 py-4 ${customClassName}`} {...other}>
          {children}
        </div>
      );
    case "sm":
      return (
        <div className={`px-4 py-6 ${customClassName}`} {...other}>
          {children}
        </div>
      );
    case "md":
      return (
        <div className={`px-4 py-8 ${customClassName}`} {...other}>
          {children}
        </div>
      );
    case "lg":
      return (
        <div className={`px-4 py-12 ${customClassName}`} {...other}>
          {children}
        </div>
      );
    default:
      return (
        <div className={`px-4 py-12 ${customClassName}`} {...other}>
          {children}
        </div>
      );
  }
};

Container.defaultProps = {
  size: "",
  customClassName: "bg-white",
};
