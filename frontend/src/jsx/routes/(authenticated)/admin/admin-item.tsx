import React, { useEffect, useState } from "react";

import {
    Layout,
    Typography,
    message,
    ConfigProvider,
    Upload,
    Button,
    Form,
    Input,
    InputNumber,
} from "antd";
import {
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    SaveOutlined,
    UploadOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { EditableProTable, ProColumns } from "@ant-design/pro-components";
import enUS from "antd/lib/locale/en_US";
import AdminHeader from "../../../components/header/admin-header";
import AdminSidebar from "../../../components/sidebar/admin-sidebar";
import Loading from "../../../components/loading/loading";

import { useAuth } from "../../../contexts/authContext";
import itemService from "../../../../js/api/itemService";
import { GetItem, PostItem, PatchItem } from "../../../../js/types/Item";

import "./admin.css";

const { Sider, Content } = Layout;
const { Title } = Typography;

const AdminItem: React.FC = () => {
    const [items, setItems] = useState<GetItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    const [form] = Form.useForm();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const authValue = useAuth();

    useEffect(() => {
        fetchItem();
    }, []);

    // reload the items
    const fetchItem = async () => {
        setLoading(true);
        try {
            const response = await itemService.getAll();
            setItems(response);
        } catch (error) {
            message.error("물품을 불러오는 데 실패했습니다.");
            console.error("Failed to fetch all items in admin item: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (file: File) => {
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);
        setImageFile(file);
        return false;
    };

    // create new item to table
    const handleAddItem = async (newItem: PostItem) => {
        const formData = new FormData();
        formData.append("name", newItem.name);
        formData.append("description", newItem.description);
        formData.append("quantity", newItem.quantity.toString());
        formData.append("location", newItem.location);

        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            const addedItem = await itemService.create(
                formData,
                authValue.accessToken
            );
            setItems((prevItems) => [addedItem, ...prevItems]);
            message.success("성공적으로 물품을 추가했습니다.");
            form.resetFields();
        } catch (error) {
            message.error("물품을 추가하는 데 실패했습니다.");
            console.error(error);
            throw error;
        }
        fetchItem();
    };

    // modify existing item in table
    const handleUpdateItem = async (id: string, updatedItem: PatchItem) => {
        const formData = new FormData();
        Object.entries(updatedItem).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value.toString());
            }
        });

        if (imageFile) {
            formData.append("image", imageFile);
        } else {
            formData.append(
                "imageUrl",
                items.find((item) => item._id === id)?.imageUrl || ""
            );
        }

        try {
            const updated = await itemService.update(
                id,
                formData,
                authValue.accessToken
            );
            setItems(items.map((item) => (item._id === id ? updated : item)));
            message.success("성공적으로 물품을 수정했습니다.");
            setPreviewImage(null);
            setImageFile(null);
            fetchItem();
        } catch (error) {
            message.error("물품을 수정하는 데 실패했습니다.");
            console.error(error);
        }
    };

    // delete existing item in table
    const handleDeleteItem = async (id: string) => {
        try {
            await itemService.delete(id, authValue.accessToken);
            setItems(items.filter((item) => item._id !== id));
            message.success("성공적으로 물품을 제거했습니다.");
        } catch (error) {
            message.error("물품을 제거하는 데 실패했습니다.");
            console.error(error);
            throw error;
        }
    };

    const columns: ProColumns<GetItem>[] = [
        {
            title: "사진",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (text, record) =>
                previewImage && editableKeys.includes(record._id) ? (
                    <img
                        src={previewImage}
                        alt="Preview"
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                    />
                ) : text ? (
                    <img
                        src={String(text)}
                        alt="img"
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                    />
                ) : (
                    <span>No image</span>
                ),
            renderFormItem: (_, { isEditable, record }) => {
                if (!isEditable) return null;

                return (
                    <Upload
                        name="image"
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={(file) => handleImageUpload(file)}
                    >
                        {previewImage ? (
                            <img
                                src={previewImage}
                                alt="Preview"
                                style={{ width: "100%" }}
                            />
                        ) : (
                            <Button icon={<UploadOutlined />}></Button>
                        )}
                    </Upload>
                );
            },
        },
        { title: "물품명", dataIndex: "name", key: "name" },
        { title: "설명", dataIndex: "description", key: "description" },
        { title: "총수량", dataIndex: "totalQuantity", key: "totalQuantity" },
        { title: "위치", dataIndex: "location", key: "location" },
        {
            title: "Actions",
            valueType: "option",
            render: (text, record, _, action) => [
                <Button
                    key="editable"
                    icon={<EditOutlined />}
                    onClick={() => action?.startEditable?.(record._id)}
                    type="link"
                ></Button>,
                <Button
                    key="delete"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteItem(record._id)}
                    type="link"
                    danger
                ></Button>,
            ],
        },
    ];

    return (
        <ConfigProvider locale={enUS}>
            <Layout>
                <AdminHeader />
                <Layout className="admin-layout">
                    <Sider className="sidebar">
                        <AdminSidebar />
                    </Sider>
                    <Layout>
                        <Content className="admin-content">
                            <Title level={3}>물품관리</Title>
                            <Form
                                form={form}
                                onFinish={handleAddItem}
                                className="admin-item-add-form"
                            >
                                <Form.Item
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input the item name!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="물품명" />
                                </Form.Item>
                                <Form.Item
                                    name="description"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input the description!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="설명" />
                                </Form.Item>
                                <Form.Item
                                    name="quantity"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input the quantity!",
                                        },
                                    ]}
                                >
                                    <InputNumber min={1} placeholder="수량" />
                                </Form.Item>
                                <Form.Item
                                    name="location"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input the location!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="위치" />
                                </Form.Item>
                                <Form.Item name="imageUrl">
                                    <Upload
                                        name="image"
                                        listType="picture"
                                        showUploadList={true}
                                        beforeUpload={handleImageUpload}
                                    >
                                        <Button icon={<UploadOutlined />}>
                                            img
                                        </Button>
                                    </Upload>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        물품 추가
                                    </Button>
                                </Form.Item>
                            </Form>

                            {loading ? (
                                <Loading />
                            ) : (
                                // properties in editable state on each row cell
                                <EditableProTable<GetItem>
                                    rowKey="_id"
                                    value={items}
                                    columns={columns}
                                    editable={{
                                        type: "multiple",
                                        editableKeys,
                                        onSave: async (rowKey, data) => {
                                            await handleUpdateItem(
                                                data._id,
                                                data as PatchItem
                                            );
                                            setEditableRowKeys((prevKeys) =>
                                                prevKeys.filter(
                                                    (key) => key !== rowKey
                                                )
                                            );
                                        },
                                        onChange: setEditableRowKeys,
                                        saveText: (
                                            <Button
                                                icon={<SaveOutlined />}
                                            ></Button>
                                        ),
                                        cancelText: (
                                            <Button
                                                icon={<CloseOutlined />}
                                            ></Button>
                                        ),
                                        actionRender: (
                                            row,
                                            config,
                                            defaultDom
                                        ) => {
                                            const { save, cancel } = defaultDom;
                                            return [save, cancel];
                                        },
                                    }}
                                    recordCreatorProps={false}
                                />
                            )}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default AdminItem;
