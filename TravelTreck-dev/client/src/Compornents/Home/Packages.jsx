import { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllPackages } from "../../services/packageService";

const PackagesContainer = styled.div`
  padding: 20px;
  background-color: #f0f8ff;
  min-height: 70vh;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 32px;
`;

const PackageList = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 20px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PackageCard = styled.div`
  width: 200px;
  margin-right: 20px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
`;

const PackageImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const PackageInfo = styled.div`
  padding: 15px;
`;

const PackageName = styled.h3`
  margin: 0 0 10px;
  color: #333;
  font-size: 18px;
`;

const PackageDescription = styled.p`
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
`;

const ViewButton = styled.button`
  background-color: #2b5797;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;

  &:hover {
    background-color: #1e3c6a;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
`;

const CloseButton = styled.button`
  float: right;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const ModalImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 15px;
`;

const ModalTitle = styled.h2`
  color: #333;
  margin-bottom: 10px;
`;

const ModalInfo = styled.p`
  color: #666;
  margin-bottom: 5px;
`;

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getAllPackages();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  const openModal = (pkg) => {
    setSelectedPackage(pkg);
  };

  const closeModal = () => {
    setSelectedPackage(null);
  };

  return (
    <PackagesContainer>
      <Title>Tour Packages</Title>
      <PackageList>
        {packages.map((pkg) => (
          <PackageCard key={pkg._id}>
            <PackageImage src={pkg.imageUrl} alt={pkg.packageName} />
            <PackageInfo>
              <PackageName>{pkg.packageName}</PackageName>
              <PackageDescription>
                {pkg.description.substring(0, 50)}...
              </PackageDescription>
              <ViewButton onClick={() => openModal(pkg)}>View</ViewButton>
            </PackageInfo>
          </PackageCard>
        ))}
      </PackageList>

      {selectedPackage && (
        <Modal onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <ModalImage
              src={selectedPackage.imageUrl}
              alt={selectedPackage.packageName}
            />
            <ModalTitle>{selectedPackage.packageName}</ModalTitle>
            <ModalInfo>
              <strong>Price:</strong> ${selectedPackage.price}
            </ModalInfo>
            <ModalInfo>
              <strong>Availability:</strong>{" "}
              {selectedPackage.availability ? "Available" : "Not Available"}
            </ModalInfo>
            <ModalInfo>
              <strong>Description:</strong> {selectedPackage.description}
            </ModalInfo>
            <ModalInfo>
              <strong>Created At:</strong>{" "}
              {new Date(selectedPackage.createdAt).toLocaleDateString()}
            </ModalInfo>
            <ModalInfo>
              <strong>Updated At:</strong>{" "}
              {new Date(selectedPackage.updatedAt).toLocaleDateString()}
            </ModalInfo>
          </ModalContent>
        </Modal>
      )}
    </PackagesContainer>
  );
};

export default Packages;
