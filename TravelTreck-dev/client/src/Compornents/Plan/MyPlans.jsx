import React, { useState, useEffect } from 'react';
import { Modal, List, Card, Typography, Spin, message, Button } from 'antd';
import TouristPlanService from "../../services/touristPlanService";
import PropTypes from "prop-types";

const { Title, Text } = Typography;

const MyPlans = ({ visible, onClose, onDelete, onUpdate }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the plans when the component mounts
  useEffect(() => {
    const fetchPlans = async () => {
      const uid = JSON.parse(localStorage.getItem("user"))["_id"];
      if (!uid) {
        setLoading(false);
        return;
      }

      try {
        let fetchedPlans = await TouristPlanService.getAllTouristPlans();
        fetchedPlans = fetchedPlans.filter((plan) => plan?.userId === uid);
        setPlans(fetchedPlans);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
        message.error("Failed to load plans");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Handle delete action
  const handleDelete = async (planId) => {
    try {
      await TouristPlanService.deleteTouristPlan(planId);
      message.success("Plan deleted successfully");
      setPlans(plans.filter(plan => plan._id !== planId)); // Remove deleted plan from state
    } catch (error) {
      console.error("Failed to delete plan:", error);
      message.error("Failed to delete plan");
    }
  };

 
 

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <Modal
      width={800}
      footer={null}
      onCancel={onClose}
      open={visible}
      style={{ padding: "20px" }}
    >
      <Title level={2}>My Plans</Title>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={plans}
        renderItem={(plan) => (
          <List.Item>
            <Card title={`Plan for ${plan.numOfDays} days`}>
              <Text strong>Destinations:</Text>
              <ul>
                {plan.destinations.map((destination, index) => (
                  <li key={destination._id}>
                    {destination?.name} - {plan.hotels[index]?.name}
                  </li>
                ))}
              </ul>
              <Text strong>Created on: </Text>
              {new Date(plan.createdAt).toLocaleDateString()}
              <Button type="primary" danger onClick={() => handleDelete(plan._id)}>Delete</Button>
            </Card>
          </List.Item>
        )}
      />
    </Modal>
  );
};

MyPlans.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
 
};

export default MyPlans;
