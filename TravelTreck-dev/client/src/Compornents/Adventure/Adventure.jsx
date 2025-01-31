import { useState, useEffect } from "react";
import { Table, Button, Popconfirm, message, Spin, Input, Row } from "antd";
import {
  getAllAdventures,
  createAdventure,
  updateAdventure,
  deleteAdventure,
} from "../../services/adventureService";
import AdventureModal from "./AdventureModal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AdventureManager = () => {
  const [adventures, setAdventures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("create"); // 'create' or 'edit'
  const [currentAdventure, setCurrentAdventure] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchAdventures();
  }, []);

  const fetchAdventures = async () => {
    setLoading(true);
    try {
      const data = await getAllAdventures();
      setAdventures(data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch adventures");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setModalType("create");
    setCurrentAdventure(null);
    setShowModal(true);
  };

  const handleEdit = (adventure) => {
    setModalType("edit");
    setCurrentAdventure(adventure);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteAdventure(id);
      message.success("Adventure deleted successfully");
      fetchAdventures();
    } catch (error) {
      console.error(error);
      message.error("Failed to delete adventure");
    } finally {
      setLoading(false);
    }
  };

  const handleModalSubmit = async (values) => {
    setLoading(true);
    try {
      if (modalType === "create") {
        await createAdventure(values);
        message.success("Adventure created successfully");
      } else {
        await updateAdventure(currentAdventure._id, values);
        message.success("Adventure updated successfully");
      }
      setShowModal(false);
      fetchAdventures();
    } catch (error) {
      console.error(error);
      message.error(
        `Failed to ${modalType === "create" ? "create" : "update"} adventure`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredAdventures = adventures.filter((adventure) =>
    adventure.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Adventures List", 14, 20);

    const tableColumn = ["Title", "Description"];
    const tableRows = [];

    filteredAdventures.forEach((adventure) => {
      const adventureData = [adventure.title, adventure.description];
      tableRows.push(adventureData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("adventures.pdf");
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
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
          />
          <Popconfirm
            title="Are you sure you want to delete this adventure?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="link" danger />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Row justify={"space-between"}>
        {" "}
        <Input
          placeholder="Search adventures"
          onChange={handleSearch}
          style={{ marginBottom: "16px", width: "300px" }}
        />
        <Button
          type="primary"
          onClick={handleCreate}
          style={{ marginBottom: "16px" }}
        >
          Add Adventure
        </Button>
        <Button
          type="primary"
          onClick={generatePDF}
          style={{ marginBottom: "16px" }}
        >
          Export as PDF
        </Button>
      </Row>
      <Spin spinning={loading}>
        <Table columns={columns} dataSource={filteredAdventures} rowKey="_id" />
      </Spin>
      <AdventureModal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onSubmit={handleModalSubmit}
        adventure={currentAdventure}
        type={modalType}
      />
    </div>
  );
};

export default AdventureManager;
