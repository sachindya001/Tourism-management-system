import { useState, useEffect } from "react";
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Row,
  Col,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import jsPDF from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // Import the autoTable plugin
import userService from "../../services/userService";

const { Option } = Select;

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState(null);
  const [searchText, setSearchText] = useState(""); // Search text state
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getUsers();
      setUsers(data);
      setFilteredUsers(data); // Initialize filtered users list
    } catch (error) {
      console.error(`Error loading users ${error}`);
      message.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  // Generate PDF Report for all users (Name, Email, Role)
  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.text("User Report", 20, 10); // Title of the PDF
    doc.autoTable({
      head: [["Name", "Email", "Role"]], // Table headers
      body: users.map((user) => [user.name, user.email, user.role]), // Map users data into table rows
    });
    doc.save("user_report.pdf"); // Save the file
  };

  const handleAddEdit = async (values) => {
    try {
      if (editingUser) {
        await userService.updateUser(editingUser._id, values);
        message.success("User updated successfully");
      } else {
        await userService.createUser(values);
        message.success("User created successfully");
      }
      setModalVisible(false);
      fetchUsers();
    } catch (error) {
      message.error("Operation failed: " + error.message);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await userService.deleteUser(userId);
      message.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      message.error("Delete failed: " + error.message);
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Occupation",
      dataIndex: "occupation",
      key: "occupation",
      render: (text) => text || "N/A", // If text is empty or null, render "N/A"
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
      render: (text) => text || "N/A", // If text is empty or null, render "N/A"
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.role !== "user" && (
            <Button
              onClick={() => {
                setEditingUser(record);
                form.setFieldsValue(record);
                setModalVisible(true);
              }}
            >
              Edit
            </Button>
          )}
          <Button danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Row justify="space-between" style={{ marginBottom: "20px" }}>
        <Col span={12}>
          <Input
            placeholder="Search by user name"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={handleSearch}
          />
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button
            type="primary"
            onClick={() => {
              setEditingUser(null);
              form.resetFields();
              setModalVisible(true);
            }}
          >
            Add New User
          </Button>
          <Button
            type="primary"
            onClick={generatePDFReport}
            style={{ marginLeft: "10px" }}
          >
            Generate Report
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingUser ? "Edit User" : "Add New User"}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddEdit} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: !editingUser }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select>
              <Option value="User">User</Option>
              <Option value="Admin">Admin</Option>
              <Option value="Plan Manager">Plan Manager</Option>
              <Option value="Driver">Driver</Option>
              <Option value="Hotel Manager">Hotel Manager</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingUser ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManager;
