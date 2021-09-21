import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    :root {
        --background: #f0f2f5;
        --text-body: #969cb3;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        @media (max-width: 1083px) {
            font-size: 93.75%; // 15px
        }

        @media (max-width: 728px) {
            font-size: 87.5%; // 14px
        }
    }

    body {
        background: var(---background);
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, h1, h3, h4, p {
        font-family: 'Open Sans', sans-serif;
        font-weight: 400;
    }


    button {
        cursor: pointer;
        font-weight: 600;
    }
`