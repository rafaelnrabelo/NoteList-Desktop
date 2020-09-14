import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }
  body {
    color: #E1E1E6;
    background: transparent;
    -webkit-font-smoothing: antialiased;
    display: grid;
  }
  body, input, button {
    font: 400 16px Roboto, sans-serif;
  }
  strong, h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }
  .titlebar {
    grid-row-start: 1;
    grid-row-end: 1;
  }
  .titlebar .window-controls-container .window-icon-bg:nth-child(2n) {
    order: 0 !important;
  }
  .container-after-titlebar {
    grid-row-start: 2;
    grid-row-end: 2;
    height: calc(100vh - 30px);
  }
  .window-title {
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
    font-size: 15px !important;
    color: rgba(225, 225, 230, 0.9);
    margin-left: calc(100vw/2 - 28px) !important;
  }
  .react-resizable {
    position: relative;
  }
  .react-resizable-handle {
    display: flex;
    justify-content: center;
    user-select: none;
    cursor: ew-resize;
    position: absolute;
    font-size: 24px;
    &::before {
      width: 2px;
      height: calc(100vh - 70px);
      content: '';
    }
  }
  .react-resizable-handle-e {
    right: 0;
    top: 50%;
    padding-right: 4px;
    transform: translateY(-50%);
  }
`;
