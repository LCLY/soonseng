import React from 'react';
import './DashboardSidebar.scss';
/*components*/
/*3rd party lib*/
import { Menu } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface DashboardSidebarProps {
  activeKey: string;
}

type Props = DashboardSidebarProps & RouteComponentProps;

const DashboardSidebar: React.FC<Props> = ({ history, activeKey }) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */

  // The array for creating the sidebar
  const menuItemArray = [
    { key: 'brand', title: 'Brand', url: '/dashboard/brand' },
    { key: 'wheelbase', title: 'Wheelbase', url: '/dashboard/wheelbase' },
    { key: 'make', title: 'Make', url: '/dashboard/make' },
    { key: 'body', title: 'Body', url: '/dashboard/body' },
    { key: 'length', title: 'Length', url: '/dashboard/length' },
    { key: 'accessory', title: 'Accessory', url: '/dashboard/accessory' },
    { key: 'bodyLength', title: 'Body Length', url: '/dashboard/body_length' },
    { key: 'bodyAccessory', title: 'Body Accessory', url: '/dashboard/body_accessory' },
  ];

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <Menu style={{ width: 256 }} defaultSelectedKeys={['brand']} selectedKeys={[activeKey]} mode="inline">
        {menuItemArray.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Menu.Item key={item.key} onClick={() => history.push(item.url)}>
                {item.title}
              </Menu.Item>
            </React.Fragment>
          );
        })}
      </Menu>
    </>
  );
};
export default withRouter(DashboardSidebar);
