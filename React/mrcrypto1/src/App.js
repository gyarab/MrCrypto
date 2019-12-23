import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationRouter from "./navigation/NavigationRouter";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

import { faReddit, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGlobeEurope } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faReddit, faTwitter, faGlobeEurope);

export default function App() {
  return <NavigationRouter />;
}
