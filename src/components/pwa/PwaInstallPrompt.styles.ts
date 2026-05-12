import styled from 'styled-components'

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.25rem;

  @media (min-width: 480px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  padding: 0.65rem 1rem;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  background-color: #166534;
  color: #fff;

  &:hover {
    background-color: #14532d;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.65rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  background-color: #fff;
  color: #475569;

  &:hover {
    background-color: #f8fafc;
  }
`

export const Hint = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.45;
  color: #64748b;
`
