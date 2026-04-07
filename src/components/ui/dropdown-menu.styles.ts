import styled, { keyframes, css } from 'styled-components';
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const zoomIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const zoomOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
`;

const contentStyles = css`
  z-index: 50;
  min-width: 8rem;
  overflow: hidden;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  padding: 0.25rem;
  color: #0f172a;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &[data-state='open'] {
    animation: ${fadeIn} 0.2s ease-out forwards, ${zoomIn} 0.2s ease-out forwards;
  }

  &[data-state='closed'] {
    animation: ${fadeOut} 0.2s ease-in forwards, ${zoomOut} 0.2s ease-in forwards;
  }
`;

const itemStyles = css<{ $inset?: boolean }>`
  position: relative;
  display: flex;
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: 0.125rem;
  padding: 0.375rem 0.5rem;
  padding-left: ${({ $inset }) => ($inset ? '2rem' : '0.5rem')};
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s;

  &:focus, &[data-state='open'] {
    background-color: #f1f5f9;
    color: #0f172a;
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }
`;

export const StyledDropdownMenuSubTrigger = styled(DropdownMenuPrimitive.SubTrigger) <{ $inset?: boolean }>`
  ${itemStyles}
`;

export const StyledDropdownMenuSubContent = styled(DropdownMenuPrimitive.SubContent)`
  ${contentStyles}
`;

export const StyledDropdownMenuContent = styled(DropdownMenuPrimitive.Content)`
  ${contentStyles}
`;

export const StyledDropdownMenuItem = styled(DropdownMenuPrimitive.Item) <{ $inset?: boolean }>`
  ${itemStyles}
`;

export const StyledDropdownMenuCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem)`
  ${itemStyles}
  padding-left: 2rem;
  padding-right: 0.5rem;
`;

export const StyledDropdownMenuRadioItem = styled(DropdownMenuPrimitive.RadioItem)`
  ${itemStyles}
  padding-left: 2rem;
  padding-right: 0.5rem;
`;

export const ItemIndicatorWrapper = styled.span`
  position: absolute;
  left: 0.5rem;
  display: flex;
  height: 0.875rem;
  width: 0.875rem;
  align-items: center;
  justify-content: center;
  
  svg {
    height: 1rem;
    width: 1rem;
  }
`;

export const StyledDropdownMenuLabel = styled(DropdownMenuPrimitive.Label) <{ $inset?: boolean }>`
  padding: 0.375rem 0.5rem;
  padding-left: ${({ $inset }) => ($inset ? '2rem' : '0.5rem')};
  font-size: 0.875rem;
  font-weight: 600;
`;

export const StyledDropdownMenuSeparator = styled(DropdownMenuPrimitive.Separator)`
  margin: 0.25rem -0.25rem;
  height: 1px;
  background-color: #f1f5f9;
`;

export const StyledDropdownMenuShortcut = styled.span`
  margin-left: auto;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  opacity: 0.6;
`;

export const AutoMarginIcon = styled.span`
  margin-left: auto;
  display: flex;

  svg {
    height: 1rem;
    width: 1rem;
  }
`;
