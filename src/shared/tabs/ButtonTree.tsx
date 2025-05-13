/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Icon from "../Icon";
import { useTranslation } from "react-i18next";

type MenuItem = {
    label: string;
    icon?: string;
    key?: string;
    childs?: MenuItem[];
};
const ButtonTree = ({ item, routTo, openChild }: { item: MenuItem, routTo: any, openChild: string }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false)
    const isActive = (openChild === item.key) || item.childs?.some((child: any) => openChild.includes(child.key))
    const className = (isActive ? (!item.icon ? "bg-[#3E79F71A] border-r-3 border-blue-500 text-blue-500" : "text-blue-500") : "")

    const toRouter = (router: string | undefined) => {
        if (item.childs) {
            setIsOpen(!isOpen)
        } else routTo(router)
    }

    const openCloseChild = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            <div className={"px-4 justify-between w-full flex h-10 items-center " + className}>
                <button onClick={() => toRouter(item.key)}
                    className="flex w-full items-center">
                    {item.icon && (<Icon icon={item.icon}/>)}
                    <p className={"text-sm font-medium " + (item.icon ? "pl-2.5" : "pl-[30px]")} >{t(item.label)}</p>
                </button>
                {item.childs && (
                    <button className=" text-black" onClick={openCloseChild}><Icon icon={isOpen ? "chevron-up" : "chevron-down"}></Icon></button>
                )}
            </div>
            {item.childs && isOpen && item.childs.map((child, index) => (
                <div key={index}>
                    <ButtonTree openChild={openChild} routTo={routTo} item={child}></ButtonTree>
                </div>
            ))
            }
        </>
    )
}

export default ButtonTree