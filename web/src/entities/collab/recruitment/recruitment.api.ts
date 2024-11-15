import {RecruitmentSchema} from "@/entities/collab/recruitment/recruitment.model";
import api from "@/shared/lib/axios";
import ErrorData from "@/shared/classes/ErrorData";

export const postRecruitment = async (
  recruitment: RecruitmentSchema
) => {
  try {
    await api.post('/recruitment', recruitment)
  } catch (error) {
    if (error instanceof ErrorData && error.data.status === 400) {
      console.error("Error sending recruitment data:", error);
      // TODO バックエンドから返却さたエラーを表示する
    } throw error
  }
}
