import styled from 'styled-components';
import { AiOutlineDelete, AiFillDelete } from 'react-icons/ai';
import { IoMdCheckboxOutline, IoMdCheckbox } from 'react-icons/io';
import { TiCloudStorageOutline, TiCloudStorage } from 'react-icons/ti';
import CircularProgress from '@material-ui/core/CircularProgress';

interface PropsShow {
  show: Boolean;
}

export const Container = styled.div`
  width: 100%;
  height: 40px;
  background-color: #1e1f29;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  grid-column-start: 1;
  grid-column-end: 4;
  padding-right: 15px;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-bottom: 2px;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  padding-right: 6px;
  padding-left: 6px;
  transition: opacity 0.2s;
  :hover {
    opacity: 0.7;
  }
`;

export const ProfilePicture = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-right: 8px;
`;

export const ProfileName = styled.p`
  font-size: 16px;
  color: rgba(225, 225, 230, 0.9);
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
`;

export const SaveContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: transparent;
`;

export const SavedWrapper = styled.div<PropsShow>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
`;

export const SaveText = styled.p`
  font-size: 14px;
  color: rgba(225, 225, 230, 0.9);
  font-weight: bold;
  margin-right: 5px;
`;

export const SavedAt = styled.span`
  font-size: 13px;
  color: rgba(225, 225, 230, 0.6);
  margin-right: 5px;
`;

export const SavableWrapper = styled.div<PropsShow>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  color: #da552f;
`;

export const SaveIcon = styled(TiCloudStorageOutline)`
  display: flex;
`;

export const SaveIconHover = styled(TiCloudStorage)`
  display: none;
`;

export const LoadingCircle = styled(CircularProgress).attrs({
  color: 'inherit',
  size: 24,
  thickness: 5,
})`
  margin-left: 5px;
`;

export const SaveButton = styled.div`
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s;
  &:hover ${SaveIconHover} {
    display: flex;
  }
  &:hover ${SaveIcon} {
    display: none;
  }
`;

export const NoteOptionsWrapper = styled.div<PropsShow>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
`;

export const AddToDoIcon = styled(IoMdCheckboxOutline)`
  display: flex;
`;

export const AddToDoIconHover = styled(IoMdCheckbox)`
  display: none;
`;

export const AddToDoButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s;
  &:hover ${AddToDoIconHover} {
    display: flex;
  }
  &:hover ${AddToDoIcon} {
    display: none;
  }
`;

export const DeleteIcon = styled(AiOutlineDelete)`
  display: flex;
`;

export const DeleteIconHover = styled(AiFillDelete)`
  display: none;
`;

export const DeleteButton = styled.div`
  background-color: transparent;
  margin-left: 12px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover ${DeleteIconHover} {
    display: flex;
  }
  &:hover ${DeleteIcon} {
    display: none;
  }
`;
