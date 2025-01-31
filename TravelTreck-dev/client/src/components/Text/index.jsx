import PropTypes from "prop-types";

const sizes = {
  textxs: "text-[12px] font-normal not-italic",
  texts: "text-[14px] font-normal not-italic",
  textmd: "text-[16px] font-normal not-italic",
  textlg: "text-[20px] font-normal not-italic",
  textxl: "text-[27px] font-normal not-italic md:text-[25px] sm:text-[23px]",
  text2xl: "text-[35px] font-normal not-italic md:text-[33px] sm:text-[31px]",
  text3xl: "text-[40px] font-normal not-italic md:text-[38px] sm:text-[36px]",
  text4xl: "text-[45px] font-normal not-italic md:text-[43px] sm:text-[39px]",
};

const Text = ({
  children,
  className = "",
  as,
  size = "textmd",
  ...restProps
}) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-white-1 font-duel ${className} ${sizes[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(sizes)).isRequired,
};

export { Text };
