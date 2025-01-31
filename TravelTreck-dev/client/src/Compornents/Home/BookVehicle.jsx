import styled from "styled-components";

const Container = styled.div`
  width: 1440px;
  height: 518px;
  background: linear-gradient(45deg, #e6e6fa, #fff0f5);
  display: flex;
  align-items: center;
  padding: 0 50px;
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ImageSection = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
`;

const Woman = styled.img`
  right: 0;
  bottom: 0;
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
`;

const TextSection = styled.div`
  flex: 1;
  padding-left: 50px;
`;

const SmallTitle = styled.h3`
  font-size: 18px;
  color: #4b0082;
  margin-bottom: 10px;
`;

const MainTitle = styled.h2`
  font-size: 36px;
  color: #191970;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #696969;
  margin-bottom: 30px;
`;

const BookButton = styled.button`
  background-color: #191970;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 25px;
  cursor: pointer;

  &:hover {
    background-color: #000080;
  }
`;

const BookVehicle = () => {
  return (
    <Container>
      <ContentWrapper>
        <ImageSection>
          <Woman src={"img4.png"} alt="Woman with vehicle" />
        </ImageSection>
        <TextSection>
          <SmallTitle>Book a vehicle</SmallTitle>
          <MainTitle>Lorem ipsum dolor sit amet</MainTitle>
          <Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse nulla
            enim aperiam culpa cupiditate quas animi ducimus blanditiis!
          </Description>
          <BookButton>Book now</BookButton>
        </TextSection>
      </ContentWrapper>
    </Container>
  );
};

export default BookVehicle;
