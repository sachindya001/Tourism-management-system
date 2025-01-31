import PropTypes from "prop-types";

const shapes = {
  round: "rounded-[12px]",
};

const variants = {
  fill: {
    light_blue_900: "bg-Light_blue-900 text-white-0",
  },
};

const sizes = {
  md: "h-[56px] px-4",
  sm: "h-[48px] px-3.5 text-[27px]",
  xs: "h-[46px] px-[34px] text-[20px]",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "xs",
  color = "Light_blue_900",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center text-center cursor-pointer whitespace-nowrap bg-Light_blue-900 ${
        shape && shapes[shape]
      } ${size && sizes[size]} ${variant && variants[variant]?.[color]}
        shape && shapes[shape]} ${size && sizes[size]} ${
        variant && variants[variant]?.[color]
      }`}
      {...restProps}
    >
      {!leftIcon && leftIcon}
      {children}
      {!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["md", "sm", "xs"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["Light_blue_900"]),
};

export { Button };
