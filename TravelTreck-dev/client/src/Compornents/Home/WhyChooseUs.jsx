import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding: 40px;
  background-color: #f8f8f8;
`;

const TextSection = styled.div`
  flex: 1;
  padding-right: 40px;
`;

const SmallTitle = styled.h3`
  color: #3366cc;
  font-size: 16px;
  margin-bottom: 10px;
`;

const MainTitle = styled.h2`
  color: #333333;
  font-size: 32px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const Description = styled.p`
  color: #666666;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const ImageSection = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  ${(props) => (props.tall ? "grid-row: span 2;" : "")}
  height: ${(props) => (props.tall ? "100%" : "200px")};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const WhyChooseUs = () => {
  return (
    <Container>
      <TextSection>
        <SmallTitle>Why Choose Us</SmallTitle>
        <MainTitle>Lorem ipsum dolor sit amet</MainTitle>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse nulla
          enim aperiam culpa cupiditate quas animi ducimus blanditiis!
        </Description>
        <Description>
          Dolorum, perspiciatis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Esse nulla enim aperiam culpa cupiditate quas animi
          ducimus blanditiis! Dolorum, perspiciatis.
        </Description>
      </TextSection>
      <ImageSection>
        <ImageWrapper tall>
          <Image src="img1.jpg" alt="Scenic view" />
        </ImageWrapper>
        <ImageWrapper>
          <Image src="img2.jpg" alt="Adventure activity" />
        </ImageWrapper>
        <ImageWrapper>
          <Image src="img3.jpg" alt="Luxury accommodation" />
        </ImageWrapper>
      </ImageSection>
    </Container>
  );
};

export default WhyChooseUs;
