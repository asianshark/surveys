/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import data from "../../assets/tabs.json"
import ButtonTree from "../../shared/tabs/ButtonTree";
import Icon from "../../shared/Icon";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import { getUsers } from "../../shared/services/surveyServices";

type MenuItem = {
    label: string;
    icon?: string;
    key?: string;
    childs?: MenuItem[];
};

type User = {
    id: string,
    lastName: string,
    firstName: string,
    fatherName: string

}
const Tabs = ({ closeOpenTab }: any) => {
    const { t } = useTranslation();
    const params = useLocation()
    const [selectedUser, setSelectedUser] = useState<string>(localStorage.getItem('selectedUser') || '')
    const [users, setUsers] = useState<User[]>([])
    useEffect(() => {
        getUsers().then((res) => {
            setUsers(res.map((user: User) => {
                return {
                    value: user.id,
                    label: user.lastName + ' ' + user.firstName + ' ' + user.fatherName
                }
            }))
        })
    }, [])
    useEffect(() => {
        if (selectedUser)
            localStorage.setItem('selectedUser', selectedUser.toString())
    }, [selectedUser])
    const [router, setRouter] = useState(params.pathname.split('/')[1])
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
        <div className="flex h-full flex-col">
            <div className="flex flex-col h-full">
                <div className="text-[#366EF6] h-15 flex items-center justify-center py-3">
                    <img className="h-full object-contain mr-2" alt="Logo" src="src\assets\image.png"></img>Talday ERP
                </div>
                <div>
                    {Object.keys(menuData).map((key, index) => (
                        <div key={index}>
                            <div className="text-[#1A335399] px-4 h-10 flex items-center">
                                {t(menuData[key].label)}
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
            <div className="flex flex-col w-full gap-3">
                <Select placeholder={t('choose-user')} options={users} value={selectedUser} onChange={setSelectedUser} />
                <button className="px-4 justify-start w-full flex h-10 items-center border-t-1 border-[#F0F0F0]" onClick={closeTab}>
                    <Icon icon="arrow-right-start-on-rectangle"></Icon>
                </button>
            </div>
        </div>
    )

}
export default Tabs