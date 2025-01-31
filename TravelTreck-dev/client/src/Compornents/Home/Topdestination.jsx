import { useEffect, useState } from "react";
import { getAllDestinations } from "../../services/destinationService";
import styled from "styled-components";
import { Spin, Image, Modal, Button } from "antd";

// Container for the grid list of destinations
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  height: 60vh;
  overflow-y: auto;
  scrollbar-width: none; /* Hide scrollbar for Firefox */
  -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar for Chrome, Safari, Opera */
  }
`;

// Style for individual destination card
const DestinationCard = styled.div`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  height: 200px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Overlay text on image
const OverlayText = styled.div`
  position: absolute;
  bottom: 10px;
  left: 15px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.7);
`;

const TopDestinationContainer = styled.div`
  background: #f2f9fd;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
`;

const TopDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleDestinations, setVisibleDestinations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [page, setPage] = useState(1); // For pagination

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllDestinations();
        setDestinations(data);
        setVisibleDestinations(data.slice(0, 6)); // Show the first 6 initially
      } catch (error) {
        console.error("Error fetching destinations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle scroll to load more destinations
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (
      scrollTop + clientHeight >= scrollHeight - 5 &&
      visibleDestinations.length < destinations.length
    ) {
      const newPage = page + 1;
      setVisibleDestinations((prev) => [
        ...prev,
        ...destinations.slice((newPage - 1) * 6, newPage * 6),
      ]);
      setPage(newPage);
    }
  };

  const handleCardClick = (destination) => {
    setSelectedDestination(destination);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <TopDestinationContainer>
        <Spin />
      </TopDestinationContainer>
    );
  }

  return (
    <TopDestinationContainer>
      <Title>Top Destination</Title>
      <GridContainer onScroll={handleScroll}>
        {visibleDestinations.map((destination) => (
          <DestinationCard
            key={destination._id}
            onClick={() => handleCardClick(destination)}
          >
            <Image
              src={destination.imageUrl}
              alt={destination.name}
              preview={false}
            />
            <OverlayText>{destination.name}</OverlayText>
          </DestinationCard>
        ))}
      </GridContainer>

      {/* Modal for destination details */}
      {selectedDestination && (
        <Modal
          title={selectedDestination.name}
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setModalVisible(false)}>
              Close
            </Button>,
          ]}
        >
          <Image
            src={selectedDestination.imageUrl}
            alt={selectedDestination.name}
            preview={true}
            style={{ marginBottom: 20 }}
          />
          <p>
            <strong>Location:</strong> {selectedDestination.location}
          </p>
          <p>
            <strong>Description:</strong> {selectedDestination.description}
          </p>
          <p>
            <strong>Popular:</strong>{" "}
            {selectedDestination.popular ? "Yes" : "No"}
          </p>
        </Modal>
      )}
    </TopDestinationContainer>
  );
};

export default TopDestination;
