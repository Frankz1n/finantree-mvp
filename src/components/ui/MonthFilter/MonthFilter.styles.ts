import styled from "styled-components"
import { media } from "@/styles/media"

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    padding: 0.35rem 0.5rem;
    max-width: 100%;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(8px);
    border-radius: 9999px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    ${media.sm} {
        gap: 0.75rem;
        padding: 0.5rem 1rem;
    }
`

export const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background: transparent;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: #f1f5f9;
        color: #0f172a;
    }
    
    &:active {
        transform: scale(0.95);
    }
`

export const TitleBox = styled.div`
    min-width: 0;
    flex: 1 1 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 0.15rem;

    ${media.sm} {
        min-width: 7.5rem;
        flex: initial;
    }
`

export const MonthYearText = styled.span`
    font-size: clamp(0.8125rem, 3.5vw, 1rem);
    font-weight: 600;
    color: #0f172a;
    text-transform: capitalize;
    line-height: 1.2;
`
