import { useState, useEffect } from "react";
import {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../../services/reviewService";
import {
  Modal,
  Button,
  Form,
  Input,
  Rate,
  List,
  Popconfirm,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UserNameEmail from "../UserNameEmail/UserNameEmail";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const fetchedReviews = await getAllReviews();
      setReviews(fetchedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleOpenModal = (review = null) => {
    setEditingReview(review);
    setIsModalOpen(true);
    if (review) {
      form.setFieldsValue(review);
    } else {
      form.resetFields();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingReview(null);
    form.resetFields();
  };

  const handleDeleteReview = async (id) => {
    try {
      await deleteReview(id);
      message.success("Review deleted successfully");
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      message.error("Failed to delete review");
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingReview) {
        // Update review
        await updateReview(editingReview._id, values);
        message.success("Review updated successfully");
      } else {
        // Create new review
        await createReview({ ...values, reviewedBy: user["_id"] });
        message.success("Review created successfully");
      }
      fetchReviews();
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting review:", error);
      message.error("Failed to submit review");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2>Reviews</h2>
      <List
        itemLayout="horizontal"
        dataSource={reviews}
        renderItem={(review) => (
          <List.Item
            actions={
              user
                ? review.reviewedBy == user["_id"]
                  ? [
                      <Button
                        key={1}
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleOpenModal(review)}
                      ></Button>,
                      <Popconfirm
                        key={2}
                        title="Are you sure to delete this review?"
                        onConfirm={() => handleDeleteReview(review._id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          type="danger"
                          icon={<DeleteOutlined />}
                        ></Button>
                      </Popconfirm>,
                    ]
                  : []
                : []
            }
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <List.Item>
                <UserNameEmail id={review.reviewedBy} />
              </List.Item>
              <List.Item.Meta
                title={review.reviewedBy.name}
                description={
                  <>
                    <Rate disabled defaultValue={review.numOfStars} />
                    <p>{review.review}</p>
                  </>
                }
              />
            </div>
          </List.Item>
        )}
      />
      {user && (
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => handleOpenModal()}
          style={{ position: "fixed", bottom: 20, right: 20 }}
        />
      )}
      <Modal
        title={editingReview ? "Edit Review" : "Add Review"}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" initialValues={{ numOfStars: 0 }}>
          <Form.Item
            name="review"
            label="Review"
            rules={[{ required: true, message: "Please enter your review" }]}
          >
            <Input.TextArea rows={4} placeholder="Write your review here..." />
          </Form.Item>
          <Form.Item
            name="numOfStars"
            label="Rating"
            rules={[{ required: true, message: "Please give a star rating" }]}
          >
            <Rate />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Reviews;
