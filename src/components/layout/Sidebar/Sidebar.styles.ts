import styled from 'styled-components';

export const SidebarContainer = styled.aside`
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 40;
  height: 100vh;
  width: 16rem; /* 256px */
  flex-direction: column;
  border-right: 1px solid #f1f5f9;
  background-color: #ffffff;
  padding: 2rem 1.5rem;

  @media (min-width: 768px) {
    display: flex;
  }
`;

export const LogoSection = styled.div`
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

export const LogoIconWrapper = styled.div`
  display: flex;
  height: 2.5rem;
  width: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background-image: linear-gradient(to bottom right, #34d399, #059669);
  box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.2);
  overflow: hidden;
`;

export const LogoImage = styled.img`
  height: 1.5rem;
  width: 1.5rem;
  object-fit: contain;
`;

export const LogoText = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
`;

export const Nav = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const NavItemButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  
  background-color: ${({ $active }) => ($active ? '#f0fdf4' : 'transparent')};
  color: ${({ $active }) => ($active ? '#00C980' : '#64748b')};

  &:hover {
    background-color: ${({ $active }) => ($active ? '#f0fdf4' : '#f8fafc')};
    color: ${({ $active }) => ($active ? '#00C980' : '#0f172a')};
  }
`;

/* Removed Pro Tip Styles */
export const FooterSection = styled.div`
  border-top: 1px solid #f1f5f9;
  padding-top: 1rem;
`;

export const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #94a3b8;
  transition: all 0.2s;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #f8fafc;
    color: #ef4444;
  }
`;
