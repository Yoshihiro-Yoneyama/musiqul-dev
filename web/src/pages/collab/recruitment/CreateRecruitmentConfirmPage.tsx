import CreateRecruitmentForm from "@/features/collab/recruitment/ui/create/CreateRecruitment";

export const CreateRecruitmentConfirmPage = () => {
  return (
    <div>
      <p>メンバーを募集する</p>
      <p>募集するコラボの基本情報</p>
      <CreateRecruitmentForm isDisabled={true}/>
    </div>
  )
}