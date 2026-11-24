import {z} from "zod";

const customErrorMap: z.core.$ZodErrorMap = (issue) => {
  switch (issue.code) {
    case "invalid_type":
      if (issue.input === undefined) {
        return {message: '必須項目です'}
      } else {
        return {message: '値に誤りがあります'}
      }
    case "too_big":
      return {message: `${issue.maximum}文字以内で入力してください`}
    case "too_small":
      if (issue.origin === 'array') {
        return  {message: `${issue.minimum}個以上チェックしてください`}
      }
      return {message: `${issue.minimum}文字以上で入力してください`}
  }
  // undefined を返すと Zod の既定のエラーメッセージが使われる
  return undefined
}

export const  setZodErrorMap = () => {
  z.config({customError: customErrorMap})
}

export default customErrorMap
