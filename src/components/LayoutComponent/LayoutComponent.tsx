import React, { useState } from 'react';
import './LayoutComponent.scss';
/*components*/
import Backdrop from 'src/components/Backdrop/Backdrop';
// import DashboardSidebar from 'src/components/DashboardSidebar/DashboardSidebar';
/*3rd party lib*/
import { Layout } from 'antd';

const { /* Sider ,*/ Content } = Layout;

interface LayoutComponentProps {
  // active key to know which page is it at, e.g. "make || brand || body etc"
  activeKey?: string;
}

type Props = LayoutComponentProps;

/**
 *
 * A component that returns everything (children) thats within the wrap
 * Decorate the content with container, sidebar and layout from antd
 * @param {*} { children }
 * @return {*}
 */
const LayoutComponent: React.FC<Props> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <>
      <Layout>
        {/* <Sider theme="light" width={'auto'} className="layout__sider">
          <DashboardSidebar activeKey={activeKey} />
        </Sider> */}
        <Backdrop show={showSidebar} clicked={() => setShowSidebar(false)} />

        {/* <div
          className="layout__sider--mobile-outerparent"
          style={{
            transform: showSidebar ? 'translateX(0%)' : 'translateX(-100%)',
          }}
        >
          <div className="layout__sider--mobile-parent">
            <div className="layout__sider--mobile-arrow" onClick={() => setShowSidebar(!showSidebar)}>
              <i
                className={`fas fa-caret-right`}
                style={{
                  transform: showSidebar ? 'translateX(-0.2rem) rotate(180deg)' : 'translateX(0)',
                  transition: 'all 0.5s ease',
                }}
              ></i>
            </div>
            <Sider theme="light" width={'auto'} className="layout__sider--mobile">
              <div className="layout__sider--mobile-logo">LOGO</div>
              <DashboardSidebar activeKey={activeKey} />
            </Sider>
          </div>
        </div> */}
        <Layout className="layout__inner">
          <Content className="layout__content">{children}</Content>
        </Layout>
      </Layout>
    </>
  );
};
export default LayoutComponent;
