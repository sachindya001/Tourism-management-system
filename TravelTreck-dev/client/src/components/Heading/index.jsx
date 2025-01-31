import PropTypes from "prop-types";

const sizes = {};

const Heading = ({ children, className = "", size = "", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

Heading.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.string,
  as: PropTypes.string,
};

export { Heading };
