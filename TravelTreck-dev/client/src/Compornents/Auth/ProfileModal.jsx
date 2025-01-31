import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Form,
  Input,
  Button,
  Spin,
  message,
  Popconfirm,
  Space,
  Select,
} from "antd";
import userService from "../../services/userService";

const { Option } = Select;

const ProfileModal = ({ visible, onClose }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setLoading(true);
        try {
          const userData = await userService.getUserById(storedUser._id);
          setUser(userData);
          form.setFieldsValue({
            name: userData.name,
            email: userData.email,
            occupation: userData.occupation,
            objective: userData.objective,
            subscription: userData.subscription,
          });
        } catch (error) {
          console.error(error);
          message.error("Failed to fetch user data");
        } finally {
          setLoading(false);
        }
      }
    };

    if (visible) {
      fetchUser();
    }
  }, [visible, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await userService.updateUser(user._id, values);
      message.success("Profile updated successfully!");
      onClose();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      await userService.deleteUser(user._id);
      localStorage.clear();
      message.success("Account deleted successfully!");
      window.location.reload();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Profile"
      visible={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose={true}
    >
      <Spin spinning={loading}>
        <Form
          form={form}
          name="profile_form"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="occupation" label="Occupation">
            <Input />
          </Form.Item>

          <Form.Item name="objective" label="Objective">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item name="subscription" label="Subscription">
            <Select>
              <Option value={null}>None</Option>
              <Option value="basic">Basic</Option>
              <Option value="premium">Premium</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Button type="primary" htmlType="submit" block>
                Update Profile
              </Button>
              <Popconfirm
                title="Are you sure you want to delete your account?"
                onConfirm={handleDeleteAccount}
                okText="Yes"
                cancelText="No"
              >
                <Button danger block>
                  Delete Account
                </Button>
              </Popconfirm>
              <Button type="default" block onClick={handleLogout}>
                Logout
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

ProfileModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProfileModal;
