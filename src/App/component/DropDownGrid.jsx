import React, { useCallback, useEffect, useMemo, useState } from 'react';

import '../../assets/scss/themes/pages/_drop-down-grid.scss';
import DataGrid, {
    Paging,
    Scrolling,
    Pager,
    SearchPanel,
    FilterRow,
    HeaderFilter,
    Column,
    ColumnChooser,
    ColumnFixing,
    FilterPanel,
    Button as ActionButton
} from 'devextreme-react/data-grid';

const DropDownGrid = ({
    id,
    disabled,
    value,
    onChange,
    tableHeaderData,
    tableBodyData,
    isSimpleTable,
    isMultipleSelection,
    tableDataKeyName,
    isAction
}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [eid, setIsId] = useState('zsSelect' + Math.random());
    const [selectedData, setSelectedData] = useState([]);
    const [singleData, setSingleData] = useState({});
    const allowedPageSizes = [50, 'all'];

    useEffect(() => {
        if (value) {
            let ind = tableBodyData.findIndex((x) => parseInt(x.fldId) === parseInt(value));
            if (ind !== -1) {
                let tempObj = tableBodyData[ind];
                let secondTempObj = {};

                let innerObj = tableDataKeyName;

                tableDataKeyName.forEach((element, i) => {
                    if (element) {
                        let dottedValues = element?.split('.')[0];
                        let ifDotted = element?.includes('.');
                        if (ifDotted) {
                            secondTempObj = {
                                ...secondTempObj,
                                [tableDataKeyName[i]]: tempObj[dottedValues]?.fldDescription
                            };
                        } else {
                            secondTempObj = {
                                ...secondTempObj,
                                [tableDataKeyName[i]]: tempObj[element]
                            };
                        }
                    }
                });
                setSingleData({ ...secondTempObj });
                setSelectedData([{ ...tableBodyData[ind] }]);
            }
        }
        window.addEventListener('mousedown', (e) => {
            if (menuOpen === true) {
                if (document.getElementById(id ? id : eid)) {
                    if (document.getElementById(id ? id : eid).contains(e.target)) {
                    } else {
                        showMenu();
                    }
                }
            }
        });

        return () => {
            window.removeEventListener('mousedown', () => {}, false);
        };
    }, [menuOpen, value, tableBodyData]);

    const tempFun = useMemo(() => {});

    const showMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const clickOnTableRow = (data, index, value) => {
        if (index) {
            if (isMultipleSelection) {
                let ind = selectedData.findIndex((x) => x.fldId === index);
                if (ind === -1) {
                    selectedData.push({ ...data });
                    setSelectedData([...selectedData]);
                } else {
                    selectedData.splice(ind, 1);
                    setSelectedData([...selectedData]);
                }
                onChange(selectedData);
            } else {
                if (value != index) {
                    let tempArr = [{ ...data }];
                    setSelectedData([{ ...data }]);
                    onChange(tempArr[0]?.fldId);

                    showMenu();
                } else {
                    setSelectedData([]);
                    onChange('');
                    showMenu();
                }
            }
        }
    };

    const checkSelectedRow = (ind) => {
        if (ind) {
            let idx = selectedData.findIndex((x) => x.fldId === ind);
            if (idx !== -1) {
                return true;
            } else {
                return false;
            }
        }
    };

    const renderTableBody = () => {
        switch (id) {
            case 'sizeMeasurementDetailsPart':
                return (
                    tableBodyData &&
                    tableBodyData.map((data, i) => (
                        <tr
                            key={i}
                            onClick={() => clickOnTableRow(data, data?.fldId)}
                            className={checkSelectedRow(data?.fldId) ? 'selectedRow' : ''}
                        >
                            {tableDataKeyName.map((header, i) => header && <td key={i}>{data[header]}</td>)}
                            <td>
                                <button type="button" className="btn btn-primary">
                                    Add
                                </button>
                            </td>
                        </tr>
                    ))
                );
            default:
                break;
        }
    };

    const rowButtonClick = (e) => {
        clickOnTableRow(e?.row?.data, e?.row?.data?.fldId);
    };
    const rowButtonClicked = (e, value) => {
        clickOnTableRow(e?.row?.data, e?.row?.data?.fldId, value);
        singleData && showMenu();
    };

    const doubleClick = (e) => {
        var component = e.component;
        function initialClick() {
            component.clickCount = 1;
            component.clickKey = e.key;
            component.clickDate = new Date();
        }

        function doubleClickEvent(e) {
            component.clickCount = 0;
            component.clickKey = 0;
            component.clickDate = null;
            clickOnTableRow(e?.data, e?.data?.fldId, e);
        }
        if (!component.clickCount || component.clickCount != 1 || component.clickKey != e.key) {
            initialClick();
        } else if (component.clickKey == e.key) {
            if (new Date() - component.clickDate <= 300) doubleClickEvent(e);
            else initialClick();
        }
    };

    const renderTitleHeader = (data) => {
        return <div style={{ fontWeight: 'bold' }}>{data.column.caption}</div>;
    };

    return (
        <div className="drop-down-grid-wrapper" id={id ? id : eid}>
            <div className={`${disabled ? 'zsSelectControl isDisabled' : 'zsSelectControl'} ${menuOpen ? 'borderBottomFocus' : ''}`}>
                <div className="selectedVal" onClick={showMenu} style={{ cursor: 'default', opacity: '1' }}>
                    {value
                        ? Object.keys(singleData).map((data, i) => {
                              return (
                                  <span className="chipBox" key={i}>
                                      {singleData[data]}
                                  </span>
                              );
                          })
                        : '-- Please select --'}
                </div>
                <div className="zsDropArrow" onClick={showMenu}></div>
            </div>
            <div className={menuOpen ? 'selectMenu menuOpen' : 'selectMenu'}>
                <div id={id ? id : eid} className="menuContent">
                    {isSimpleTable ? (
                        <DataGrid
                            dataSource={tableBodyData}
                            keyExpr="fldId"
                            showBorders={true}
                            columnAutoWidth={true}
                            onRowClick={(e) => doubleClick(e)}
                            focusedRowEnabled={true}
                            repaintChangesOnly={true}
                        >
                            <FilterRow visible={true} applyFilter={'auto'} />
                            <FilterPanel visible={true} />
                            <HeaderFilter visible={true} />
                            {/* <Scrolling mode="virtual" rowRenderingMode="virtual"></Scrolling> */}
                            <Paging defaultPageSize={50} />
                            <Pager
                                visible={true}
                                showPageSizeSelector={true}
                                allowedPageSizes={allowedPageSizes}
                                showNavigationButtons={true}
                                showInfo={true}
                                infoText="Page #{0}. Total: {1} ({2} items)"
                            />
                            {tableDataKeyName.map((ele, i) => {
                                return <Column headerCellRender={renderTitleHeader} dataField={ele} caption={tableHeaderData[i]}></Column>;
                            })}
                            {isAction !== false && (
                            <Column headerCellRender={renderTitleHeader} caption="Actions" type="buttons" width={110}>
                                <ActionButton
                                    hint="Select"
                                    visible={true}
                                    // onClick={(e) => {
                                    //     rowButtonClick(e);
                                    // }}
                                    render={(e) => (
                                        <button
                                            onClick={() => {
                                                rowButtonClicked(e, value);
                                            }}
                                            className="btn btn-primary btn-sm m-0 justify-content-center"
                                            type="button"
                                        >
                                            <i className="feather icon-check" />
                                        </button>
                                    )}
                                />
                            </Column>)}
                        </DataGrid>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    {tableHeaderData.map((data, i) => (
                                        <th key={i}>{data}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {renderTableBody()}
                                {/* tableBodyData &&
                                  tableBodyData.map((data, i) => (
                                      <tr
                                          key={i}
                                          onClick={() => clickOnTableRow(data, data?.fldId)}
                                          className={checkSelectedRow(data?.fldId) ? 'selectedRow' : ''}
                                      >
                                          {tableDataKeyName.map((header, i) => header && <td key={i}>{data[header]}</td>)}
                                      </tr>
                                  )) */}
                            </tbody>
                        </table>
                    )}

                    {/* {data.map((d, i) => (
                        <div
                            className={value === d.value ? 'option selectedOpt' : 'option'}
                            onClick={() => changeOption(d)}
                            key={i}
                        >
                            {d.name ? d.name : d.value ? d.value : '-'}
                    </div>
                    ))} */}
                </div>
            </div>
        </div>
    );
};

export default DropDownGrid;
