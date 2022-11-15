import React from "react";
import { NavLink } from "react-router-dom";

import "./NavigationItems.css";

const navItems = [{ id: "signup", text: "form", link: "/", auth: false }];

const navigationItems = (props) => [
  ...navItems
    .filter((item) => item.auth === props.isAuth)
    .map((item) => (
      <li
        key={item.id}
        className={["navigation-item", props.mobile ? "mobile" : ""].join(" ")}
      >
        <NavLink to={item.link} exact onClick={props.onChoose}>
          {item.text}
        </NavLink>
      </li>
    )),
];

export default navigationItems;
