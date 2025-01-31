import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Spin,
  Select,
  Row,
  Col,
} from "antd";
import {
  SearchOutlined,
  PrinterOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  getAllSitePayments,
  createSitePayment,
  updateSitePayment,
  deleteSitePayment,
} from "../../services/financeService";

const { Option } = Select;

const Finance = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [form] = Form.useForm();

  // Fetch all site payments
  const fetchPayments = async () => {
    setLoading(true);
    try {
      const data = await getAllSitePayments();
      setPayments(data);
      setFilteredPayments(data); // Set initial filtered data
      message.success("Payments loaded successfully");
    } catch (error) {
      console.error(error);
      message.error("Error fetching payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Handle create or update payment
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (currentPayment) {
        // Update payment
        await updateSitePayment(currentPayment._id, values);
        message.success("Payment updated successfully");
      } else {
        // Create new payment
        await createSitePayment(values);
        message.success("Payment created successfully");
      }
      fetchPayments(); // Refresh the list
      form.resetFields(); // Reset form
      setIsModalVisible(false);
    } catch (error) {
      console.error(error);
      message.error("Error saving payment");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete payment
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteSitePayment(id);
      message.success("Payment deleted successfully");
      fetchPayments(); // Refresh the list
    } catch (error) {
      console.error(error);
      message.error("Error deleting payment");
    } finally {
      setLoading(false);
    }
  };

  // Show modal for creating/updating payment
  const showModal = (payment = null) => {
    setCurrentPayment(payment);
    if (payment) {
      form.setFieldsValue(payment);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // Modal close handler
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Filter payments based on search text
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = payments.filter((payment) =>
      payment.paidUserName.toLowerCase().includes(value)
    );
    setFilteredPayments(filtered);
  };

  // Generate PDF Report for all payments
  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.text("Site Payments Report", 20, 10);
    doc.autoTable({
      head: [
        [
          "User Name",
          "Paid Amount",
          "Payment Type",
          "User Email",
          "Phone Number",
          "Address",
        ],
      ],
      body: payments.map((payment) => [
        payment.paidUserName,
        payment.paidAmount,
        payment.paymentType,
        payment.paidUserEmail,
        payment.paidUserPhoneNumber || "N/A",
        payment.paidUserAddress || "N/A",
      ]),
    });
    doc.save("site_payments_report.pdf");
  };

  // Print individual invoice
  const printInvoice = (payment) => {
    const doc = new jsPDF();
    doc.text("Invoice", 20, 10);
    doc.autoTable({
      body: [
        ["User Name", payment.paidUserName],
        ["Paid Amount", payment.paidAmount],
        ["Payment Type", payment.paymentType],
        ["User Email", payment.paidUserEmail],
        ["Phone Number", payment.paidUserPhoneNumber || "N/A"],
        ["Address", payment.paidUserAddress || "N/A"],
      ],
    });
    doc.save(`invoice_${payment._id}.pdf`);
  };

  // Ant Design Table columns
  const columns = [
    {
      title: "User Name",
      dataIndex: "paidUserName",
      key: "paidUserName",
    },
    {
      title: "Paid Amount",
      dataIndex: "paidAmount",
      key: "paidAmount",
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: "User Email",
      dataIndex: "paidUserEmail",
      key: "paidUserEmail",
    },
    {
      title: "Phone Number",
      dataIndex: "paidUserPhoneNumber",
      key: "paidUserPhoneNumber",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "Address",
      dataIndex: "paidUserAddress",
      key: "paidUserAddress",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            type="link"
            onClick={() => showModal(record)}
          ></Button>
          <Popconfirm
            title="Are you sure you want to delete this payment?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="link" danger></Button>
          </Popconfirm>
          <Button
            type="link"
            icon={<PrinterOutlined />}
            onClick={() => printInvoice(record)}
          ></Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Row justify="space-between">
        <h1>Finance Management</h1>
        <Button type="primary" onClick={generatePDFReport}>
          Generate Report
        </Button>
      </Row>
      <div style={{ height: 16 }} />
      <Row style={{ marginBottom: "20px" }}>
        <Col span={12}>
          <Input
            placeholder="Search by user name"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={handleSearch}
          />
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button type="primary" onClick={() => showModal()}>
            Add New Payment
          </Button>
        </Col>
      </Row>

      {/* Payments Table */}
      <Spin spinning={loading}>
        <Table dataSource={filteredPayments} columns={columns} rowKey="_id" />
      </Spin>

      {/* Create/Update Modal */}
      <Modal
        title={currentPayment ? "Edit Payment" : "Add Payment"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="User Name"
            name="paidUserName"
            rules={[{ required: true, message: "Please enter user name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Paid Amount"
            name="paidAmount"
            rules={[{ required: true, message: "Please enter the amount" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Payment Type"
            name="paymentType"
            rules={[
              { required: true, message: "Please select a payment type" },
            ]}
          >
            <Select placeholder="Select a payment type">
              <Option value="vehicle book">Vehicle Book</Option>
              <Option value="package book">Package Book</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="User Email"
            name="paidUserEmail"
            rules={[{ required: true, message: "Please enter user email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Phone Number" name="paidUserPhoneNumber">
            <Input placeholder="Optional - 10 digit phone number" />
          </Form.Item>
          <Form.Item label="Address" name="paidUserAddress">
            <Input placeholder="Optional" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {currentPayment ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Finance;
