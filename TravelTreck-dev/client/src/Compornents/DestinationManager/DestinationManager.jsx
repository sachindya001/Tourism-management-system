import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  Spin,
  message,
  Popconfirm,
  Row,
  Image,
} from "antd";
import {
  UploadOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  getAllDestinations,
  createDestination,
  updateDestination,
  deleteDestination,
} from "../../services/destinationService";
import { uploadFile } from "../../services/fileUploadService";

const { Search } = Input;

const DestinationManager = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false); // New state for modal button loading

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
    if (fileList.length > 0) {
      setImageUrl(fileList[0].originFileObj);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const data = await getAllDestinations();
      setDestinations(data);
      setFilteredDestinations(data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch destinations");
    }
    setLoading(false);
  };

  // Show modal for new or edit form
  const showModal = (destination = null) => {
    if (destination) {
      setIsEdit(true);
      setEditingDestination(destination);
      form.setFieldsValue(destination);
    } else {
      setIsEdit(false);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setButtonLoading(true);

      if (imageUrl) {
        const downloadUrl = await uploadFile(imageUrl);
        values.imageUrl = downloadUrl;
      } else {
        values.imageUrl = editingDestination?.imageUrl;
      }

      if (isEdit) {
        await updateDestination(editingDestination._id, values);
        message.success("Destination updated successfully");
      } else {
        await createDestination(values);
        message.success("Destination created successfully");
      }

      fetchDestinations();
    } catch (error) {
      console.error(error);
      message.error("Failed to save destination");
    }
    setButtonLoading(false); // Stop loading once the request completes
    setIsModalVisible(false);
    setImageUrl(null);
    setFileList([]);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle deletion of destination
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteDestination(id);
      message.success("Destination deleted successfully");
      fetchDestinations();
    } catch (error) {
      console.error(error);
      message.error("Failed to delete destination");
    }
    setLoading(false);
  };

  // Handle search by filtering destinations
  const handleSearch = (value) => {
    const filtered = destinations.filter((destination) =>
      destination.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDestinations(filtered);
  };

  // Columns for the AntD table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Popular",
      dataIndex: "popular",
      key: "popular",
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl) => (
        <img src={imageUrl} alt="destination" style={{ width: 100 }} />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          />
          <Popconfirm
            title="Are you sure to delete this destination?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Destination Manager</h1>

      <Spin spinning={loading}>
        {/* Search bar */}
        <Row justify={"space-between"}>
          <Search
            placeholder="Search destinations"
            onSearch={handleSearch}
            enterButton={<SearchOutlined />}
            style={{ marginBottom: 20, width: 300 }}
          />

          {/* Add Destination button */}
          <Button type="primary" onClick={() => showModal()}>
            Add Destination
          </Button>
        </Row>

        {/* Table with destination data */}
        <Table
          columns={columns}
          dataSource={filteredDestinations}
          rowKey="_id"
          style={{ marginTop: 20 }}
        />

        {/* Modal for creating/editing destination */}
        <Modal
          title={isEdit ? "Edit Destination" : "Add Destination"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          confirmLoading={buttonLoading} // Show loading on OK button during save
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter the name" }]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please enter the description" },
              ]}
            >
              <Input placeholder="Enter description" />
            </Form.Item>
            <Form.Item
              label="Location"
              name="location"
              rules={[{ required: true, message: "Please enter the location" }]}
            >
              <Input placeholder="Enter location" />
            </Form.Item>
            <Form.Item
              label="Popular"
              name="popular"
              rules={[
                {
                  required: true,
                  message: "Please enter if it's popular or not",
                },
              ]}
            >
              <Input placeholder="Enter popular status" />
            </Form.Item>
            <Form.Item label="Image Upload">
              <Upload
                name="image"
                listType="picture"
                fileList={fileList}
                onChange={handleUploadChange}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Click here to upload</Button>
              </Upload>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="preview"
                  style={{ marginTop: 10, width: 100 }}
                />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </Spin>
    </div>
  );
};

export default DestinationManager;
