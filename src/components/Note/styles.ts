import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';
import Checkbox from '@material-ui/core/Checkbox';

interface PropsContainer {
  width: number;
}

interface PropsCheckBox {
  checked: Boolean;
}

interface PropsNote {
  show: Boolean;
}

export const Container = styled.div<PropsContainer>`
  border-top: 1px solid #32333d;
  grid-row-start: 2;
  grid-row-end: 5;
  grid-column-start: 2;
  grid-column-end: 4;
  width: ${(props) => `calc(100vw - ${props.width}px)`};
  height: calc(100vh - 70px);
  padding: 20px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 6px;
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

export const NoteWrapper = styled.div<PropsNote>`
  ${(props) => (props.show ? '' : 'display: none')};
`;

export const Title = styled.input.attrs({
  maxLength: 20,
  placeholder: 'Titulo',
})`
  width: 100%;
  border: 0;
  color: #e1e1e6;
  background-color: transparent;
  font-size: 32px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  margin-bottom: 10px;
  ::placeholder {
    color: rgba(225, 225, 230, 0.5);
  }
`;

export const Description = styled(TextareaAutosize).attrs({
  maxLength: 5000,
  placeholder: 'Digite aqui sua anotação',
})`
  width: 100%;
  border: 0;
  color: #e1e1e6;
  background-color: transparent;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  line-height: 1.2;
  resize: none;
  margin-bottom: 5px;
  ::placeholder {
    color: rgba(225, 225, 230, 0.5);
  }
`;

export const ToDoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  align-items: center;
`;

export const DeleteToDo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(225, 225, 230, 0.7);
  cursor: pointer;
  transition: opacity 0.2s;
  :hover {
    opacity: 0.6;
  }
`;

export const CheckBox = styled(Checkbox).attrs({
  color: 'default',
})`
  width: 20px;
  height: 20px;
`;

export const CheckBoxLabel = styled.input.attrs({
  type: 'text',
  maxLength: 30,
  placeholder: 'Tarefa',
})<PropsCheckBox>`
  border: 0;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  line-height: 1.2;
  background-color: transparent;
  margin-left: 4px;
  ::placeholder {
    color: rgba(225, 225, 230, 0.5);
  }
  text-decoration: ${(props) => (props.checked ? 'line-through' : 'none')};
  color: ${(props) => (props.checked ? 'rgba(225, 225, 230, 0.6)' : '#e1e1e6')};
`;

export const PlaceholderContainer = styled.div<PropsNote>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const PlaceholderText = styled.p`
  font-weight: bold;
  font-size: 30px;
  color: rgba(225, 225, 230, 0.2);
`;
