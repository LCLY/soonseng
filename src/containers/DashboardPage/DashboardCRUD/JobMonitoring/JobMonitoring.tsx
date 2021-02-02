import { Button, Layout, Table } from 'antd';
import React from 'react';
import CustomContainer from 'src/components/CustomContainer/CustomContainer';
import LayoutComponent from 'src/components/LayoutComponent/LayoutComponent';
// import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';
import holy5truck from 'src/img/5trucks.jpg';
import './JobMonitoring.scss';
/* components */
/* 3rd party lib */
/* Util */
interface JobMonitoringProps {}

type Props = JobMonitoringProps;

const JobMonitoring: React.FC<Props> = () => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  /* ================================================== */
  /*  method */
  /* ================================================== */
  /* ================================================== */
  /*  useEffect */
  /* ================================================== */

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <NavbarComponent activePage="job_monitoring" defaultOpenKeys="dashboard" />
      <Layout>
        <LayoutComponent activeKey="accessory">
          <ParallaxContainer bgImageUrl={holy5truck} overlayColor="rgba(0, 0, 0, 0.3)">
            <CustomContainer>
              <div className="make__tab-outerdiv">
                <section>
                  <>
                    <section className="make__section">
                      <div className="make__header-div ">
                        <div className="make__header-title">Standard Charges & Fees</div>
                        <Button type="primary" className="make__brand-btn">
                          Create New Fees
                        </Button>
                      </div>

                      {/* -------------------- */}
                      {/*     Make Table      */}
                      {/* -------------------- */}
                      <Table
                        bordered
                        className="make__table"
                        scroll={{ x: '89rem', y: 600 }}
                        // components={components}

                        // pagination={false}
                      />
                    </section>
                  </>
                </section>

                <section>
                  <>
                    <section className="make__section">
                      <div className="make__header-div ">
                        <div className="make__header-title">Standard Charges & Fees</div>
                        <Button type="primary" className="make__brand-btn">
                          Create New Fees
                        </Button>
                      </div>

                      {/* -------------------- */}
                      {/*     Make Table      */}
                      {/* -------------------- */}
                      <Table
                        bordered
                        className="make__table"
                        scroll={{ x: '89rem', y: 600 }}
                        // components={components}

                        // pagination={false}
                      />
                    </section>
                  </>
                </section>
              </div>
            </CustomContainer>
          </ParallaxContainer>
        </LayoutComponent>
      </Layout>
    </>
  );
};

export default JobMonitoring;
