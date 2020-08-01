import styled from 'styled-components';
import { AiFillFacebook } from 'react-icons/ai';
import Dialog from '@material-ui/core/Dialog';

interface PropsShow {
  show: Boolean;
}

export const ProfileDialog = styled(Dialog)``;

export const CloseDialogButton = styled.div`
  background-color: transparent;
  height: 24px;
  width: 24px;
  color: rgba(60, 61, 71);
  position: absolute;
  cursor: pointer;
  left: 94%;
  top: 1%;
  transition: opacity 0.2s;
  :hover {
    color: rgba(50, 51, 61);
  }
`;

export const LoginContainer = styled.div<PropsShow>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 500px;
  background-color: #1e1f29;
`;

export const LoggedContainer = styled.div<PropsShow>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 500px;
  background-color: #1e1f29;
`;

export const ProfileName = styled.h1`
  margin-top: 30px;
  font-weight: bold;
  color: #e1e1e6;
  font-size: 24px;
`;

export const ProfileEmail = styled.span`
  font-size: 18px;
  color: #e1e1e6;
`;

export const ProfilePicture = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 60px;
`;

export const ProfilePlaceholder = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

export const DeleteButton = styled.div`
  background-color: #ff5555;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 42px;
  width: 200px;
  border-radius: 21px;
  border: 0;
  color: #e1e1e6;
  cursor: pointer;
  margin-top: 40px;
  transition: background-color 0.2s;
  :hover {
    background-color: rgba(235, 65, 65);
  }
`;

export const LoggoutButton = styled.div`
  background-color: #6272a4;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 110px;
  border-radius: 20px;
  border: 0;
  color: #e1e1e6;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.2s;
  :hover {
    background-color: rgba(78, 94, 144);
  }
`;

export const ButtonText = styled.p`
  margin-left: 5px;
  margin-top: 2px;
  font-weight: bold;
  font-size: 18px;
`;

export const LoginTitle = styled.h1`
  margin-top: 30px;
  font-weight: bold;
  color: #e1e1e6;
  font-size: 24px;
`;

export const LoginDescription = styled.span`
  margin-top: 20px;
  font-size: 20px;
  color: #e1e1e6;
`;

export const LoginCode = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: #da552f;
  background-color: #282a36;
  padding: 10px;
  margin-top: 40px;
  border-radius: 6px;
`;

export const LoginInstruction = styled.p`
  font-size: 20px;
  color: #e1e1e6;
  margin-top: 20px;
`;

export const LoginLink = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #4267b2;
  margin-top: 5px;
  cursor: pointer;
  transition: color 0.2s;
  :hover {
    color: #2957b3;
  }
`;

export const FacebookButton = styled.div`
  background-color: #4267b2;
  height: 50px;
  width: 275px;
  border-radius: 4px;
  display: flex;
  flex-direction: 'row';
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 60px;
  color: #fff;
  transition: background-color 0.2s;
  :hover {
    background-color: #2957b3;
  }
`;

export const FacebookButtonText = styled.p`
  color: #e1e1e6;
  font-weight: bold;
  font-size: 20px;
`;

export const FacebookIcon = styled(AiFillFacebook)`
  margin-right: 5px;
`;
