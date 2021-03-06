import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

const drawerWidth = 370;

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    marginLeft: drawerWidth,
    // [theme.breakpoints.up('sm')]: {
    //   width: `calc(100% - ${drawerWidth}px)`,
    //   marginRight: drawerWidth,
    // },
  },
  appBar2: {
    top: 'auto',
    bottom: 0,
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginRight: drawerWidth,
    },
  },
  menuButton: {
    marginLeft: 20,
    // [theme.breakpoints.up('sm')]: {
    //   display: 'none',
    // },
  },
  toolbar: theme.mixins.toolbar,
});

class ResponsiveDrawer extends React.Component {
  state = {
    anchorEl: null,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };
  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { anchorEl } = this.state;
    const renderMenu = (name) => (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={this.handleMenuClose}
      >
        <MenuItem>{name}</MenuItem>
        <MenuItem onClick={this.props.logout}>Logout</MenuItem>
      </Menu>
    );
    const { classes } = this.props;

    return (
      <div>
        <AppBar style={{ color: '#fff', backgroundColor: 'rgb(48, 48, 48)' }} position="fixed" className={!this.props.admin ? classes.appBar : undefined}>
          <Toolbar>

            <Typography variant="h4" color="inherit" noWrap style={{ fontWeight: 900, color: '#31e7b6' }}>
              Intruder
                </Typography>
            <div className={classes.grow} />
            {this.props.message ? <pre className="prehide" style={{ margin: 0, width: '40%', overflow: 'hidden' }}>
              {this.props.message}
              <span style={{ float: 'right' }}>-{this.props.messageFrom}</span>
            </pre> : <span />}
            <div className={classes.grow} />
            <IconButton
              aria-owns='material-appbar'
              aria-haspopup="true"
              onClick={this.handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Typography variant="subtitle1" color="inherit" noWrap onClick={this.handleProfileMenuOpen} style={{ cursor: 'pointer' }}>
              <span style={{ color: 'grey' }}>{this.props.user.username}</span>
            </Typography>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.onClick}
              className={classes.menuButton}
              anchor="right"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          {renderMenu(this.props.user.name)}
        </AppBar>
        {/* 
            <AppBar position="fixed" color="primary" className={classes.appBar2}>
            <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.props.onClick}
                  className={classes.menuButton}
                  anchor="right"
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" noWrap>
                  Intruder
                </Typography>
                <div className={classes.grow} />
                <IconButton
                    aria-owns='material-appbar'
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Typography variant="p" color="inherit" noWrap>
                  <span style={{color:'grey'}}>awasthishubh</span>
                </Typography>
              </Toolbar>
              {renderMenu}
      </AppBar> */}
      </div>

    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);