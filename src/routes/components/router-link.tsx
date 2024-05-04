import { Link } from "react-router-dom";
import { ReactNode, forwardRef } from "react";

// ----------------------------------------------------------------------

interface IRouterLink {
  href: string;
  children: ReactNode;
}

const RouterLink = forwardRef<HTMLAnchorElement, IRouterLink>(
  ({ href, ...other }, ref) => <Link ref={ref} to={href} {...other} />,
);

export default RouterLink;
