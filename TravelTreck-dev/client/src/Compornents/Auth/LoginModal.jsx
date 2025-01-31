import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Modal, Form, Input, Button, Spin, message } from "antd";
import userService from "../../services/userService"; // Import userService

const LoginModal = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await userService.loginUser(values.email, values.password);
      localStorage.setItem("user", JSON.stringify(result.user));
      message.success("Login successful!");
      onClose();
    } catch (error) {
      message.error(error.message);
    }
    setLoading(false);
    location.reload();
  };

  return (
    <Modal title="Login" open={visible} onCancel={onClose} footer={null}>
      <Spin spinning={loading}>
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

// Define prop types
LoginModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoginModal;
