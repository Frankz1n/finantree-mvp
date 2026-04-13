import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(8px);
    border-radius: 9999px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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
    min-width: 140px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const MonthYearText = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: #0f172a;
    text-transform: capitalize;
`
