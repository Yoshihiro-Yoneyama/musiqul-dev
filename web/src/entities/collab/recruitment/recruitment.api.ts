import {RecruitmentSchema} from "@/entities/collab/recruitment/recruitment.model";
import api from "@/shared/lib/axios";
import ErrorData from "@/shared/classes/ErrorData";

export const recruitment = async (
  recruitment: RecruitmentSchema
) => {
  try {
    await api.post('/recruitment', recruitment)
  } catch (error) {
    if (error instanceof ErrorData && error.data.status === 400) {
      console.error("Error sending recruitment data:", error);
    }
  }
}
