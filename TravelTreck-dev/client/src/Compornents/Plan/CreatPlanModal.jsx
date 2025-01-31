import { useState, useEffect } from "react";
import { Modal, Form, InputNumber, Select, Button, message, Space } from "antd";
import TouristPlanService from "../../services/touristPlanService";
import { getAllDestinations } from "../../services/destinationService";
import PropTypes from "prop-types"; // Import PropTypes

const hotels = ["Hotel 01", "Hotel 02", "Hotel 03"];

const { Option } = Select;

const CreatePlanModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const destinationsData = await getAllDestinations();
        setDestinations(destinationsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        message.error("Failed to load destinations");
      }
    };
    fetchData();
  }, []);

  const onFinish = async (values) => {
    const user = JSON.parse(localStorage.getItem("user"))["_id"];

    setLoading(true);
    try {
      const planData = {
        userId: user,
        ...values,

        hotels: values.destinations.map((dh) => ({
          destinationId: dh.destinationId,
          name: dh.name,
        })),
        destinations: values.destinations.map((dh) => dh.destinationId),
      };
      console.log(planData);

      await TouristPlanService.createTouristPlan(planData);
      message.success("Plan created successfully");
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error("Failed to create plan:", error);
      message.error("Failed to create plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Create a New Plan"
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.List name="destinations">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "destinationId"]}
                    rules={[
                      {
                        required: true,
                        message: "Please select a destination",
                      },
                    ]}
                  >
                    <Select
                      style={{ width: 200 }}
                      placeholder="Select destination"
                    >
                      {destinations.map((destination) => (
                        <Option key={destination._id} value={destination._id}>
                          {destination.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    rules={[
                      { required: true, message: "Please select a hotel" },
                    ]}
                  >
                    <Select style={{ width: 200 }} placeholder="Select hotel">
                      {hotels.map((hotel) => (
                        <Option key={hotel} value={hotel}>
                          {hotel}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Button onClick={() => remove(name)} type="link" danger>
                    Delete
                  </Button>
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Add Destination and Hotel
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          name="numOfDays"
          label="Number of Days"
          rules={[
            { required: true, message: "Please input the number of days" },
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Plan
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

// Add PropTypes for props validation
CreatePlanModal.propTypes = {
  visible: PropTypes.bool.isRequired, // visible should be a boolean
  onCancel: PropTypes.func.isRequired, // onCancel should be a function
};

export default CreatePlanModal;
