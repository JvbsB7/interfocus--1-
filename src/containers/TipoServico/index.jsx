import { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal } from 'react-bootstrap';
import { FaPlus, FaTrash } from 'react-icons/fa';
import './style/tiposervico.css';
import { postTipoServico } from '../../api/post-tipo-servico';
import { fetchTipoServico } from '../../api/fetch-tipo-servico';
import { deleteTipoServico } from '../../api/delete-tipo-servico';
import { useMutation, useQuery } from '@tanstack/react-query';

export function TipoServico() {

    const [showModal, setShowModal] = useState(false)
    const [descricao, setDescricao] = useState('')
    const [statusContratoSelecionado, setStatusContratoSelecionado] = useState('')

    const { data: tipoServico } = useQuery({
        queryKey: ['tipo-servico'],
        queryFn: fetchTipoServico
    })

    const { mutateAsync: postTipoServicoFn } = useMutation({
        mutationKey: ['tipo-servico'],
        mutationFn: postTipoServico,
        onSuccess: () => {
            window.location.reload()
        }
    })

    const { mutateAsync: deleteTipoServicoFn } = useMutation({
        mutationKey: ['tipo-servico'],
        mutationFn: deleteTipoServico,
        onSuccess: () => {
            window.location.reload()
        }
    })

    const handleAddOrEditTipo = async () => {
        await postTipoServicoFn({
            descricao, 
            status_ct: statusContratoSelecionado === 'VIGENTE' ? 0 : 1
        })

        setDescricao('')
        setStatusContratoSelecionado('')
        setShowModal(false)
    }

    const handleDeleteTipo = async (id) => {
        await deleteTipoServicoFn(id)
    };

    return (
        <Container className="tipo-servico-container">
            <h2>Tipos de Serviço</h2>

            <Row className="mb-3">
                <Col className="text-end">
                    <Button variant="primary" onClick={() => setShowModal(true)}>
                        <FaPlus /> Cadastrar Tipo de Serviço
                    </Button>
                </Col>
            </Row>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Status de Contrato</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tipoServico && tipoServico.map((el) => {
                            return (
                                <tr key={el.id}>
                                    <td>{el.descricao}</td>
                                    <td>{el.statusCt === 0 ? 'VIGENTE' : 'CANCELADO'}</td>
                                    <td>
                                        <Button variant="outline-danger" onClick={() => handleDeleteTipo(el.id)}>
                                            <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>

            {/* Modal de Cadastro e Edição */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar Tipo de Serviço</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control as="textarea" rows={3} value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status de Contrato</Form.Label>
                            <Form.Control as="select" value={statusContratoSelecionado} onChange={(e) => setStatusContratoSelecionado(e.target.value)}>
                                <option value="">Selecione um status de contrato</option>
                                <option value="VIGENTE">VIGENTE</option>
                                <option value="CANCELADO">CANCELADO</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Fechar</Button>
                    <Button variant="primary" onClick={handleAddOrEditTipo}>
                    Salvar Alterações
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
