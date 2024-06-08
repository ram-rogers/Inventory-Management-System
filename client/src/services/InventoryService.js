
// -------------------------------------------------------------------------------------------------------
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/inventories';

const getAllInventory = () => axios.get(API_URL);

const getInventoryById = (id) => axios.get(`${API_URL}/${id}`);

const createInventory = (material) => axios.post(API_URL, material);

const updateInventory = (id, material) => axios.put(`${API_URL}/${id}`, material);

const deleteInventory = (id) => axios.delete(`${API_URL}/${id}`);

const orders = () => axios.get("http://localhost:8080/api/orders/list");

const approveOrder = (orderId) =>  axios.post(`http://localhost:8080/api/orders/approve/${orderId}`)

const viewUsers = () => axios.get("http://localhost:8080/user/users");

const makeAdmin = (id) =>  axios.post(`http://localhost:8080/user/approve/${id}`)



const InventoryService = {
    getAllInventory,
    getInventoryById,
    createInventory,
    updateInventory,
    deleteInventory,
    orders,
    approveOrder,
    viewUsers,
    makeAdmin
};

export default InventoryService;
