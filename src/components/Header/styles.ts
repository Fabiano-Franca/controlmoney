import styled from "styled-components";

export const Container = styled.header`
    background: var(--background);
`;

export const Content = styled.div`
    max-width: 1120px;
    margin: 0 auto; //centraliza a div

    padding: 2rem 1rem 12rem;
    display: flex;  //Alinha a logo e o botão
    align-items: center; //Alinha a logo e o botão
    justify-content: space-between; //Justifica com um espaço entre os elementos, colocando umna ponta e outro na outra ponta

    button {
        font-size: 1rem;
        color: #FFF;
        background: var(--blue);
        border: 0;
        padding: 0 2rem;
        border-radius: 0.25rem;
        height: 3rem;
        
        transition: filter 0.2s; //Seta a duração do efeito no filter

        &:hover {
            filter: brightness(0.9); //Escurece o botão e todo seu conteudo ao passar o mouse
        }
    }

`;