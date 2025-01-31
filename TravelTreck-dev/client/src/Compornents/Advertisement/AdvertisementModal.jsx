import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Input, Button, Upload, message, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadFile } from "../../services/fileUploadService";

const AdvertisementModal = ({
  visible,
  onCancel,
  onSubmit,
  advertisement,
  type,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (advertisement) {
      form.setFieldsValue(advertisement);
      setImageUrl(advertisement.imageUrl);
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [advertisement, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        if (imageUrl) {
          const downloadUrl = await uploadFile(imageUrl);
          if (downloadUrl) {
            values.imageUrl = downloadUrl;
          }
        }
        await onSubmit(values);
        setImageUrl(null);
        setFileList([]);
        message.success("Advertisement published successfully");
        setLoading(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);

        setLoading(false);
      });
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
    if (fileList.length > 0) {
      setImageUrl(fileList[0].originFileObj);
    }
    console.log(fileList);
  };

  return (
    <Modal
      title={type === "create" ? "Create Advertisement" : "Edit Advertisement"}
      open={visible}
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
        <Image src={advertisement?.imageUrl} />
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="subtitle"
          label="Subtitle"
          rules={[{ required: true, message: "Please input the subtitle!" }]}
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

AdvertisementModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  advertisement: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  type: PropTypes.oneOf(["create", "edit"]).isRequired,
};

AdvertisementModal.defaultProps = {
  advertisement: null,
};

export default AdvertisementModal;
