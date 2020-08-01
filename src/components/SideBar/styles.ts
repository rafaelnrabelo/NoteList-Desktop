import styled from 'styled-components';
import { ResizableBox } from 'react-resizable';

export const Container = styled(ResizableBox).attrs({
  resizeHandles: ['e'],
  axis: 'x',
})`
  background: #282a36;
  height: calc(100vh - 40px);
  display: block;
  grid-row-start: 2;
  grid-row-end: 5;
  border-right: 1px solid #3c3d47;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #373743;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #41414d;
  }
`;

export const Content = styled.div`
  height: calc(100% - 40px);
  background-color: #282a36;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #373743;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #41414d;
  }
`;
