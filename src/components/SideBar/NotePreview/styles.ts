import styled from 'styled-components';
import { animated } from 'react-spring';

interface Props {
  selected: Boolean;
}

export const Container = styled(animated.div)<Props>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: ${(props) =>
    props.selected ? 'rgba(207, 116, 91, 1)' : 'transparent'};
  align-items: center;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-left-width: ${(props) => (props.selected ? '4px' : '0')};
  border-left-style: solid;
  border-left-color: #d04a25;
  border-bottom: ${(props) =>
    props.selected ? '1px solid transparent' : '1px solid #3c3d47'};
  transition: all 0.2s;
  cursor: pointer;
  :hover {
    background-color: ${(props) =>
      props.selected ? '#e3886f' : 'rgba(68, 71, 90, 0.5)'};
  }
`;

export const Title = styled.p`
  font-size: 15px;
  font-weight: bold;
`;

export const UpdatedAt = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: rgba(225, 225, 230, 0.7);
`;

export const Time = styled.p`
  font-size: 12px;
  font-weight: 500;
`;

export const Date = styled.p`
  font-size: 12px;
  font-weight: 500;
`;
