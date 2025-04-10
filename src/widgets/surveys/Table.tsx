import { useEffect, useRef, useState } from 'react';
import type { InputRef, TableColumnsType, TableColumnType, TablePaginationConfig, TableProps } from 'antd';
import { Button, Input, Space, Table as TableAntd } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { Quiz } from '../../entities/Survey';

type OnChange = NonNullable<TableProps<Quiz>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

type DataIndex = keyof Quiz;

const Table = ({ dataP, total, activeTab, changeFilter }: { total: number, dataP: Quiz[], activeTab: string, changeFilter: OnChange }) => {
    const [sort, setSort] = useState<Sorts>({})
    const [filter, setFilter] = useState<Filters>({})
    const searchInput = useRef<InputRef>(null);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: total
    });

    const navigate = useNavigate()
    useEffect(() => {
        const pag = { ...pagination, total: total }
        setPagination(pag)
    }, [total])
    const handleChange: OnChange = (pagination, filters, sorter, extra) => {
        // console.log('Various parameters', pagination, filters, sorter);
        setFilter(filters);
        setPagination(pagination)
        changeFilter(pagination, filters, sorter, extra)
        setSort(sorter as Sorts);
    };
    const handleSearch = (
        confirm: FilterDropdownProps['confirm']
    ) => {
        confirm();
    };

    const handleReset = (clearFilters: () => void, confirm: FilterDropdownProps['confirm'],) => {
        clearFilters();
        confirm()
    };
    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Quiz> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(confirm)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(confirm)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters, confirm)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
    });

    const handleChoose = (key: number | null, action: string) => {
        if (action === 'results' && key)
            navigate(`/surveys-tests/${key}`)

    }
    const columns: TableColumnsType<Quiz> = [
        {
            title: "Название",
            dataIndex: 'nameRu',
            key: 'name',
            ...getColumnSearchProps('nameRu'),
            filteredValue: filter.name || null,
            sorter: true,
            sortOrder: sort.columnKey === 'name' ? sort.order : null,
            ellipsis: true,
        },
        {
            title: "Тип",
            dataIndex: 'type',
            key: 'type',
            filters: [
                { text: 'Открытый', value: true },
                { text: 'Анонимный', value: false },
            ],
            filteredValue: filter.type || null,
            onFilter: () => true,
            sorter: true,
            sortOrder: sort.columnKey === 'type' ? sort.order : null,
            ellipsis: true,
            render: (_, record) =>
                dataP.length >= 1 ? (
                    <Space key={record.id}>
                        <p>{record.type ? "Открытый" : "Анонимный"}</p>
                    </Space>
                ) : null,
        },
        {
            title: 'Юрисдикция',
            dataIndex: 'divisions[0].divisionId',
            key: 'division',
            filters: [
                { text: 'test', value: 'test' },
            ],
            filteredValue: filter.address || null,
            onFilter: () => true,
            ellipsis: true,
            render: (_, record) =>
                dataP.length >= 1 ? (
                    <Space key={record.id}>
                        <p>{record.divisions[0].divisionName}</p>
                    </Space>
                ) : null,
        },
        {
            title: "Календарь",
            dataIndex: 'dayOfWeek',
            key: "date"
        },
        {
            title: 'Подробнее',
            dataIndex: 'operation',
            render: (_, record) =>
                dataP.length >= 1 ? (
                    <Space key={record.id}>
                        <a onClick={() => handleChoose(record.id, 'results')}>Результаты</a>
                        {/* <a onClick={() => handleChoose(record.id, 'archive')} style={{ color: '#FF4D4F' }}>Архивировать</a> */}
                    </Space>
                ) : null,
        },
    ];

    return (
        <>
            <TableAntd<Quiz>
                pagination={pagination}
                rowClassName="editable-row"
                size="small"
                columns={columns}
                dataSource={dataP}
                onChange={handleChange} />
        </>
    )
}
export default Table