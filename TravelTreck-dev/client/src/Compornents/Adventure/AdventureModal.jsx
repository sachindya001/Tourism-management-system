import { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Upload, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadFile } from "../../services/fileUploadService";
import PropTypes from "prop-types";

const AdventureModal = ({ visible, onCancel, onSubmit, adventure, type }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (adventure) {
      form.setFieldsValue(adventure);
      setImageUrl(adventure.imageUrl);
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [adventure, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        if (imageUrl) {
          const downloadUrl = await uploadFile(imageUrl);
          values.imageUrl = downloadUrl;
        } else {
          values.imageUrl = adventure?.imageUrl;
        }
        await onSubmit(values);
        setImageUrl(null);
        setFileList([]);
        setLoading(false);
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
        setLoading(false);
      });
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
    if (fileList.length > 0) {
      setImageUrl(fileList[0].originFileObj);
    }
  };

  return (
    <Modal
      title={type === "create" ? "Create Adventure" : "Edit Adventure"}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          loading={loading}
          key="submit"
          type="primary"
          onClick={handleOk}
        >
          {type === "create" ? "Create" : "Update"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Image src={adventure?.imageUrl} />
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Image Upload"
          rules={[{ required: true, message: "Please upload an image!" }]}
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
  );
};

// Adding PropTypes validation
AdventureModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  adventure: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  type: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default AdventureModal;
