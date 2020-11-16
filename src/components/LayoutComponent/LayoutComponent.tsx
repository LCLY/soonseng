import React from 'react';
import './LayoutComponent.scss';
/*components*/
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar';
/*3rd party lib*/
import { Layout } from 'antd';

const { Sider, Content } = Layout;

interface LayoutComponentProps {
  // active key to know which page is it at, e.g. "make || brand || body etc"
  activeKey: string;
}

type Props = LayoutComponentProps;

/**
 *
 * A component that returns everything (children) thats within the wrap
 * Decorate the content with container, sidebar and layout from antd
 * @param {*} { children }
 * @return {*}
 */
const LayoutComponent: React.FC<Props> = ({ children, activeKey }) => {
  return (
    <Layout>
      <Sider theme="light" width={'auto'} className="layout__sider">
        <DashboardSidebar activeKey={activeKey} />
      </Sider>
      <Layout className="layout__inner">
        <Content className="layout__content">{children}</Content>
      </Layout>
    </Layout>
  );
};
export default LayoutComponent;
