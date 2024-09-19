import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Input, Select, Modal, message } from "antd";
import { getProductDetails, getProductTypes, updateProduct } from "./Action";
import { EditOutlined } from "@ant-design/icons";

const UpdateProductModal = ({ productId }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [productTypes, setProductTypes] = useState([]);

  const showLoading = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const fetchProductTypes = async () => {
    try {
      const res = await getProductTypes();
      setProductTypes(res.data);
    } catch (error) {
      console.error("Error fetching product types:", error);
    }
  };

  const fetchProductDetails = async () => {
    try {
      const res = await getProductDetails(productId);
      form.setFieldsValue(res.data); // Populate form with product details
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const onFinish = async (values) => {
    try {
      await updateProduct(productId, values);
      message.success("Product updated successfully");
      setOpen(false);
    } catch (err) {
      message.error("Failed to update product");
    }
  };

  useEffect(() => {
    fetchProductTypes();
    fetchProductDetails();
  }, [productId]);

  return (
    <>
      <Button onClick={showLoading} className="col-md-2">
        <EditOutlined />
      </Button>
      <Modal
        title={<p>Update Product</p>}
        footer={null}
        loading={loading}
        width={800}
        open={open}
        onCancel={() => setOpen(false)}
        bodyStyle={{ padding: "20px", maxHeight: "70vh", overflowY: "auto" }}
      >
        <Form
          form={form}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          layout="horizontal"
          style={{ maxWidth: "100%" }}
          onFinish={onFinish}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                name="productCode"
                label="Product Code"
                rules={[{ required: true, message: "Please enter product code" }]}
              >
                <Input placeholder="Enter Product Code" disabled />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="name"
                label="Product Name"
                rules={[{ required: true, message: "Please enter product name" }]}
              >
                <Input placeholder="Enter Product Name" />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Form.Item
                name="productType"
                label="Product Type"
                rules={[{ required: true, message: "Please select product type" }]}
              >
                <Select placeholder="Select Product Type">
                  {productTypes.map((option) => (
                    <Select.Option key={option.id} value={option.id}>
                      {option.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="inventory"
                label="Inventory"
                rules={[{ required: true, message: "Please enter inventory" }]}
              >
                <Input type="number" placeholder="Enter Inventory" />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Form.Item
                name="unitPrice"
                label="Unit Price"
                rules={[{ required: true, message: "Please enter unit price" }]}
              >
                <Input type="number" placeholder="Enter Unit Price" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="vat"
                label="VAT (%)"
                rules={[{ required: true, message: "Please enter VAT" }]}
              >
                <Input type="number" placeholder="Enter VAT Percentage" />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Form.Item
                name="exciseSlab"
                label="Excise Slab"
                rules={[{ required: true, message: "Please enter excise slab" }]}
              >
                <Input placeholder="Enter Excise Slab" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select placeholder="Select Status">
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="inactive">Inactive</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>

          <div className="row" style={{ justifyContent: "flex-end", gap: "10px" }}>
            <Button className="col-md-2" type="primary" htmlType="submit">
              Update
            </Button>
            <Button className="col-md-2" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateProductModal;
