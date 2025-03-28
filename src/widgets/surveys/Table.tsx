import { useEffect, useRef, useState } from 'react';
import type { InputRef, TableColumnsType, TableColumnType, TablePaginationConfig, TableProps } from 'antd';
import { Button, Input, Space, Table as TableAntd } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
interface DataType {
    key: string,
    name: string;
    type: string;
    address: string;
    date: number
}

interface Division {
    id: number;
    divisionName: string;
    quizIds: number[] | null;
}
interface Quiz {
    id: number;
    nameRu: string;
    nameKz: string;
    status: "DRAFT" | "PUBLISHED" | "CLOSED"; // Можно уточнить возможные статусы
    createdAt: string; // ISO формат даты
    updatedAt: string;
    authorId: number | null;
    type: boolean;
    startDate: string;
    endDate: string;
    everyDay: boolean;
    everyWeek: boolean;
    everyMonth: boolean;
    dayOfWeek: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY"; // Ограничение на дни недели
    questions: any[] | null; // Можно уточнить, если известна структура вопросов
    divisions: Division[];
}

type OnChange = NonNullable<TableProps<Quiz>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const data: DataType[] = [
    {
        key: "1",
        name: "test1",
        type: "123",
        address: "tes4t",
        date: 15
    },
    {
        key: "12",
        name: "test2",
        type: "1234",
        address: "tet",
        date: 15
    },
    {
        key: "15",
        name: "test3",
        type: "12345",
        address: "test1",
        date: 15
    }
]
type DataIndex = keyof Quiz;

const Table = ( {dataP,total, activeTab, changeFilter }: {total: number, dataP: any, activeTab: string, changeFilter :  OnChange}) => {
    const [sort, setSort] = useState<Sorts>({})
    const [filter, setFilter] = useState<Filters>({})
    const searchInput = useRef<InputRef>(null);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
          current: 1,
          pageSize: 3,
          total: total
      });
    useEffect(()=>{const pag = {...pagination, total: total}
    setPagination(pag)
    },[total])
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

    const handleReset = (clearFilters: () => void,confirm: FilterDropdownProps['confirm'],) => {
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

    const handleChoose = (key: any, action: string) => {
        console.log(action, " ",  key);
    }

    const columns: TableColumnsType<Quiz> = [
        {
            title: "Name",
            dataIndex: 'nameRu',
            key: 'name',
            ...getColumnSearchProps('nameRu'),
            filteredValue: filter.name || null,
            sorter: true,
            sortOrder: sort.columnKey === 'name' ? sort.order : null,
            ellipsis: true,
        },
        {
            title: "Type",
            dataIndex: 'type',
            key: 'type',
            filters: [
                { text: 'Open', value: true },
                { text: 'Close', value: false },
            ],
            filteredValue: filter.type || null,
            onFilter: () => true,
            sorter: true,
            sortOrder: sort.columnKey === 'type' ? sort.order : null,
            ellipsis: true,
            render: (_, record) =>
                data.length >= 1 ? (
                  <Space key={record.id}>
                    <p>{record.type ? "open" : "close"}</p>
                  </Space>
                ) : null,
        },
        {
            title: 'Division',
            dataIndex: 'divisions[0].divisionId',
            key: 'division',
            filters: [
                { text: 'test', value: 'test' },
            ],
            filteredValue: filter.address || null,
            onFilter: () => true,
            ellipsis: true,
            render: (_, record) =>
                data.length >= 1 ? (
                  <Space key={record.id}>
                    <p>{record.divisions[0].divisionName}</p>
                  </Space>
                ) : null,
        },
        {
            title: "Date",
            dataIndex: 'dayOfWeek',
            key: "date"
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) =>
              data.length >= 1 ? (
                <Space key={record.id}>
                  <a onClick={() => handleChoose(record.id, 'results')}>Results</a>
                  <a onClick={() => handleChoose(record.id, 'archive')}
                   style={{color: '#FF4D4F'}}>Archive</a>
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