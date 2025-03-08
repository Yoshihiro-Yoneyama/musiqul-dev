import {RecruitmentSchema} from "@/entities/collab/recruitment/recruitment.model";
import api from "@/shared/lib/axios";
import ErrorData from "@/shared/classes/errorData";

/**
 * Send a new Post Recruitment Request
 *
 * @param recruitmentRequest request
 */
export const postRecruitment = async (
  recruitmentRequest: RecruitmentSchema
) => {
  try {
    await api.post('/recruitments', recruitmentRequest)
  } catch (error) {
    if (error instanceof ErrorData && error.data.status === 400) {
      console.error("Error sending recruitment data:", error);
      // TODO バックエンドから返却さたエラーを表示する
    } throw error
  }
}
