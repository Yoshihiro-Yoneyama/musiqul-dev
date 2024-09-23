package msq.musiqulapi.application.query.collab_for_search

import org.springframework.stereotype.Repository

@Repository
interface CollabForSearchQueryRepository {

  /**
   * 登録されたコラボのリードモデルを追加するメソッド
   */
  fun saveRecruitment(recruitment: Recruitment) {}

  fun deleteRecruitment(recruitment: Recruitment) {}

  // なんのメソッドか分かり次第再実装？
  // ownerのidと名前を紐付けるメソッド
//  fun putRecruitmentOwner(recruitmentOwner: RecruitmentOwner) {}

  // なんのメソッドか分かり次第再実装
//  fun deleteRecruitmentOwner(recruitmentOwner: RecruitmentOwner) {}
}