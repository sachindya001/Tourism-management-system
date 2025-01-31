import React from "react";
import PropTypes from "prop-types";
import { Modal, Form, Input, Button } from "antd";

const VehicleModal = ({ visible, onCancel, onSubmit, vehicle, type }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values);
  };

  React.useEffect(() => {
    if (vehicle) {
      form.setFieldsValue(vehicle);
    } else {
      form.resetFields();
    }
  }, [vehicle, form]);

  return (
    <Modal
      title={type === "create" ? "Create Vehicle" : "Edit Vehicle"}
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={vehicle || {}}
      >
        <Form.Item
          name="vehicle"
          label="Vehicle"
          rules={[
            { required: true, message: "Please input the vehicle name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="owner"
          label="Owner"
          rules={[{ required: true, message: "Please input the owner name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: "email", message: "Please input a valid email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {type === "create" ? "Create" : "Update"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

VehicleModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  vehicle: PropTypes.shape({
    vehicle: PropTypes.string,
    owner: PropTypes.string,
    email: PropTypes.string,
    description: PropTypes.string,
  }),
  type: PropTypes.oneOf(["create", "edit"]).isRequired,
};

VehicleModal.defaultProps = {
  vehicle: null,
};

export default VehicleModal;
