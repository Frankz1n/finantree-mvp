import styled from 'styled-components';

export const StyledInput = styled.input`
  display: flex;
  height: 2.5rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #0f172a;
  transition: all 0.2s;
  outline: none;

  &::file-selector-button {
    border: 0;
    background-color: transparent;
    font-size: 0.875rem;
    font-weight: 500;
  }

  &::placeholder {
    color: #64748b;
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #0f172a;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
