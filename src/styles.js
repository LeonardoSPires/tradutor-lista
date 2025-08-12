import styled from "styled-components";

export const Container = styled.div`
  max-width: 400px;
  margin: 3rem auto;
  text-align: center;
  font-family: Arial, sans-serif;
`;

export const Title = styled.h1`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin: 0.5rem 0 0.25rem;
  font-weight: bold;
  text-align: left;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: #0077ff;
  border: none;
  color: white;
  border-radius: 4px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
export const TextArea = styled.textarea`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  resize: vertical;
`;
export const Results = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: left;
  border-radius: 4px;
  border: 1px solid #ccc;
  resize: vertical;
  white-space: pre-wrap;
`;
