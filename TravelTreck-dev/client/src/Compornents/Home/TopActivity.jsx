import { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllAdventures } from "../../services/adventureService";

const Container = styled.div`
  min-height: 70vh;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  max-height: 600px;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 20px;
`;

const ActivityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const ActivityCard = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ActivityImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ActivityName = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const TopActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getAllAdventures();
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
    fetchActivities();
  }, []);

  return (
    <Container>
      <Title>Top Activity</Title>
      <ActivityGrid>
        {activities.map((activity) => (
          <ActivityCard key={activity._id}>
            <ActivityImage src={activity.imageUrl} alt={activity.title} />
            <ActivityName>{activity.title}</ActivityName>
          </ActivityCard>
        ))}
      </ActivityGrid>
    </Container>
  );
};

export default TopActivity;
