/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import data from "../../assets/tabs.json"
import ButtonTree from "../../shared/tabs/ButtonTree";
import Icon from "../../shared/Icon";
import { useLocation, useNavigate } from "react-router";

type MenuItem = {
    label: string;
    icon?: string;
    key?: string;
    childs?: MenuItem[];
};
const Tabs = ({ closeOpenTab }: any) => {
    const params = useLocation()

    const [router, setRouter] = useState(params.pathname.slice(1))
    const navigate = useNavigate()
    

    const menuData: Record<string, MenuItem> = data
    const toRouter = (router: string) => {
        setRouter(router)
        navigate(router)
    }
    const closeTab = () => {
        closeOpenTab()
    }
    return (
        <div className="flex h-full flex-col border-r-2 border-[#F0F0F0]">
            <div className="flex flex-col h-full">
                <div className="text-[#366EF6] h-15 flex items-center justify-center">Talday ERP</div>
                <div>
                    {Object.keys(menuData).map((key, index) => (
                        <div key={index}>
                            <div className="text-[#1A335399] px-4 h-10 flex items-center">
                                {menuData[key].label}
                            </div>
                            <div>
                                {menuData[key].childs && menuData[key].childs.map((child, index) => (
                                    <div key={index}>
                                        <ButtonTree openChild={router} routTo={toRouter} item={child}></ButtonTree>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <button className="px-4 justify-start w-full flex h-10 items-center border-t-1 border-[#F0F0F0]" onClick={closeTab}>
                    <Icon icon="arrow-right-start-on-rectangle"></Icon>
                </button>
            </div>
        </div>
    )

}
export default Tabs