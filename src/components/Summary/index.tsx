import { Container } from "./styles";
import { cpfMask } from './mask';

interface SummaryProps {
    spinner: boolean;
    handleSourceCpf: (cpf: string) => void;
    cpf: string;
    setCpf: (cpf: string) => void;
}

export function Summary({ handleSourceCpf, cpf, setCpf, spinner } : SummaryProps ) {

     return (
        <Container>
            <div className="highlight-background">
                <header>
                    <p>Para realizar o seu agendamento, preencha o campo abaixo, com o CPF do Responsável Financeiro
                         vinculado ao aluno na matrícula do ano letivo 2023.</p>
                </header>
                <input
                    placeholder="Digite o CPF do Responsável Financeiro"
                    onChange={event => setCpf(cpfMask(event.target.value))}
                    value={cpf}
                />

                <button type="submit" onClick={() => handleSourceCpf(cpf)}>
                    { spinner ?   
                        <div className="loader">Loading...</div>
                    : 
                        <span>Buscar</span>
                    }
                </button>
            </div>

        </Container>
    )
}