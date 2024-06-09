
import React, { useContext, useState } from "react";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
interface Props {

}

const MenuNavigation: React.FC<Props> = (props: Props) => {
  const [value, setValue] = React.useState(0);
  return (

      <BottomNavigation
        showLabels
        style={{position: 'absolute', bottom: 0}}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Buscas" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Algoritimo Genetico" icon={<RestoreIcon />} />
      </BottomNavigation>

  );
};
export default MenuNavigation;
