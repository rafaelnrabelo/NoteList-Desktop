import styled from 'styled-components';
import { MdAddCircleOutline, MdAddCircle } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 5px;
  padding-right: 10px;
  height: 35px;
  border-bottom: 1px solid #3c3d47;
  background-color: #1e1f29;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 4px;
  height: 24px;
  border: 1px solid #3c3d47;
  margin-right: 5px;
  background-color: #171822;
  border-radius: 3px;
  width: 100%;
`;

export const SearchIcon = styled(FiSearch)`
  color: rgba(225, 225, 230, 0.5);
  background-color: transparent;
`;

export const SearchBar = styled.input.attrs({
  maxLength: 20,
  placeholder: 'Buscar Notas...',
})`
  background-color: transparent;
  color: rgba(225, 225, 230, 0.9);
  width: 100%;
  height: 100%;
  font-size: 14px;
  padding-left: 4px;
  font-weight: 500;
  border: 0;
  ::placeholder {
    color: rgba(225, 225, 230, 0.5);
  }
`;

export const AddHover = styled(MdAddCircle)`
  display: none;
`;

export const AddOutlined = styled(MdAddCircleOutline)`
  display: flex;
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 11px;
  color: rgba(225, 225, 230, 1);
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s;
  &:hover ${AddHover} {
    display: flex;
  }
  &:hover ${AddOutlined} {
    display: none;
  }
`;
