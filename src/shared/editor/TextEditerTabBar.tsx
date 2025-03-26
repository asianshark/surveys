const TabBar = () => {
    const tabButtonStyle = {
        fontFamily: 'Roboto, sans-serif',
    }
    const tabs = [
        "File",
        "Edit",
        'View',
        "Insert",
        "Format",
        "Tools",
        "Table",
        "Help"
    ]
    return(
        <div className="bg-stone-200 rounded-t-lg flex container pl-2 py-[5px]">
            {tabs.map((el, index) => (            
                <button style={tabButtonStyle} className="px-2 py-[5px] text-sm/[18px] text-gray-600 font-normal" key={index}>{el}</button>
            ))}
        </div>
    )
}

export default TabBar