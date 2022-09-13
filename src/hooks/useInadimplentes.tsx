import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Inadimplente {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string
}

type InadimplenteInput = Omit<Inadimplente, 'id' | 'createdAt'>

interface InadimplentesProviderProps {
    children: ReactNode;
}

interface InadimplentesContextData {
    transactions: Inadimplente[];
    createTransaction: (transaction: InadimplenteInput ) => Promise<void>;
}

const TransactionsContext = createContext<InadimplentesContextData>(
    {} as InadimplentesContextData
);

export function TransactionsProvider({ children }: InadimplentesProviderProps) {
    const [transactions, setTransactions] = useState<Inadimplente[]>([]);

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))

    }, []);

    async function createTransaction( transactionInput : InadimplenteInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        })
        
        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction
        ]);
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}