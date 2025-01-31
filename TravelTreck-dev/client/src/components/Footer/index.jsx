import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: #1e3a8a;
  color: #ffffff;
  padding: 40px 60px 20px;
  font-family: Arial, sans-serif;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const Column = styled.div`
  flex: 1;
`;

const ColumnTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ColumnList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ColumnListItem = styled.li`
  margin-bottom: 10px;
`;

const ColumnLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

const SubscribeColumn = styled(Column)`
  flex: 1.5;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
`;

const SubscribeInput = styled.input`
  width: calc(100% - 50px);
  padding: 10px;
  border: none;
  background-color: #ffffff;
  margin-right: 10px;
`;

const SubscribeButton = styled.button`
  background-color: #3b82f6;
  border: none;
  color: #ffffff;
  padding: 10px;
  cursor: pointer;
`;

const SubscribeText = styled.p`
  font-size: 12px;
  opacity: 0.8;
  margin-top: 10px;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FooterLinks = styled.div`
  display: flex;
`;

const FooterLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-size: 12px;
  opacity: 0.8;
  margin-right: 20px;

  &:hover {
    opacity: 1;
  }
`;

const SocialIcons = styled.div`
  display: flex;
`;

const SocialIcon = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-size: 18px;
  opacity: 0.8;
  margin-left: 20px;

  &:hover {
    opacity: 1;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <Column>
          <ColumnTitle>Product</ColumnTitle>
          <ColumnList>
            <ColumnListItem>
              <ColumnLink href="#">Employee database</ColumnLink>
            </ColumnListItem>
            <ColumnListItem>
              <ColumnLink href="#">Payroll</ColumnLink>
            </ColumnListItem>
            <ColumnListItem>
              <ColumnLink href="#">Absences</ColumnLink>
            </ColumnListItem>
            <ColumnListItem>
              <ColumnLink href="#">Time tracking</ColumnLink>
            </ColumnListItem>
            <ColumnListItem>
              <ColumnLink href="#">Shift planner</ColumnLink>
            </ColumnListItem>
            <ColumnListItem>
              <ColumnLink href="#">Recruiting</ColumnLink>
            </ColumnListItem>
          </ColumnList>
        </Column>
        <Column>
          <ColumnTitle>Information</ColumnTitle>
          <ColumnList>
            <ColumnListItem>
              <ColumnLink href="#">FAQ</ColumnLink>
            </ColumnListItem>
            <ColumnListItem>
              <ColumnLink href="#">Blog</ColumnLink>
            </ColumnListItem>
            <ColumnListItem>
              <ColumnLink href="#">Support</ColumnLink>
            </ColumnListItem>
          </ColumnList>
        </Column>
        <Column>
          <ColumnTitle>Company</ColumnTitle>
          <ColumnList>
            <ColumnListItem>
              <ColumnLink href="#">About us</ColumnLink>
            </ColumnListItem>
            <ColumnListItem>
              <ColumnLink href="#">Careers</ColumnLink>
            </ColumnListItem>
            <ColumnListItem>
              <ColumnLink href="#">Contact us</ColumnLink>
            </ColumnListItem>
            <ColumnListItem>
              <ColumnLink href="#">Lift Media</ColumnLink>
            </ColumnListItem>
          </ColumnList>
        </Column>
        <SubscribeColumn>
          <ColumnTitle>Subscribe</ColumnTitle>
          <div>
            <SubscribeInput type="email" placeholder="Email address" />
            <SubscribeButton>→</SubscribeButton>
          </div>
          <SubscribeText>
            Hello, we are Lift Media. Our goal is to translate the positive
            effects from revolutionizing how companies engage with their clients
            & their team.
          </SubscribeText>
        </SubscribeColumn>
      </FooterContent>
      <FooterBottom>
        <FooterLinks>
          <FooterLink href="#">Terms</FooterLink>
          <FooterLink href="#">Privacy</FooterLink>
          <FooterLink href="#">Cookies</FooterLink>
        </FooterLinks>
        <SocialIcons>
          <SocialIcon href="#" aria-label="LinkedIn">
            in
          </SocialIcon>
          <SocialIcon href="#" aria-label="Facebook">
            f
          </SocialIcon>
          <SocialIcon href="#" aria-label="Twitter">
            t
          </SocialIcon>
        </SocialIcons>
      </FooterBottom>
    </FooterWrapper>
  );
};

export default Footer;
