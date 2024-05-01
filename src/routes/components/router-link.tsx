import { forwardRef } from "react";
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

interface IRouterLink {
  href: string;
}

const RouterLink = forwardRef<HTMLAnchorElement, IRouterLink>(
  ({ href, ...other }, ref) => <Link ref={ref} to={href} {...other} />,
);

export default RouterLink;
