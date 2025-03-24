import React, { useState, useEffect } from "react";
import "../styles/menu.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { addMenuAPi, addMenuItemAPi, getMenuApi, getMenuItemsByMenuIdApi } from "../services/allAPI";
import { Snackbar, Alert } from "@mui/material";

const Menu = () => {
    const [showMenuModal, setShowMenuModal] = useState(false);
    const [showItemModal, setShowItemModal] = useState(false);
    const [menuProject, setMenuProject] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [menuItems, setMenuItems] = useState([]);

    const [menuDetails, setMenuDetails] = useState({ menuname: "", description: "" });

    const [menuItemDetails, setMenuItemDetails] = useState({ name: "", description: "", price: "" });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const handleShowMenuModal = () => setShowMenuModal(true);
    const handleShowItemModal = () => setShowItemModal(true);

const handleCloseMenuModal = () => {
    setShowMenuModal(false);
    setMenuDetails({ menuname: "", description: "" }); 
};

// Close Add Menu Item Modal and clear the form fields
const handleCloseItemModal = () => {
    setShowItemModal(false);
    setMenuItemDetails({ name: "", description: "", price: "" }); 
};


    const handleAddMenu = async (e) => {
        e.preventDefault();
        const { menuname, description } = menuDetails;

        if (!menuname || !description) {
            setSnackbarMessage("Please fill all fields!");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
            return;
        }

        const result = await addMenuAPi({ menuname, description });

        if (result?.status === 201) {
            setSnackbarMessage("Menu Category Added Successfully");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
            setMenuDetails({ menuname: "", description: "" });
            handleCloseMenuModal();
            getMenuProject();
        } else {
            setSnackbarMessage(result?.data?.message || "An error occurred");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    };

   
    const handleAddMenuItem = async (e) => {
        e.preventDefault();
        const { name, description, price } = menuItemDetails;

        if (!name || !description || !price || !selectedCategory) {
            setSnackbarMessage("Please fill all fields and select a category!");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
            return;
        }

        const payload = {
            menuId: selectedCategory._id,
            name,
            description,
            price: parseFloat(price) 
        };

        try {
            const result = await addMenuItemAPi(payload);
            if (result?.status === 201) {
                setSnackbarMessage("Menu Item Added Successfully");
                setSnackbarSeverity("success");
                setOpenSnackbar(true);
                setMenuItemDetails({ name: "", description: "", price: "" });
                handleCloseItemModal();
                fetchMenuItems(selectedCategory._id); 
            } else {
                setSnackbarMessage(result?.data?.message || "An error occurred");
                setSnackbarSeverity("error");
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error("Error adding menu item:", error);
            setSnackbarMessage("An error occurred while adding the item.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    };




    const getMenuProject = async () => {
        const result = await getMenuApi();
        setMenuProject(result.data);
    };

    useEffect(() => {
        getMenuProject();
    }, []);

    const fetchMenuItems = async (menuId) => {
        console.log("Fetching menu items for menuId:", menuId);

        try {
            const result = await getMenuItemsByMenuIdApi(menuId);
            console.log("API Response:", result);

            if (result?.status === 200) {
                console.log("Raw API Response:", result.data);

                const items = result?.data?.data; 

                if (Array.isArray(items) && items.length > 0) {
                    console.log("Fetched Menu Items:", items);
                    setMenuItems(items);
                } else {
                    console.log("No menu items found.");
                    setMenuItems([]);
                }
            } else {
                console.log("Error fetching menu items:", result);
            }
        } catch (error) {
            console.error("Error fetching menu items:", error);
        }
    };




    const handleCategorySelect = (menu) => {
        console.log("Selected Menu:", menu);
        setSelectedCategory(menu);
        fetchMenuItems(menu._id); 
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };




    return (
        <div className="menu-container">
            <div className="menu-banner">
                <h1 className="menu-title">Menu</h1>
                <p className="menu-subheading">Please take a look at our menu featuring food, drinks, and brunch. If you'd like <br/> to place an order, use the "Order Online" button located below the menu.</p>
            </div>

            <div className="menu-categories">
                {menuProject.map((menu) => (
                    <button
                        key={menu._id}
                        className={`category-button ${selectedCategory?._id === menu._id ? "active" : ""}`}
                        onClick={() => handleCategorySelect(menu)} 
                    >
                        {menu.menuname}
                    </button>

                ))}
                <Button variant="primary" onClick={handleShowMenuModal} className="add-menu-button">+</Button>
            </div>

       
<div className="menu-banner3">
    <div className="menu-box">
        <div className="menu-content">
            <div className="menu-header">
                <h2 className="menuItem-title">{selectedCategory?.menuname || "Select a Menu"}</h2>
                <button className="add-menu-btn" onClick={handleShowItemModal} disabled={!selectedCategory}>
                    + Add Menu Item
                </button>
            </div>
            <p className="menu-description">{selectedCategory?.description || "Please select a menu to view the items."}</p>

            <hr />
            <ul className="menu-items">
                {selectedCategory && menuItems.length > 0 ? (
                    menuItems.map((item) => (
                        <li key={item._id} className="menu-item">
                            <div className="item-info">
                                <span className="item-name">{item.name}</span>
                                <span className="dots">.....................................................................................................................</span>
                                <span className="item-price">₹{item.price}</span>
                            </div>
                            <p className="item-description">{item.description}</p>
                        </li>
                    ))
                ) : (
                    <li className="menu-item">No items available or please select a menu.</li>
                )}
            </ul>
        </div>
    </div>
</div>


            <Modal show={showMenuModal} onHide={handleCloseMenuModal} className="custom-modal">
                <Modal.Header closeButton className="bg-dark text-white">
                    <Modal.Title>Add Menu</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Menu Name</Form.Label>
                            <Form.Control
                                value={menuDetails.menuname}
                                onChange={(e) => setMenuDetails({ ...menuDetails, menuname: e.target.value })}
                                type="text"
                                placeholder="Enter menu name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                value={menuDetails.description}
                                onChange={(e) => setMenuDetails({ ...menuDetails, description: e.target.value })}
                                as="textarea"
                                rows={3}
                                placeholder="Enter menu description"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="bg-dark">
                    <Button variant="secondary" onClick={handleCloseMenuModal}>Close</Button>
                    <Button variant="primary" onClick={handleAddMenu}>Add Menu</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showItemModal} onHide={handleCloseItemModal} className="custom-modal">
                <Modal.Header closeButton className="bg-dark text-white">
                    <Modal.Title>Add Menu Item</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control
                                value={menuItemDetails.name}
                                onChange={(e) => setMenuItemDetails({ ...menuItemDetails, name: e.target.value })}
                                type="text"
                                placeholder="Enter item name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                value={menuItemDetails.description}
                                onChange={(e) => setMenuItemDetails({ ...menuItemDetails, description: e.target.value })}
                                as="textarea"
                                rows={3}
                                placeholder="Enter item description"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                value={menuItemDetails.price}
                                onChange={(e) => setMenuItemDetails({ ...menuItemDetails, price: e.target.value })}
                                type="text"
                                placeholder="Enter the price"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="bg-dark">
                    <Button variant="secondary" onClick={handleCloseItemModal}>Close</Button>
                    <Button variant="primary" onClick={handleAddMenuItem}>Add Menu</Button>
                </Modal.Footer>
            </Modal>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Menu;
