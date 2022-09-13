import { useState } from 'react';
import { Summary } from '../Summary';
import { TransactionTable } from '../TransactionsTable';
import { Container } from './styles';
import { api } from "../../services/api";
import { useEffect } from 'react';
import { NewAgendaModal } from '../NewAgendaModal';

interface Aluno {
    codigo: string;
    cpfRespFin: string;
    nomeRespFin: string;
    codigoAluno: string;
    nomeAluno: string;
    serie: string;
    categoria: string;
}

export function Dashboard() {
   
    const [inadimplente, setInadimplente] = useState(false);
    const [mudou, setMudou] = useState(0);
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [cpf, setCpf] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [isNewAgendaModalOpen, setIsNewAgendaModalOpen] = useState(false);
    const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno>({} as Aluno);

    function handleAlunoSelecionado(aluno: Aluno){
        setAlunoSelecionado(aluno);
    }
    
    async function handleSourceCpf(cpf: string) {
        setAlunos([]);
        if (!cpf)
        return;
        setSpinner(true);
        await api.get('/Inadimplente/' + cpf)
        .then(response => setInadimplente(response.data))
        setMudou(1);
    }
    
    useEffect(() => {
        if (cpf && !inadimplente){
            api.get('/Aluno/ByResponsavel/' + cpf)
            .then(response => setAlunos(response.data))
        }
        setMudou(0);
        setSpinner(false);
    }, [mudou]);
    
    function handleOpenNewAgendaModal() {
        setIsNewAgendaModalOpen(true);
    }

    function handleCloseNewAgendaModal() {
        setIsNewAgendaModalOpen(false);
    }

    return (
        <Container>
            <Summary 
                spinner={spinner}
                cpf={cpf}
                setCpf={setCpf}
                handleSourceCpf={handleSourceCpf}
            />

            <TransactionTable 
                inadimplente={inadimplente}
                alunos={alunos}
                onOpenNewAgendaModal={handleOpenNewAgendaModal}
                handleAlunoSelecionado={handleAlunoSelecionado}
            />

            <NewAgendaModal
                isOpen={isNewAgendaModalOpen}
                onRequestClose={handleCloseNewAgendaModal}
                alunoSelecionado={alunoSelecionado}
            />
        </Container>
    )
}