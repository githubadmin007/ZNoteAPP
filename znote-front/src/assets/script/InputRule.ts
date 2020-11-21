/* 本文件定义字段的输入规则 */

/* 创建一个限制规则，限制字段不能为空 */
export const CreateNotEmptyRule = (name: string) => {
    return (value: string) => (value || '').length > 0 || name + '不能为空';
}

/* 字段不能为空 */
export const NotEmptyRule = CreateNotEmptyRule('');

/* 创建一个限制规则，限制字段长度不能超过指定的长度 */
export const CreateLengthRule = (length: number) => {
    return (value: string) => (value || '').length < length || '长度不能超过' + length;
}

export default {};
