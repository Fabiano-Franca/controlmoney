import styled from "styled-components";

export const Container = styled.div`
    margin-top: -6rem;

    div {
        background: var(--shape);
        padding: 1.5rem;
        border-radius: 0.25rem;
        color: var(--text-title);

        header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
        }

        strong {
            display: block;
            margin-top: 1rem;
            font-size: 2rem;
            font-weight: 500;
            line-height: 3rem;
        }

        &.highlight-background {
            background: var(--blue);
            color: #FFF;
        }

        input {
            width: 80%;
            padding: 0 1.5rem; //Margem interna
            height: 4rem; //Altura da input
            border-radius: 0.25rem;

            border: 1px solid #D7D7D7;
            background: #FFF;

            font-weight: 400;
            font-size: 1rem;

            //Seletor placeholder
            &::placeholder {
                color: var(--text-body);
            }

        }

        button {
            font-weight: 400;
            height: 4rem; //Altura da input
            border-radius: 0.25rem;
            padding: 0 1.5rem; //Margem interna
            border: 0;
            background: var(--blue-white);
            color: #fff;

            font-size: 1rem;
            font-style: bold;
            margin-left: 0.5rem;

            transition: filter 0.2s;

            &:hover {
            filter: brightness(0.95);
            }

        }
        .loader {
            font-size: 6px;
            text-indent: -1rem;
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            background: #ffffff;
            background: -moz-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
            background: -webkit-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
            background: -o-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
            background: -ms-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
            background: linear-gradient(to right, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
            position: relative;
            -webkit-animation: load3 1.4s infinite linear;
            animation: load3 1.4s infinite linear;
            -webkit-transform: translateZ(0);
            -ms-transform: translateZ(0);
            transform: translateZ(0);
        }
        .loader:before {
            width: 50%;
            height: 50%;
            background: #ffffff;
            border-radius: 100% 0 0 0;
            position: absolute;
            top: 0;
            left: 0;
            content: '';
        }
        .loader:after {
            background: var(--blue-white);
            width: 75%;
            height: 75%;
            border-radius: 50%;
            content: '';
            margin: auto;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
        }
        @-webkit-keyframes load3 {
            0% {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
            }
            100% {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
            }
            }
            @keyframes load3 {
            0% {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
            }
            100% {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
            }
        }
    }

`;