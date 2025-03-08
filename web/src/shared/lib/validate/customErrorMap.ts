import {z} from "zod";

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      if (issue.received === z.ZodParsedType.undefined) {
        return {message: '必須項目です'}
      } else {
        return {message: '値に誤りがあります'}
      }
    case z.ZodIssueCode.too_big:
      return {message: `${issue.maximum}文字以内で入力してください`}
    case z.ZodIssueCode.too_small:
      if (issue.type === 'array') {
        return  {message: `${issue.minimum}個以上チェックしてください`}
      }
      return {message: `${issue.minimum}文字以上で入力してください`}
  }
  return { message: ctx.defaultError }
}

export default customErrorMap