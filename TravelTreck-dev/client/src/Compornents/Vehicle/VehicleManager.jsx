import { useState, useEffect } from "react";
import { Table, Button, Popconfirm, message, Spin, Input } from "antd";
import {
  getAllVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../../services/vehicleService";
import VehicleModal from "./VehicleModal";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Search } = Input;

const VehicleManager = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("create"); // 'create' or 'edit'
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const data = await getAllVehicles();
      setVehicles(data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setModalType("create");
    setCurrentVehicle(null);
    setShowModal(true);
  };

  const handleEdit = (vehicle) => {
    setModalType("edit");
    setCurrentVehicle(vehicle);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteVehicle(id);
      message.success("Vehicle deleted successfully");
      fetchVehicles();
    } catch (error) {
      console.error(error);
      message.error("Failed to delete vehicle");
    } finally {
      setLoading(false);
    }
  };

  const handleModalSubmit = async (values) => {
    setLoading(true);
    try {
      if (modalType === "create") {
        await createVehicle(values);
        message.success("Vehicle created successfully");
      } else {
        await updateVehicle(currentVehicle._id, values);
        message.success("Vehicle updated successfully");
      }
      setShowModal(false);
      fetchVehicles();
    } catch (error) {
      console.error(error);
      message.error(
        `Failed to ${modalType === "create" ? "create" : "update"} vehicle`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Vehicle", "Owner", "Email", "Description"]],
      body: vehicles.map((vehicle) => [
        vehicle.vehicle,
        vehicle.owner,
        vehicle.email,
        vehicle.description,
      ]),
    });
    doc.save("vehicles.pdf");
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.vehicle.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Vehicle",
      dataIndex: "vehicle",
      key: "vehicle",
      sorter: (a, b) => a.vehicle.localeCompare(b.vehicle),
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      sorter: (a, b) => a.owner.localeCompare(b.owner),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
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
            title="Are you sure you want to delete this vehicle?"
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
        Add Vehicle
      </Button>
  
      <Button
        onClick={handleExportPDF}
        style={{ marginBottom: "16px", marginLeft: "8px" }}
      >
        Export to PDF
      </Button>
      <Search
        placeholder="Search vehicles"
        onChange={handleSearch}
        style={{ marginBottom: "16px", width: "300px" }}
      />
      <Spin spinning={loading}>
        <Table columns={columns} dataSource={filteredVehicles} rowKey="_id" />
      </Spin>
      <VehicleModal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onSubmit={handleModalSubmit}
        vehicle={currentVehicle}
        type={modalType}
      />
    </div>
  );
};

export default VehicleManager;
