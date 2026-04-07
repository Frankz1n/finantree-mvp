import styled, { keyframes } from "styled-components"

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`

export const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  padding: 1.5rem;
`

export const AuthCard = styled.div`
  width: 100%;
  max-width: 28rem;
  background-color: #ffffff;
  border-radius: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 2.5rem 2rem;
  animation: ${fadeIn} 0.4s ease-out forwards;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 2.5rem;
`

export const LogoWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: #f0fdf4;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  img {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: contain;
  }
`

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
`

export const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #64748b;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
`

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  svg {
    position: absolute;
    left: 1rem;
    color: #94a3b8;
  }
`

export const Input = styled.input`
  width: 100%;
  height: 3rem;
  background-color: #f8fafc;
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 0 1rem 0 3rem;
  font-size: 0.875rem;
  color: #0f172a;
  outline: none;
  transition: all 0.2s;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    background-color: #ffffff;
    border-color: #10b981;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
  }
`

export const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    color: #475569;
  }
`

export const ForgotPasswordLink = styled.div`
  display: flex;
  justify-content: flex-end;
  
  a {
    font-size: 0.875rem;
    font-weight: 600;
    color: #10b981;
    text-decoration: none;
    transition: color 0.2s;
    
    &:hover {
      color: #059669;
    }
  }
`

export const SubmitButton = styled.button`
  height: 3rem;
  width: 100%;
  background-color: #10b981;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    background-color: #059669;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const Footer = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-size: 0.875rem;
  color: #64748b;
  
  a {
    font-weight: 600;
    color: #10b981;
    text-decoration: none;
    margin-left: 0.25rem;
    
    &:hover {
      color: #059669;
    }
  }
`
