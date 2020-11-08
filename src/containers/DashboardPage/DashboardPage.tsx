import React from 'react';
import './DashboardPage.scss';

/*3rd party lib*/
import { Tabs } from 'antd';
import LazyLoad from 'react-lazyload';
import { Container } from 'react-bootstrap';
/* Utils */
import { useWindowDimensions } from 'src/shared/HandleWindowResize';
/*components*/
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import Body from 'src/containers/DashboardPage/DashboardCRUD/Body/Body';
import Make from 'src/containers/DashboardPage/DashboardCRUD/Make/Make';
import Accessory from 'src/containers/DashboardPage/DashboardCRUD/Accessory/Accessory';

const { TabPane } = Tabs;
interface DashboardPageProps {}

type Props = DashboardPageProps;

/**
 *
 * The page where admin can add delete or update information
 * @param {*} {  onCreateBrand }
 * @return {*}
 * @category Pages
 */
const DashboardPage: React.FC<Props> = () => {
  /* ================================================== */
  // state
  /* ================================================== */
  const { width } = useWindowDimensions();

  /* ================================================== */
  // methods
  /* ================================================== */

  /* ================================================== */
  // components
  /* ================================================== */

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <NavbarComponent activePage="" />
      <Container>
        <section className="dashboard__section">
          <Tabs defaultActiveKey="1" tabPosition={width > 1200 ? 'left' : 'top'}>
            <TabPane tab="Make" key="1" className="dashboard__tab">
              <LazyLoad placeholder={<div>Loading</div>}>
                <Make />
              </LazyLoad>
            </TabPane>
            <TabPane tab="Body" key="2" className="dashboard__tab">
              <LazyLoad placeholder={<div>Loading</div>}>
                <Body />
              </LazyLoad>
            </TabPane>
            <TabPane tab="Accessory" key="3" className="dashboard__tab">
              <LazyLoad placeholder={<div>Loading</div>}>
                <Accessory />
              </LazyLoad>
            </TabPane>
          </Tabs>
        </section>
      </Container>
    </>
  );
};

export default DashboardPage;
