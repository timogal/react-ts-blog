import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectMenuOpen } from 'selectors/globalSelectors';
import { closeMenu, openMenu } from '../../actions';

interface Props {
  menuOpen: boolean
  onMenuOpenChange: (open: boolean) => void
}

interface ResponsiveMenuWrapperState {
  mounted: boolean
  drawerLoaded: boolean
}

class ResponsiveMenuWrapper extends React.Component<Props, ResponsiveMenuWrapperState> {
  static DrawerComponent: React.ComponentType<any> | null = null;

  componentDidMount() {
    this.setState({ mounted: true });
  }

  async componentWillReceiveProps(nextProps: Props) {
    const { menuOpen: currentOpen } = this.props;
    const { menuOpen: nextOpen } = nextProps;
    if (!currentOpen && nextOpen) {
      if (!this.state.drawerLoaded) {
        // 懒加载侧边栏
        const module = await import(/* webpackChunkName: "drawer" */'react-motion-drawer');
        ResponsiveMenuWrapper.DrawerComponent = module.default || module;
        this.setState({ drawerLoaded: true });
      }
      document.body.classList.add('full-screen');
    } else if (currentOpen && !nextOpen) {
      document.body.classList.remove('full-screen');
    }
  }

  state = {
    mounted: false,
    drawerLoaded: ResponsiveMenuWrapper.DrawerComponent !== null,
  };

  drawerRef = (instance: any) => {
    const { menuOpen } = this.props;
    if (menuOpen) {
      // 解决初始状态无法打开的问题
      instance.open();
    }
  };

  render() {
    const { drawerLoaded, mounted } = this.state;
    const { children, menuOpen, onMenuOpenChange, ...restProps } = this.props;
    if (!mounted || !drawerLoaded) {
      return null;
    }
    const Component = ResponsiveMenuWrapper.DrawerComponent!;
    return (
      <Component
        ref={this.drawerRef}
        open={menuOpen}
        onChange={onMenuOpenChange}
        {...restProps}
      >
        {children}
      </Component>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  menuOpen: makeSelectMenuOpen(),
});

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onMenuOpenChange(open: boolean) {
      if (open) {
        dispatch(openMenu());
      } else {
        dispatch(closeMenu());
      }
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveMenuWrapper);
