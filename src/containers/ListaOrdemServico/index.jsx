import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Modal, Button, Form } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import "./style/listaordem.css";

const contratosPorCliente = {
    "Cleiton Silva": "CONTRATO_1",
    "Jose Alberto": "CONTRATO_2",
    "Darius da Silva": "CONTRATO_3",
};

const getContratoDisplayName = (contrato) => {
    if (!contrato) return 'Não possui';
    return contrato;
};

const getStatusColor = (status) => {
    switch (status) {
        case 'CONCLUIDO':
            return 'green';
        case 'CANCELADO':
            return 'red';
        case 'ANDAMENTO':
            return 'yellow';
        default:
            return 'white';
    }
};

export function ListaOrdensServico() {
    const [ordens, setOrdens] = useState([]);
    const [tiposServico, setTiposServico] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordensPorPagina] = useState(6);
    const [showModal, setShowModal] = useState(false);
    const [ordemSelecionada, setOrdemSelecionada] = useState(null);
    const [comentarios, setComentarios] = useState('');
    const [comentariosList, setComentariosList] = useState([]);
    const [responsavel, setResponsavel] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        const ordensSalvas = JSON.parse(localStorage.getItem('ordensServico')) || [];
        setOrdens(ordensSalvas.map(ordem => ({
            ...ordem,
            contrato: contratosPorCliente[ordem.cliente] || getContratoDisplayName(ordem.contrato),
        })));

        const tiposSalvos = JSON.parse(localStorage.getItem('tiposServico')) || [];
        setTiposServico(tiposSalvos);
    }, []);

    const totalPages = Math.ceil(ordens.length / ordensPorPagina);
    const indexOfLastOrder = currentPage * ordensPorPagina;
    const indexOfFirstOrder = indexOfLastOrder - ordensPorPagina;
    const currentOrders = ordens.slice(indexOfFirstOrder, indexOfLastOrder);

    const handleShowModal = (ordem) => {
        setOrdemSelecionada(ordem);
        setComentariosList(ordem.comentarios || []);
        setResponsavel(ordem.responsavel || '');
        setStatus(ordem.status);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setOrdemSelecionada(null);
    };

    const handleSaveComentario = () => {
        if (comentarios.trim()) {
            const newComentariosList = [...comentariosList, comentarios];
            const updatedOrder = {
                ...ordemSelecionada,
                comentarios: newComentariosList, 
            };

            const updatedOrders = ordens.map((ordem) =>
                ordem === ordemSelecionada ? updatedOrder : ordem
            );
            setOrdens(updatedOrders);
            localStorage.setItem('ordensServico', JSON.stringify(updatedOrders));

            setComentariosList(newComentariosList);
            setComentarios(''); 
        }
    };

    const handleStatusChange = (newStatus) => {
      
        const updatedOrder = {
            ...ordemSelecionada,
            status: newStatus,
            comentarios: comentariosList,
            responsavel,
        };

        const updatedOrders = ordens.map((ordem) =>
            ordem === ordemSelecionada ? updatedOrder : ordem
        );

        setOrdens(updatedOrders);
        localStorage.setItem('ordensServico', JSON.stringify(updatedOrders));
        setStatus(newStatus);
    };

    const handleSaveChanges = () => {
        const updatedOrders = ordens.map((ordem) => {
            if (ordem === ordemSelecionada) {
                return {
                    ...ordemSelecionada,
                    comentarios: comentariosList,
                    responsavel,
                    status,
                };
            }
            return ordem;
        });
        setOrdens(updatedOrders);
        localStorage.setItem('ordensServico', JSON.stringify(updatedOrders));
        setShowModal(false);
    };

    const handleClearAllOrders = () => {
        if (window.confirm('Tem certeza que deseja limpar todas as ordens de serviço?')) {
            localStorage.removeItem('ordensServico');
            setOrdens([]);
            setCurrentPage(1);
        }
    };

    return (
        <Container className="ordem-servico-container">
            <h2>Ordens de Serviço</h2>
            <Row>
                <Col className="d-flex justify-content-end mb-3">
                    <Button variant="danger" onClick={handleClearAllOrders} className="ms-auto">
                        Limpar todas as ordens de serviço
                    </Button>
                </Col>
            </Row>
            <Row>
                {currentOrders.length > 0 ? (
                    currentOrders.map((ordem, index) => (
                        <Col md={4} key={index} className="mb-4">
                            <Card className="ordem-card" onClick={() => handleShowModal(ordem)}>
                                <Card.Body>
                                    <Card.Title>{ordem.servico}</Card.Title>
                                    <Card.Text>
                                        <strong>Cliente: </strong>{ordem.cliente}<br />
                                        <strong>Contrato: </strong>{ordem.contrato}<br />
                                        <strong>Situação: </strong>
                                        <span style={{ color: getStatusColor(ordem.status) }}>
                                            {ordem.status}
                                        </span><br />
                                        <strong>Data: </strong>{ordem.data}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>Nenhuma ordem de serviço salva.</p>
                )}
            </Row>

            <Pagination className="justify-content-center mt-4">
                <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
            </Pagination>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalhes da Ordem de Serviço</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {ordemSelecionada && (
                        <>
                            <Form.Group>
                                <Form.Label>Cliente</Form.Label>
                                <Form.Control type="text" value={ordemSelecionada.cliente} readOnly />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control type="text" value={ordemSelecionada.servico} readOnly />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contrato</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={ordemSelecionada.contrato || ''}
                                    onChange={(e) =>
                                        setOrdemSelecionada({
                                            ...ordemSelecionada,
                                            contrato: e.target.value,
                                        })
                                    }
                                    disabled={!contratosPorCliente[ordemSelecionada?.cliente]}
                                >
                                    <option value="">Selecione</option>
                                    {contratosPorCliente[ordemSelecionada?.cliente] && (
                                        <option value={contratosPorCliente[ordemSelecionada.cliente]}>
                                            {contratosPorCliente[ordemSelecionada.cliente]}
                                        </option>
                                    )}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Data</Form.Label>
                                <Form.Control type="text" value={ordemSelecionada.data} readOnly />
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Ocorrências</Form.Label>
                                <ul>
                                    {comentariosList.map((comentario, index) => (
                                        <li key={index}>{comentario}</li>
                                    ))}
                                </ul>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={comentarios}
                                    onChange={(e) => setComentarios(e.target.value)}
                                    disabled={ordemSelecionada.status === 'CONCLUIDO' || ordemSelecionada.status === 'CANCELADO'}
                                />
                                <Button variant="primary" onClick={handleSaveComentario} className="mt-2">
                                    Adicionar Ocorrência
                                </Button>
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Responsável</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={responsavel}
                                    onChange={(e) => setResponsavel(e.target.value)}
                                    disabled={ordemSelecionada.status === 'CONCLUIDO' || ordemSelecionada.status === 'CANCELADO'}
                                />
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={status}
                                    onChange={(e) => handleStatusChange(e.target.value)}
                                    disabled={ordemSelecionada.status === 'CONCLUIDO' || ordemSelecionada.status === 'CANCELADO'}
                                >
                                    <option value="ANDAMENTO">Andamento</option>
                                    <option value="CONCLUIDO">Concluído</option>
                                    <option value="CANCELADO">Cancelado</option>
                                </Form.Control>
                            </Form.Group>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Fechar</Button>
                    <Button variant="primary" onClick={handleSaveChanges}>Salvar Alterações</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
