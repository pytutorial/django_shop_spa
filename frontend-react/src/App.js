import React from "react";
import {useLocation, withRouter} from "react-router-dom";

import AppStaff from "./AppStaff";
import AppEndUser from "./AppEndUser";

function App() {
  const loc = useLocation();
  const pathname = loc.pathname;

  if(pathname.startsWith('/staff')) {
    return <AppStaff/>;
    
  }else {
    return <AppEndUser/>;
  }

}

export default withRouter(App); 