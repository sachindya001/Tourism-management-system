import { Input, Avatar } from "antd";
import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";

// Styled Components
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #fff; /* Assuming white background */
`;

const GreetingText = styled.h2`
  font-size: 18px;
  font-weight: 400;
  color: #000000;
  margin: 0;
  display: flex;
  align-items: center;

  span {
    margin-left: 8px;
  }

  /* Emoji styling */
  .wave-emoji {
    font-size: 18px;
  }
`;

const SearchInput = styled(Input)`
  width: 240px;
  border-radius: 20px;
  input {
    border-radius: 20px;
  }
`;

// Main Component
const Header = () => {
  return (
    <HeaderContainer>
      <GreetingText>
        Hello, Chamodi
        <span className="wave-emoji">👋</span>
      </GreetingText>
      <SearchInput placeholder="Search" prefix={<UserOutlined />} />
      <Avatar
        size={40}
        src="https://randomuser.me/api/portraits/men/75.jpg"
        alt="User Avatar"
      />
    </HeaderContainer>
  );
};

export default Header;
