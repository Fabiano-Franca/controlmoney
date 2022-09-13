import { FormEvent, useEffect, useState } from "react";
import { Container, AgendaTypeContainer, CalendarTypeContainer, CalendarOptionsTypeContainer, RadioBox, RadioBoxOption, ErrorText } from "./styles";
import closeImg from '../../assets/close.svg';
import Modal from 'react-modal';
import { api } from "../../services/api";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import { Formik } from 'formik';

interface Aluno {
    codigo: string;
    cpfRespFin: string;
    nomeRespFin: string;
    codigoAluno: string;
    nomeAluno: string;
    serie: string;
    categoria: string;
}

interface Escola {
    id: number;
    codigo: string;
    descricao: string;
}

interface Agenda {
    id: string;
    horario: string;
    data: string;
}

interface Calendar {
    data: string;
    agendas: Agenda[];
}

interface NewAgendaModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    alunoSelecionado: Aluno;
}

interface Agendamento {
    codFilial: number;
    cpf: string;
    nome: string;
    email: string;
    telefone: string;
    categoria: string;
    codigoAluno: string;
    nomeAluno: string;
    serie: string;
    tipo: string;
    data: string;
}

const validationSchema = Yup.object({
    email: Yup
            .string()
            .email('Entre com um e-mail válido')
            .required('Email Obrigatório.'),
    celular: Yup
            .string()
            .max(11)
            .required('Celular obrigatório.')
  });

export function NewAgendaModal({ isOpen, onRequestClose, alunoSelecionado }: NewAgendaModalProps) {

    const [type, setType] = useState('');
    const [hora, setHora] = useState('');
    const [data, setData] = useState('');
    const [escolas, setEscolas] = useState<Escola[]>([]);
    const [idFilialSelecionada, setIdFilialSelecionada] = useState(0);
    const [agendas, setAgendas] = useState<Calendar[]>([]);

    function handleAgenda(codigoEscola: string){
        if(!codigoEscola)
            return;

        setIdFilialSelecionada(Number(codigoEscola))
        
        api.get('/Agenda/' + codigoEscola)
        .then(response => setAgendas(response.data))
    }

    async function handleSubmit(
        values: any, { 
            setSubmitting,
            setFieldError 
        }: any
    ) {
        if(!type){
            setFieldError('tipo', 'Tipo obrigatório');
            setSubmitting(false);
            return;
        }
        if(!data){
            setFieldError('data', 'Data obrigatória');
            setSubmitting(false);
            return;
        }
        
        try {
            let filial = escolas.find(e => e.id ===  idFilialSelecionada)?.codigo;
            let tempFilial = filial ? Number(filial) : 0;
            
            const agendamento: Agendamento = {
                'codFilial': tempFilial,
                'cpf': alunoSelecionado.cpfRespFin,
                'nome': alunoSelecionado.nomeAluno,
                'email': values.email,
                'telefone': values.celular,
                'categoria': alunoSelecionado.categoria,
                'codigoAluno': alunoSelecionado.codigoAluno,
                'nomeAluno': alunoSelecionado.nomeAluno,
                'serie': alunoSelecionado.serie,
                'tipo': type,
                'data': data.replace('00:00:00', hora)
            };
            
            console.log(agendamento)
            
            await api.post('/Agendamento', agendamento)
            .then((response) => {
                console.log(response)
                if(response.status === 200){
                    toast.success(response.data);
                }
            });
        } catch (error: any) {
            toast.error('Erro: ' + error.message)
            setSubmitting(false)
        }
        
        //Fecha o modal
        setSubmitting(false);
        onRequestClose();

        // setTimeout(() => {
        //     console.log(values)
        // }, 5000);
    }

    useEffect(() => {
        api.get('/Escola')
        .then(response => setEscolas(response.data))
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type="button"
                onClick={onRequestClose}
                className="react-modal-close">
                <img src={closeImg} alt="Fechar modal" />
            </button>
            <Formik
                initialValues={
                    { 
                        email: '',
                        celular: '',
                        tipo: '',
                        data: ''
                    }
                }
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, handleChange, values, touched, isSubmitting, errors, handleBlur }) => (
                    <Container onSubmit={handleSubmit}>
                        <h2>Cadastrar agendamento</h2>
                        <p>Todos os campos são obrigatórios*</p>
                        <select 
                            required
                            onChange={event => handleAgenda(event.target.value)}
                        >
                            <option value="">-- Seleciona a escola --</option>
                            {escolas.map(escola => {
                                return(
                                    <option key={escola.codigo} value={escola.id}>{escola.descricao}</option>
                                );
                            })}
                        </select>
                        
                        <CalendarTypeContainer >
                            {agendas.map(agenda => {
                                return(
                                    <CalendarOptionsTypeContainer key={agenda.data}>
                                    <label>{agenda.data}</label>
                                        {agenda.agendas.map(agendas => {
                                            return(
                                                <RadioBoxOption key={agendas.id}
                                                    type="button"
                                                    onClick={() => { setHora(agendas.horario); setData(agendas.data);}}
                                                    isActive={hora === agendas.horario && data === agendas.data}
                                                    activeColor="green"
                                                >
                                                    <span>{agendas.horario}</span>
                                                </RadioBoxOption>
                                            );
                                        })}
                                    </CalendarOptionsTypeContainer>
                                );
                            })}
                        </CalendarTypeContainer>
                        {errors.data && touched.data && <ErrorText>{errors.data}</ErrorText>}

                        <input
                            placeholder="CPF"
                            readOnly
                            value={alunoSelecionado.cpfRespFin}
                        />

                        <input
                            placeholder="Nome"
                            readOnly
                            value={alunoSelecionado.nomeRespFin}
                        />

                        <input
                            placeholder="E-mail"
                            name="email"
                            type="email"
                            value={values.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        {errors.email && touched.email && <ErrorText>{errors.email}</ErrorText>}

                        <input
                            placeholder="Celular"
                            name="celular"
                            type="tel"
                            value={values.celular}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        {errors.celular && touched.celular && <ErrorText>{errors.celular}</ErrorText>}

                        <input
                            placeholder="Aluno"
                            readOnly
                            value={alunoSelecionado.nomeAluno}
                        />

                        <AgendaTypeContainer >
                            <RadioBox
                                type="button"
                                onClick={() => { setType('industriario'); }}
                                isActive={type === 'industriario'}
                                activeColor="green"
                            >
                                <span>Industriário</span>
                            </RadioBox>
                            <RadioBox
                                type="button"
                                onClick={() => { setType('comunidade'); }}
                                isActive={type === 'comunidade'}
                                activeColor="green"
                            >
                                <span>Comunidade</span>
                            </RadioBox>
                        </AgendaTypeContainer>
                        {errors.tipo && touched.tipo && <ErrorText>{errors.tipo}</ErrorText>}
                        <button type="submit">
                            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
                        </button>
                    </Container>
                )}
            </Formik>
        </Modal>

    )
}
