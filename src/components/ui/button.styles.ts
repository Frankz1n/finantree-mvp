import styled, { css } from 'styled-components';

export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'google' | 'success';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

interface StyledButtonProps {
    $variant?: ButtonVariant;
    $size?: ButtonSize;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s, color 0.2s;
  outline: none;
  cursor: pointer;
  border: none;

  &:focus-visible {
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #0f172a;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  ${({ $size = 'default' }) => {
        switch ($size) {
            case 'sm':
                return css`height: 2.25rem; padding: 0 0.75rem;`;
            case 'lg':
                return css`height: 2.75rem; padding: 0 2rem;`;
            case 'icon':
                return css`height: 2.5rem; width: 2.5rem;`;
            default:
                return css`height: 2.5rem; padding: 0.5rem 1rem;`;
        }
    }}

  ${({ $variant = 'default' }) => {
        switch ($variant) {
            case 'destructive':
                return css`
          background-color: #ef4444; color: #ffffff;
          &:hover { background-color: rgba(239, 68, 68, 0.9); }
        `;
            case 'outline':
                return css`
          background-color: #ffffff; border: 1px solid #e2e8f0; color: #0f172a;
          &:hover { background-color: #f1f5f9; color: #0f172a; }
        `;
            case 'secondary':
                return css`
          background-color: #f1f5f9; color: #0f172a;
          &:hover { background-color: rgba(241, 245, 249, 0.8); }
        `;
            case 'ghost':
                return css`
          background-color: transparent; color: #0f172a;
          &:hover { background-color: #f1f5f9; color: #0f172a; }
        `;
            case 'link':
                return css`
          background-color: transparent; color: #0f172a; text-decoration: underline; text-underline-offset: 4px;
          &:hover { text-decoration: underline; }
        `;
            case 'google':
                return css`
          background-color: #ffffff; color: #000000; border: 1px solid #e5e7eb; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          &:hover { background-color: #f9fafb; }
        `;
            case 'success':
                return css`
          background-color: #16a34a; color: #ffffff;
          &:hover { background-color: #15803d; }
        `;
            default:
                return css`
          background-color: #0f172a; color: #f8fafc;
          &:hover { background-color: rgba(15, 23, 42, 0.9); }
        `;
        }
    }}
`;
