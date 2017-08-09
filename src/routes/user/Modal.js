import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader ,DatePicker} from 'antd'
import city from '../../utils/city'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }


  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="问题描述" hasFeedback {...formItemLayout}>
          {getFieldDecorator('description', {
            initialValue: item.description,
            rules: [
              {
                required: true, 
              },
            ],
          })(<Input />)}
        </FormItem>
        {/*<FormItem label="答案" hasFeedback {...formItemLayout}>
          {getFieldDecorator('problemAnswers.answerdescription', {
            initialValue: item.problemAnswers?item.problemAnswers.answerdescription|| '' : '',
            rules: [
              {
                required: true, 
              },
            ],
          })(<Input />)}
        </FormItem>*/}
        <FormItem label="答案" hasFeedback {...formItemLayout}>
          {getFieldDecorator('problemAnswersdescription', {
            initialValue: item.problemAnswersdescription,
            rules: [
              {
                required: true, 
              },
            ],
          })(<Input />)}
        </FormItem>
        {/*<FormItem label="点击次数" hasFeedback {...formItemLayout}>
          {getFieldDecorator('accessCount', {
            initialValue: item.accessCount,
            rules: [
              {
                required: true,
                type: 'number',
              },
            ],
          })(<InputNumber min={0} max={100} />)}
        </FormItem>*/}
       {/* <FormItem label="创建时间" hasFeedback {...formItemLayout}>
          {getFieldDecorator('createTime', {
            initialValue: item.createTime,
            rules: [
              {
                required: true,
              },
            ],
          })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
        </FormItem>*/}
        <FormItem label="问题类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('categogy', {
            initialValue: item.categogy,
            rules: [
              {
                required: true,
                /*type: 'boolean',*/
              },
            ],
          })(
            <Radio.Group>
              <Radio value={'商家入驻'}>商家入驻</Radio>
              <Radio value={'商家开店'}>商家开店</Radio>
              <Radio value={'加盟商资料更改'}>加盟商资料更改</Radio>
              <Radio value={'商家修改密码'}>商家修改密码</Radio>
              <Radio value={'易通各大区热线电话'}>易通各大区热线电话</Radio>
            </Radio.Group>
          )}
        </FormItem>
        {/*<FormItem label="Name" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="NickName" hasFeedback {...formItemLayout}>
          {getFieldDecorator('nickName', {
            initialValue: item.nickName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Gender" hasFeedback {...formItemLayout}>
          {getFieldDecorator('isMale', {
            initialValue: item.isMale,
            rules: [
              {
                required: true,
                type: 'boolean',
              },
            ],
          })(
            <Radio.Group>
              <Radio value>类别1</Radio>
              <Radio value={false}>类别2</Radio>
              <Radio value={false}>类别3</Radio>
              <Radio value={false}>类别4</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="Age" hasFeedback {...formItemLayout}>
          {getFieldDecorator('age', {
            initialValue: item.age,
            rules: [
              {
                required: true,
                type: 'number',
              },
            ],
          })(<InputNumber min={18} max={100} />)}
        </FormItem>
        <FormItem label="Phone" hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: item.phone,
            rules: [
              {
                required: true,
                pattern: /^1[34578]\d{9}$/,
                message: 'The input is not valid phone!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="E-mail" hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: item.email,
            rules: [
              {
                required: true,
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                message: 'The input is not valid E-mail!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Address" hasFeedback {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: item.address && item.address.split(' '),
            rules: [
              {
                required: true,
              },
            ],
          })(<Cascader
            size="large"
            style={{ width: '100%' }}
            options={city}
            placeholder="Pick an address"
          />)}
        </FormItem>*/}
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
