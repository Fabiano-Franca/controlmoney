import { Container } from "./styles";
import { FaCalendar, FaEye } from 'react-icons/fa'

interface Aluno {
    codigo: string;
    cpfRespFin: string;
    nomeRespFin: string;
    codigoAluno: string;
    nomeAluno: string;
    serie: string;
    categoria: string;
}

interface TransactionTableProps{
    inadimplente: boolean;
    alunos: Aluno[];
    onOpenNewAgendaModal: () => void;
    handleAlunoSelecionado: (aluno: Aluno) => void;
}

export function TransactionTable({inadimplente, alunos, onOpenNewAgendaModal, handleAlunoSelecionado}: TransactionTableProps) {

    return (
        <Container>
            {inadimplente ? 
                <table>
                    <tbody>
                        <tr>
                            <td>Cliente inadimplente, favor entrar em contato com a unidade escolar.</td>
                        </tr>
                    </tbody>
                </table>
            : 
                <table>
                    <thead>
                        <tr>
                            <th>Responsável Financeiro</th>
                            <th>Nº Matrícula</th>
                            <th>Aluno</th>
                            <th><FaCalendar/></th>
                            <th><FaEye/></th>
                        </tr>
                    </thead>

                    <tbody>
                        {alunos.map(alunos => {
                            return (
                                <tr key={alunos.codigo}>
                                    <td>{alunos.nomeRespFin}</td>
                                    <td >{alunos.codigoAluno}</td>
                                    <td>{alunos.nomeAluno}</td>
                                    <td>
                                        <button type="button" onClick={() => {onOpenNewAgendaModal(); handleAlunoSelecionado(alunos);}}>
                                            Agendar
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" >
                                            Visualizar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            }
        </Container>
    )
}