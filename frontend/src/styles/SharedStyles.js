import styled from 'styled-components';

export const colors = {
  primary: '#007bff',
  secondary: '#6c757d',
  background: '#f8f9fa',
  text: '#333333',
  border: '#dee2e6',
  white: '#ffffff',
  danger: '#dc3545',
};

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${colors.background};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  color: ${colors.text};
  margin-bottom: 20px;
`;

export const Button = styled.button`
  padding: 10px 15px;
  background-color: ${props => props.danger ? colors.danger : colors.primary};
  color: ${colors.white};
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.danger ? '#c82333' : '#0056b3'};
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${colors.border};
  border-radius: 4px;
  font-size: 14px;
  background-color: ${colors.white};
  color: ${colors.text};

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid ${colors.border};
  border-radius: 4px;
  font-size: 14px;
  background-color: ${colors.white};
  color: ${colors.text};
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23333' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 30px;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: ${colors.text};
  font-weight: bold;
`;