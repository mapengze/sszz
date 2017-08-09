import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from 'components'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, rowSelection, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: 'Are you sure delete this record?',
        onOk () {
          onDeleteItem(record.uuid)
        },
      })
    }
  }
  const columns = [
    /*{
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 64,
      className: styles.avatar,
      render: (text) => <img alt={'avatar'} width={24} src={text} />,
    },*/ /*{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',  
      render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
    },*/ {
      title: '问题描述',
      dataIndex: 'description',
      key: 'description',
    }, {
      title: '点击次数',
      dataIndex: 'accessCount',
      key: 'accessCount',
    }, /*{
      title: 'Gender',
      dataIndex: 'isMale',
      key: 'isMale',
      render: (text) => <span>{text
            ? 'Male'
            : 'Female'}</span>,
    },*/ /*{
      title: '问题ID',
      dataIndex: 'uuid',
      key: 'uuid',
      filterDropdownVisible:false,
    },*/ {
      title: '问题类别',
      dataIndex: 'categogy',
      key: 'categogy',
    }, /*{
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },*/ 
    {
      title: '答案',
      dataIndex: 'problemAnswers.description',
      key: 'problemAnswers.description',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    }, 
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    }, 
    {
      title: '操作  ',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '删除' }]} />
      },
    },
  ]

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.uuid}
        rowSelection={rowSelection} 
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
