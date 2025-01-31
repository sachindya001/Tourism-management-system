import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Switch,
  message,
  Popconfirm,
  Upload,
  Image,
} from "antd";
import {
  DeleteFilled,
  EditFilled,
  FilePdfOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  getAllPackages,
  createPackage,
  updatePackage,
  deletePackage,
} from "../../services/packageService";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { uploadFile } from "../../services/fileUploadService";

const Package = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [form] = Form.useForm();
  const [addLoading, setAddLoading] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  // Fetch all packages
  const fetchPackages = async () => {
    setLoading(true);
    try {
      const data = await getAllPackages();
      setPackages(data);
      setFilteredPackages(data);
    } catch (error) {
      console.error(error);
      message.error("Error fetching packages");
    } finally {
      setLoading(false);
    }
  };

  // Show Modal for Create or Edit
  const showModal = (pkg = null) => {
    setEditingPackage(pkg);
    setIsModalVisible(true);
    if (pkg) {
      form.setFieldsValue(pkg);
    } else {
      form.resetFields();
    }
  };
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
    if (fileList.length > 0) {
      setImageUrl(fileList[0].originFileObj);
    }
    console.log(fileList);
  };

  // Handle Modal OK (Create/Update)
  const handleOk = async () => {
    try {
      setAddLoading(true);
      let url = "";
      const values = await form.validateFields();
      if (imageUrl != null) {
        const downloadUrl = await uploadFile(imageUrl);
        url = downloadUrl;
      } else {
        url = setEditingPackage?.imageUrl;
      }
      if (editingPackage) {
        await updatePackage(editingPackage._id, { ...values, imageUrl: url });
        message.success("Package updated successfully");
      } else {
        await createPackage({ ...values, imageUrl: url });
        message.success("Package created successfully");
      }
      fetchPackages();
      setIsModalVisible(false);
      setAddLoading(false);
    } catch (error) {
      console.error(error);
      message.error("Error submitting form");
    }
  };

  // Handle delete package
  const handleDelete = async (id) => {
    try {
      await deletePackage(id);
      message.success("Package deleted successfully");
      fetchPackages();
    } catch (error) {
      console.error(error);
      message.error("Error deleting package");
    }
  };

  // Close Modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingPackage(null);
    form.resetFields();
  };

  // Generate PDF of packages
  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text("Packages List", 14, 10);
    doc.autoTable({
      head: [
        ["Package Name", "Ionmmks", "Price", "Availability", "Description"],
      ],
      body: packages.map((pkg) => [
        pkg.packageName,
        pkg.ionmmks,
        `$${pkg.price}`,
        pkg.availability ? "Available" : "Unavailable",
        pkg.description,
      ]),
    });
    doc.save("packages.pdf");
  };

  // Search packages
  const handleSearch = (value) => {
    const filteredData = packages.filter((pkg) =>
      pkg.packageName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPackages(filteredData);
  };

  const columns = [
    {
      title: "Package Name",
      dataIndex: "packageName",
      key: "packageName",
      sorter: (a, b) => a.packageName.localeCompare(b.packageName),
    },
    {
      title: "Ionmmks",
      dataIndex: "ionmmks",
      key: "ionmmks",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => `$${price}`,
    },
    {
      title: "Availability",
      dataIndex: "availability",
      key: "availability",
      sorter: (a, b) => a.availability - b.availability,
      render: (available) => (available ? "Available" : "Unavailable"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl) => (
        <img src={imageUrl} alt="Package" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            type="link"
            onClick={() => showModal(record)}
            style={{ marginRight: 8 }}
            icon={<EditFilled />}
          />
          <Popconfirm
            title="Are you sure you want to delete this package?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteFilled />} type="link" danger />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Button loading={addLoading} type="primary" onClick={() => showModal()}>
          Create Package
        </Button>
        <div>
          <Input
            placeholder="Search Package"
            prefix={<SearchOutlined />}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ marginRight: 8 }}
          />
          <Button icon={<FilePdfOutlined />} onClick={generatePdf}>
            Export PDF
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredPackages}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={editingPackage ? "Edit Package" : "Create Package"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editingPackage ? "Update" : "Create"}
      >
        <Form form={form} layout="vertical">
          <Image src={editingPackage?.imageUrl} />
          <Form.Item
            name="packageName"
            label="Package Name"
            rules={[{ required: true, message: "Please enter package name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ionmmks"
            label="Ionmmks"
            rules={[{ required: true, message: "Please enter ionmmks" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="availability"
            label="Availability"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="imageUrl"
            label="Image"
            rules={[{ required: true, message: "Please pick image" }]}
          >
            <Upload
              name="image"
              listType="picture"
              fileList={fileList}
              onChange={handleUploadChange}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Package;
