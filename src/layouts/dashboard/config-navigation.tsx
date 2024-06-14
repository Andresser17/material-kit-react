import { ReactNode } from "react";

import SvgColor from "src/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

export type NavSectionLinkType = {
  title: string;
  path: string;
  icon: ReactNode;
};

export type NavSection = {
  title: string;
  path?: string;
  icon?: ReactNode;
  children?: Array<NavSectionLinkType>;
};

export const navSections: Array<NavSection> = [
  {
    title: "Quick Links",
    children: [
      {
        title: "Dashboard",
        path: "/",
        icon: icon("ic_analytics"),
      },
      {
        title: "Create Draft Order",
        path: "/draft-orders/create",
        icon: icon("ic_analytics"),
      },
      {
        title: "Create Lot",
        path: "/lots/create",
        icon: icon("ic_analytics"),
      },
    ],
  },
  {
    title: "Catalog",
    children: [
      {
        title: "Products",
        path: "/products",
        icon: icon("ic_analytics"),
      },
      {
        title: "Lots",
        path: "/lots",
        icon: icon("ic_analytics"),
      },
      {
        title: "Categories",
        path: "/categories",
        icon: icon("ic_analytics"),
      },
      {
        title: "Attributes",
        path: "/attributes",
        icon: icon("ic_analytics"),
      },
    ],
  },
  {
    title: "Sales",
    children: [
      {
        title: "Orders",
        path: "/orders",
        icon: icon("ic_analytics"),
      },
      {
        title: "Draft Orders",
        path: "/draft-orders",
        icon: icon("ic_analytics"),
      },
    ],
  },
  {
    title: "Accounts",
    children: [
      {
        title: "Customers",
        path: "/customers",
        icon: icon("ic_analytics"),
      },
    ],
  },
  {
    title: "Settings",
    path: "/settings",
    icon: icon("ic_analytics"),
  },
];
