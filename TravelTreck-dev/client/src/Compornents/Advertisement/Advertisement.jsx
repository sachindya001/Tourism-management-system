import { useState, useEffect } from "react";
import { Table, Button, Popconfirm, message, Spin, Input } from "antd";
import {
  getAllAdvertisement,
  createAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
} from "../../services/advertisementService";
import AdvertisementModal from "./AdvertisementModal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Search } = Input;

const AdvertisementManager = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [currentAdvertisement, setCurrentAdvertisement] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    setLoading(true);
    try {
      const data = await getAllAdvertisement();
      setAdvertisements(data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch advertisements");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setModalType("create");
    setCurrentAdvertisement(null);
    setShowModal(true);
  };

  const handleEdit = (advertisement) => {
    setModalType("edit");
    setCurrentAdvertisement(advertisement);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteAdvertisement(id);
      message.success("Advertisement deleted successfully");
      fetchAdvertisements();
    } catch (error) {
      console.error(error);
      message.error("Failed to delete advertisement");
    } finally {
      setLoading(false);
    }
  };

  const handleModalSubmit = async (values) => {
    setLoading(true);
    try {
      if (modalType === "create") {
        await createAdvertisement(values);
        message.success("Advertisement created successfully");
      } else {
        await updateAdvertisement(currentAdvertisement._id, values);
        message.success("Advertisement updated successfully");
      }
      setShowModal(false);
      fetchAdvertisements();
    } catch (error) {
      console.error(error);
      message.error(
        `Failed to ${
          modalType === "create" ? "create" : "update"
        } advertisement`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredAdvertisements = advertisements.filter((ad) =>
    ad.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Subtitle",
      dataIndex: "subtitle",
      key: "subtitle",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            type="link"
          ></Button>
          <Popconfirm
            title="Are you sure you want to delete this advertisement?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="link" danger></Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={handleCreate}
        style={{ marginBottom: "16px" }}
      >
        Add Advertisement
      </Button>
      <Search
        placeholder="Search advertisements"
        onChange={handleSearch}
        style={{ marginBottom: "16px", width: "300px" }}
      />
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={filteredAdvertisements}
          rowKey="_id"
        />
      </Spin>
      <AdvertisementModal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onSubmit={handleModalSubmit}
        advertisement={currentAdvertisement}
        type={modalType}
      />
    </div>
  );
};

export default AdvertisementManager;
