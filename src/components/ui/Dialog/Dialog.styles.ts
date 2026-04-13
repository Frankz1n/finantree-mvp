import styled, { keyframes } from 'styled-components';
import * as DialogPrimitive from "@radix-ui/react-dialog";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const zoomIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

const zoomOut = keyframes`
  from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  to { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
`;

export const StyledDialogOverlay = styled(DialogPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.8);
  
  &[data-state='open'] {
    animation: ${fadeIn} 0.2s ease-out forwards;
  }
  
  &[data-state='closed'] {
    animation: ${fadeOut} 0.2s ease-in forwards;
  }
`;

export const StyledDialogContent = styled(DialogPrimitive.Content)`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 50;
  display: grid;
  width: 100%;
  max-width: 32rem;
  transform: translate(-50%, -50%);
  gap: 1rem;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  padding: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;

  &[data-state='open'] {
    animation: ${zoomIn} 0.2s ease-out forwards;
  }
  
  &[data-state='closed'] {
    animation: ${zoomOut} 0.2s ease-in forwards;
  }
`;

export const StyledDialogHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  text-align: center;
  
  @media (min-width: 640px) {
    text-align: left;
  }
`;

export const StyledDialogFooter = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

export const StyledDialogTitle = styled(DialogPrimitive.Title)`
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.025em;
  margin: 0;
`;

export const StyledDialogDescription = styled(DialogPrimitive.Description)`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export const CloseIconContainer = styled(DialogPrimitive.Close)`
  position: absolute;
  right: 1rem;
  top: 1rem;
  border-radius: 0.125rem;
  opacity: 0.7;
  transition: opacity 0.2s;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #0f172a;
  }

  &:disabled {
    pointer-events: none;
  }

  svg {
    height: 1rem;
    width: 1rem;
  }

  &[data-state='open'] {
    background-color: #f1f5f9;
    color: #64748b;
  }
`;
