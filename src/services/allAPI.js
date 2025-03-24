import { commonAPI } from "./commonAPI";
import { BASE_URL } from "./baseURL";

export const addMenuAPi = async(reqBody) => {
    return await commonAPI("post", `${BASE_URL}/api/menus`, reqBody, "");
};

export const getMenuApi = async()=>{
    return await commonAPI("GET",`${BASE_URL}/api/getmenus`,'','')
}

export const addMenuItemAPi = async(reqBody) => {
    return await commonAPI("post", `${BASE_URL}/api/menu-items`, reqBody, "");
};

export const getMenuItemsByMenuIdApi = async (menuId) => {
    return await commonAPI("GET", `${BASE_URL}/api/menu-items/${menuId}`, "", "");
};
