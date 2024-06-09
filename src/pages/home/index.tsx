import React, { useContext, useState } from "react";
import Genetico from "../genetico/Genetico";

import Mesa from "../Mesa/Mesa";
import MenuNavigation from "./Menu";

interface Props {
  logoCliente: string;
}

const Home: React.FC<Props> = (props: Props) => {
 
  return (
    <div className="  ">
        <MenuNavigation />

    </div>
  );
};
export default Home;
