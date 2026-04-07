import styled from 'styled-components';

export const FilterButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem; /* h-10 w-10 icon size roughly */
  width: 2.5rem;
  border-radius: 9999px;
  border: 1px solid #e2e8f0;
  color: #64748b;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #0f172a;
    color: #0f172a;
    background: #f8fafc;
  }
`;
