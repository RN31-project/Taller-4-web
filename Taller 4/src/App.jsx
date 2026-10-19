import { useEffect, useState } from 'react'
import {
  Alert,
  Badge,
  Card,
  CardBody,
  Col,
  Container,
  Navbar,
  NavbarBrand,
  Row,
} from 'reactstrap'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function App() {
  const [health, setHealth] = useState({ loading: true, data: null, error: '' })
  const [apiInfo, setApiInfo] = useState({ loading: true, data: null, error: '' })

  useEffect(() => {
    async function loadEndpoint(path, setResult) {
      try {
        const response = await fetch(`${API_URL}${path}`)
        if (!response.ok) throw new Error(`Error HTTP ${response.status}`)
        const data = await response.json()
        setResult({ loading: false, data, error: '' })
      } catch (error) {
        setResult({ loading: false, data: null, error: error.message })
      }
    }

    loadEndpoint('/api/health', setHealth)
    loadEndpoint('/api/info', setApiInfo)
  }, [])

  return (
    <>
      <Navbar className="app-navbar" light>
        <Container>
          <NavbarBrand className="app-brand" href="/">
            Taller IV
          </NavbarBrand>
        </Container>
      </Navbar>
      <main className="app-main">
        <Container className="content-container">
          <header className="page-heading">
            <div className="eyebrow">Frontend · React + Reactstrap</div>
            <h1>Taller IV</h1>
            <p>Estado del servicio y datos del equipo.</p>
          </header>

          <section className="health-section" aria-labelledby="health-title">
            <div className="section-heading">
              <h2 id="health-title">Estado del API</h2>
              {!health.loading && !health.error && (
                <Badge color="success" pill>Conectado</Badge>
              )}
            </div>
            {health.loading ? (
              <Alert color="secondary" className="status-message">Consultando el API...</Alert>
            ) : health.error ? (
              <Alert color="danger" className="status-message">
                No se pudo conectar con el API: {health.error}
              </Alert>
            ) : (
              <div className="health-message">
                <h4>El API está funcionando</h4>
                <p>{health.data.message}</p>
              </div>
            )}
          </section>

          <section className="info-section" aria-labelledby="info-title">
            <div className="section-heading">
              <h2 id="info-title">Integrantes</h2>
              <span className="endpoint-label">GET /api/info</span>
            </div>
            {apiInfo.loading ? (
              <p className="muted-message">Cargando información del equipo...</p>
            ) : apiInfo.error ? (
              <Alert color="danger">No se pudo cargar la información: {apiInfo.error}</Alert>
            ) : (
              <Row className="g-3">
                {apiInfo.data.integrantes.map((integrante, index) => (
                  <Col key={`${integrante.nombre}-${index}`} xs="12" md="6">
                    <Card className="member-card h-100">
                      <CardBody>
                        <div className="member-number">Integrante {index + 1}</div>
                        <h3>{integrante.nombre}</h3>
                        <dl className="member-details">
                          <div><dt>Edad</dt><dd>{integrante.edad ?? 'Pendiente'}</dd></div>
                          <div><dt>Carrera</dt><dd>{integrante.carrera}</dd></div>
                          <div><dt>Materias aprobadas</dt><dd>{integrante.materiasAprobadas ?? 'Pendiente'}</dd></div>
                        </dl>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </section>
        </Container>
      </main>
    </>
  )
}