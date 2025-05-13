import { Button, Modal } from "antd"
import { t } from "i18next"
import { ExclamationCircleOutlined } from "@ant-design/icons"

const VacanciesListItem = () => {
    return (
        <div className="rounded-[10px] bg-white py-6 px-5 border-1 border-[#E6EBF1] flex gap-7 items-center">
            <div className="gap-2 flex flex-col w-1/2">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-6 items-center">
                            <div className="text-[#1A3353] items-center text-[14px]">{t('Начальник 5 управления')}</div>
                            <div className="text-[#72849A] text-[12px] items-center">ID: 29102</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-[#72849A] text-[12px] items-center">C-S-12</div>
                            <div className="text-[#72849A] text-[12px] items-center">Допуск: 2</div>
                        </div>
                    </div>
                    <div className="felx flex-col text-[#366EF6] text-right text-[12px] font-[400]">
                        <div>{t('department')}: 7</div>
                        <div>{t('Управление')}: 2</div>
                        <div>{t('Отдел')}: 8</div>
                    </div>
                </div>
                <div className="py-5 border-y-1 border-[#E6EBF1]">
                    <div className="flex gap-1 text-[14px] text-[#455560]">{t('Предельное звание:')} <span className="text-[#366EF6]">Gjkrjdybr</span></div>
                </div>
                <div className="flex flex-col gap-2">
                    <div><Button size="large" style={{ borderRadius: "10px" }} type="primary"
                        onClick={() => {
                            Modal.confirm({
                                icon: <ExclamationCircleOutlined />,
                                title:
                                    <p>Вы действительно хотите предложить собственные квалификационные требования на данную должность?</p>,
                                content: <>
                                    <p className="text-[#1A3353]">Вы действительно хотите предложить собственную кандидатуру на должность “Начальник четвертого Департамента СГО”?</p>
                                </>,
                                footer: () => (
                                    <>
                                        <Button onClick={()=> Modal.destroyAll()}>No</Button>
                                        <Button onClick={()=> Modal.destroyAll()} type="primary">Yes</Button>
                                    </>
                                ),
                            });
                        }}>
                        {t('Предложить кандидатуру')}
                    </Button></div>
                    <div><Button size="large" style={{ borderRadius: "10px" }} type="primary">
                        {t('Просмотр кандидатов')} (10)
                    </Button></div>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="text-[14px] text-[#1A3353]">{t('Квалификационные требования')}</div>
                <div className="rounded-[10px] border-1 border-[#E6EBF1] bg-[#FAFAFA] py-[1px] px-2 text-[12px] text-[#1A3353]">
                    lfkdb;lkfmblk
                </div>
            </div>
        </div>
    )
}
export default VacanciesListItem