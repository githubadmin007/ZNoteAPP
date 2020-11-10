/* 本文件定义字段的输入规则 */

/* 创建一个限制规则，限制字段不能为空 */
function CreateNotEmptyRule (name) {
    return value => (value || '').length > 0 || name + '不能为空';
}
  
/* 字段不能为空 */
const NotEmptyRule = CreateNotEmptyRule('');
  
/* 创建一个限制规则，限制字段长度不能超过指定的长度 */
function CreateLengthRule (length) {
    if (typeof length != 'number') {
        length = Number(length) || 0;
    }
    return value => (value || '').length < length || '长度不能超过' + length;
}

/* 创建限制规则 */
function CreateRule (rule) {
    switch (rule.type) {
        case 'MaxLength':
            return CreateLengthRule(rule.params);
        case 'NotEmpty':
        default:
            return NotEmptyRule;
    }
}

export {
    CreateRule
}
