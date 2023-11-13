import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        dispaly: "flex",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; Note Zipper</Col>

        </Row>
      </Container>
    </footer>
  )
}

export default footer
