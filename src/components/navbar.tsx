import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import TaskRoundedIcon from "@mui/icons-material/TaskRounded";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import { useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {!isLoginPage && (
            <IconButton
              onClick={toggleDrawer}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
            <List>
              <ListItemButton>
                <ListItemText primary="Направления" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <TaskRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Конструктор" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Element 3" />
              </ListItemButton>
            </List>
          </Drawer>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Конструктор РПД
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
