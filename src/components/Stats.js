import React from "react";
import { Row, Col } from "shards-react";
import StatsCard from "./StatsCard";

const Stats = ({ confirmed, recovered, deaths }) => (
  <Row style={{ marginTop: "2rem" }}>
    <Col>
      <StatsCard title="Confirmados" value={confirmed} color={"black"} />
    </Col>
    <Col>
      <StatsCard title="Recuperados" value={recovered} color={"green"} />
    </Col>
    <Col>
      <StatsCard title="Mortos" value={deaths} color={"red"} />
    </Col>
  </Row>
);

export default Stats;
