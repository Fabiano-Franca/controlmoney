import { createGlobalStyle } from "styled-components";
import 'react-toastify/dist/ReactToastify.css';

export const GlobalStyle = createGlobalStyle`
    //Define as variáveis globais
    :root {
        --background: #f0f2f5;
        --red: #e52e4d;
        --green: #33CC95;
        --green-dark: ##7CEBAC;
        --blue: #1c62cc;
        --blue-white:#6497E3;

        --blue-ligth: #6933ff;

        --text-title: #363f5f;
        --text-body: #969cb3;

        --shape: #FFFFFF;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    //Por padrão a font do css é font-size: 16px (Desktop)
    //REM = 1rem = font-size (16px)
    html {
        //Quando o usuario estiver com uma tela de até 1080px utilize % da fonte padrão
        @media (max-width: 1080px) {
            font-size: 93.75%; //15px
        }

        //Quando estiver em uma tela menor do que  720px utilize % da fonte padrão
        @media (max-width: 720px) {
            font-size: 97.5%; //14px
        }
    }

    body {
        background: var(white);
        -webkit-font-smoothing: antialiased;
    }

    //Os elementos input, textarea e button por padrão não importa as fontes do body.
    body, input, textarea, button {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }

    //Fontes de negrito
    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 600;
    }

    //O cursor do mouse ficará como um ponteiro nos botões
    button {
        cursor: pointer;
    }

    //Para componentes desabilitados ficará mais claro e terá a placa de desabilitado.
    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }

    //Estilo do fundo do modal (área cinza)
    .react-modal-overlay {
        background: rgba(0, 0, 0, 0.5);
        overflow-y: auto;
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;

        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .react-modal-content {
        margin-top: 16rem;
        width: 100%;
        //height: 100vh;
        max-width: 720px;
        background: white;
        padding: 3rem;
        position: relative;
        border-radius: 0.24rem;
        

    }

    .react-modal-close {
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
        border: 0;

        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.8);
        }

    }


`