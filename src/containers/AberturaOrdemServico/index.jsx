import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function AberturaOrdemServico() {
    const [formData, setFormData] = useState({
        contrato: '',
        cliente: '',
        status: 'ANDAMENTO',
        data: new Date().toLocaleDateString('pt-BR'),
    });
    const [contratosDisponiveis, setContratosDisponiveis] = useState([]);

    const navigate = useNavigate();

    // Mapeamento de clientes para contratos
    const contratosPorCliente = {
        'Cleiton Silva': ['CONTRATO_1'],
        'Jose Alberto': ['CONTRATO_2'],
        'Darius da Silva': ['CONTRATO_3'],
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => {
            const updatedFormData = {
                ...prevFormData,
                [name]: value,
            };

            // Atualiza os contratos disponíveis com base no cliente selecionado
            if (name === 'cliente') {
                const contratos = contratosPorCliente[value] || [];
                setContratosDisponiveis(contratos);
                updatedFormData.contrato = contratos.length === 1 ? contratos[0] : '';
            }

            return updatedFormData;
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form data submitted:', formData);

        const novaOrdem = {
            contrato: formData.contrato,
            cliente: formData.cliente,
            status: formData.status,
            data: formData.data,
        };

        const ordensSalvas = JSON.parse(localStorage.getItem('ordensServico')) || [];
        const novasOrdens = [...ordensSalvas, novaOrdem];
        localStorage.setItem('ordensServico', JSON.stringify(novasOrdens));

        console.log('Ordens salvas:', novasOrdens);
        navigate('/lista-ordem-servico');
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2>Abertura de Ordem de Serviço</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="cliente">
                            <Form.Label>Cliente</Form.Label>
                            <Form.Control
                                as="select"
                                name="cliente"
                                value={formData.cliente}
                                onChange={handleInputChange}
                            >
                                <option value="">Selecione</option>
                                {Object.keys(contratosPorCliente).map((cliente) => (
                                    <option key={cliente} value={cliente}>
                                        {cliente}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="contrato">
                            <Form.Label>Contrato</Form.Label>
                            <Form.Control
                                as="select"
                                name="contrato"
                                value={formData.contrato}
                                onChange={handleInputChange}
                                disabled={contratosDisponiveis.length === 0}
                            >
                                <option value="">Selecione</option>
                                {contratosDisponiveis.map((contrato) => (
                                    <option key={contrato} value={contrato}>
                                        {contrato}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <div className="d-flex justify-content-center mt-3">
                            <Button variant="primary" type="submit" className="me-2">
                                Salvar
                            </Button>
                            <Button variant="secondary" type="button">
                                Cancelar
                            </Button>
                        </div>
                    </Form>

                    <div className="d-flex justify-content-center mt-3">
                        <Button variant="info" onClick={() => navigate('/lista-ordem-servico')}>
                            Ver Ordens de Serviço
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
