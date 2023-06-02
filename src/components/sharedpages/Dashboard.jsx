import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { TitleProvider, domSelector } from "../apis/TitleProvider";
import DashboardContent from "../admin/DashboardContent";
import FiDashboard from "../finance/FiDashboard";
import FODashboard from "../fo/FODashboard";
import ReactToPrint from "react-to-print";
import { useConsumer } from "../apis/ContextAPIProvider";

export default function Dashboard() {
  let componentRef = useRef(null);
  const { getRole, token } = useConsumer();
  const role = getRole();

  const resetBodyClass = () => {
    domSelector("body").classList.toggle("print");
  };

  return (
    <Container fluid className="mb-4" id="content">
      <TitleProvider titleText="Dashboard" />
      <Row className="px-2 mb-4">
        <Col
          xs={12}
          md={12}
          lg={12}
          className="px-2 py-4 d-flex justify-content-between"
        >
          <span className="px-2 fs-3 fw-bold text-secondary">Dashboard</span>
          <ReactToPrint
            trigger={() => (
              <Button className=" d-none badge btn-sm btn btn-danger rounded-4 px-3">
                Export PDF
              </Button>
            )}
            content={() => componentRef}
            onBeforeGetContent={() => resetBodyClass(false)}
            onAfterPrint={() => resetBodyClass(true)}
          />
        </Col>
      </Row>

      {role === 1 ? (
        <DashboardContent
          bearer={{ headers: { Authorization: "Bearer " + token() } }}
          id={getRole()}
          ref={(el) => (componentRef = el)}
        />
      ) : role === 3 ? (
        <FiDashboard
          bearer={{ headers: { Authorization: "Bearer " + token() } }}
          id={getRole()}
          ref={(el) => (componentRef = el)}
        />
      ) : (
        <FODashboard
          bearer={{ headers: { Authorization: "Bearer " + token() } }}
          id={getRole()}
          ref={(el) => (componentRef = el)}
        />
      )}
    </Container>
  );
}
